/**
 * Railway/production SQLite bootstrap.
 * Error 14 "Unable to open the database file" happens when DATABASE_URL
 * points at a relative/missing path on an ephemeral or read-only filesystem.
 *
 * This script:
 * 1. Picks a writable absolute DB path
 * 2. Creates the parent directory
 * 3. Runs prisma db push
 * 4. Starts Next.js with DATABASE_URL set for the child process
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function resolveSqlitePath(databaseUrl) {
  const raw = (databaseUrl || "file:./prisma/prod.db").trim();

  // Non-SQLite URLs (postgres/mysql) — leave alone
  if (!raw.startsWith("file:")) {
    return { url: raw, filePath: null };
  }

  let filePath = raw.slice("file:".length);

  // Strip leading slashes quirks like file:///./prisma/dev.db on some hosts
  if (filePath.startsWith("///")) {
    filePath = filePath.slice(2);
  }

  const isAbsolute =
    path.isAbsolute(filePath) ||
    /^[A-Za-z]:[\\/]/.test(filePath);

  const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);

  // Prefer a persistent Railway volume at /data when it exists
  if (onRailway && fs.existsSync("/data")) {
    filePath = path.join("/data", "prod.db");
  } else {
    const looksEphemeral =
      !isAbsolute ||
      filePath.includes("prisma/dev.db") ||
      filePath.includes("/app/") ||
      filePath.startsWith("./") ||
      filePath.startsWith("../");

    if (onRailway && looksEphemeral && !filePath.startsWith("/data/")) {
      const dataDir = process.env.SQLITE_DATA_DIR || "/tmp/grooming-lounge";
      filePath = path.join(dataDir, "prod.db");
    } else if (!isAbsolute) {
      const dataDir = process.env.SQLITE_DATA_DIR || path.join(process.cwd(), "prisma");
      filePath = path.join(dataDir, path.basename(filePath) || "prod.db");
    }
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Prisma wants forward slashes in file URLs even on Windows
  const normalized = filePath.replace(/\\/g, "/");
  return { url: `file:${normalized}`, filePath: normalized };
}

const resolved = resolveSqlitePath(process.env.DATABASE_URL);
process.env.DATABASE_URL = resolved.url;

if (resolved.filePath) {
  console.log(`[db] SQLite path: ${resolved.filePath}`);
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
