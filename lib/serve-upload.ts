import { createReadStream } from "fs";
import { readFile, stat } from "fs/promises";
import path from "path";
import { Readable } from "stream";

export const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

export function resolveUploadFile(segments: string[]): string | null {
  if (!segments.length) return null;

  const safeSegments = segments.filter((segment) => segment && segment !== "." && segment !== "..");
  if (safeSegments.length !== segments.length) return null;

  const resolved = path.resolve(UPLOAD_ROOT, ...safeSegments);
  const relative = path.relative(UPLOAD_ROOT, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }

  return resolved;
}

export function getUploadContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

function parseRangeHeader(rangeHeader: string, fileSize: number) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!match) return null;

  let start = match[1] ? Number.parseInt(match[1], 10) : 0;
  let end = match[2] ? Number.parseInt(match[2], 10) : fileSize - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || end < start || start >= fileSize) {
    return null;
  }

  end = Math.min(end, fileSize - 1);
  return { start, end };
}

export async function serveUploadFile(
  request: Request,
  segments: string[],
  method: "GET" | "HEAD" = "GET",
): Promise<Response> {
  const filePath = resolveUploadFile(segments);
  if (!filePath) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  let fileStat;
  try {
    fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const contentType = getUploadContentType(filePath);
  const cacheControl = "public, max-age=86400, stale-while-revalidate=604800";
  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const range = parseRangeHeader(rangeHeader, fileStat.size);
    if (!range) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${fileStat.size}` },
      });
    }

    const { start, end } = range;
    const chunkSize = end - start + 1;
    const stream = createReadStream(filePath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(chunkSize),
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": cacheControl,
      },
    });
  }

  if (method === "HEAD") {
    return new Response(null, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(fileStat.size),
        "Accept-Ranges": "bytes",
        "Cache-Control": cacheControl,
      },
    });
  }

  const data = await readFile(filePath);
  return new Response(data, {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(fileStat.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": cacheControl,
    },
  });
}
