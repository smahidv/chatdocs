export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return new Response("Invalid file", {
      status: 400,
    });
  }

  const buffer = await file.arrayBuffer();

  console.log("File received:", {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  console.log("Buffer size:", buffer.byteLength);

  return Response.json({
    success: true,
    filename: file.name,
    size: buffer.byteLength,
  });
}