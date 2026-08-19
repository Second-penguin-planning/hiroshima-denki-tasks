import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.searchParams.get("pathname");
  const filename = url.searchParams.get("filename") ?? "document.pdf";

  if (!pathname || !pathname.startsWith("uploads/")) {
    return new Response(JSON.stringify({ error: "invalid pathname" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/pdf",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
