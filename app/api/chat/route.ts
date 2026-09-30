// import { generateReply } from "@/lib/services/chat";

// export async function POST(request: Request) {
//   const { message } = await request.json();

//   const encoder = new TextEncoder();

//   const stream = new ReadableStream({
//     async start(controller) {
//       try {
//         for await (const chunk of generateReply(message)) {
//           controller.enqueue(encoder.encode(chunk));
//         }

//         controller.close();
//       } catch (error) {
//         controller.error(error);
//       }
//     },
//   });

//   return new Response(stream, {
//     headers: {
//       "Content-Type": "text/plain; charset=utf-8",
//     },
//   });
// }

import { generateReply } from "@/lib/chat/generateReply";

export async function POST(request: Request) {
  const { message } = await request.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of generateReply(message)) {
          controller.enqueue(encoder.encode(chunk));
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}