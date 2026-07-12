/**
 * Railway/production data bootstrap.
 * Uses a permanent volume at /data (never /tmp).
 *
 * Railway setup:
 * 1. Add a Volume mounted at /data
 * 2. Set DATABASE_URL=file:/data/prod.db
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function resolveDataRoot() {
  if (process.env.DATA_DIR) return path.resolve(process.env.DATA_DIR);
  const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
  return onRailway ? "/data" : path.join(process.cwd(), "data");
}

function resolveSqlitePath(databaseUrl) {
  const raw = (databaseUrl || "").trim();

  // Non-SQLite URLs (postgres/mysql) — leave alone
  if (raw && !raw.startsWith("file:")) {
    return { url: raw, filePath: null };
  }

  const dataRoot = resolveDataRoot();
  fs.mkdirSync(dataRoot, { recursive: true });
  fs.mkdirSync(path.join(dataRoot, "uploads"), { recursive: true });

  // Always prefer permanent data volume path
  if (raw.startsWith("file:/data/") || process.env.FORCE_DATA_DIR === "1") {
    const filePath = path.join(dataRoot, "prod.db");
    const normalized = filePath.replace(/\\/g, "/");
    return { url: `file:${normalized}`, filePath: normalized };
  }

  if (raw.startsWith("file:")) {
    let filePath = raw.slice("file:".length);
    if (filePath.startsWith("///")) filePath = filePath.slice(2);

    const isAbsolute = path.isAbsolute(filePath) || /^[A-Za-z]:[\\/]/.test(filePath);
    const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);

    // Never keep /tmp — migrate to permanent data root
    if (
      onRailway ||
      filePath.includes("/tmp/") ||
      !isAbsolute ||
      filePath.includes("prisma/dev.db") ||
      filePath.startsWith("./")
    ) {
      filePath = path.join(dataRoot, "prod.db");
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const normalized = filePath.replace(/\\/g, "/");
    return { url: `file:${normalized}`, filePath: normalized };
  }

  const filePath = path.join(dataRoot, "prod.db");
  const normalized = filePath.replace(/\\/g, "/");
  return { url: `file:${normalized}`, filePath: normalized };
}

const resolved = resolveSqlitePath(process.env.DATABASE_URL);
process.env.DATABASE_URL = resolved.url;
process.env.DATA_DIR = resolveDataRoot();

if (resolved.filePath) {
  console.log(`[db] Permanent SQLite path: ${resolved.filePath}`);
  console.log(`[db] Uploads directory: ${path.join(process.env.DATA_DIR, "uploads")}`);
} else {
  console.log(`[db] Using non-file DATABASE_URL provider`);
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: process.env,
      shell: process.platform === "win32",
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function main() {
  try {
    await run("npx", ["prisma", "db", "push", "--skip-generate"]);
    console.log("[db] Schema ready");
  } catch (error) {
    console.error("[db] prisma db push failed (continuing to start app):", error.message);
  }

  try {
    await run("npx", ["tsx", "scripts/ensure-content.ts"]);
    console.log("[db] Content ensure finished");
  } catch (error) {
    console.error("[db] ensure-content failed (continuing):", error.message);
  }

  await run("npx", ["next", "start"]);
}

main().catch((error) => {
  console.error("[start] Fatal:", error);
  process.exit(1);
});
