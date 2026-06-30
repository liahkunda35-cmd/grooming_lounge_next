import { serveUploadFile } from "@/lib/serve-upload";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  return serveUploadFile(request, segments, "HEAD");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  return serveUploadFile(request, segments, "GET");
}
