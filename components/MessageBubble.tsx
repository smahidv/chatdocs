import type { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export default function MessageBubble({
  message,
  isStreaming = false,
}: MessageBubbleProps) {
  return (
    <div
      className={`mb-4 ${
        message.role === "user"
          ? "text-right"
          : "text-left"
      }`}
    >
      <div
        className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.content || (
          <span className="animate-pulse">
            Thinking...
          </span>
        )}

        {isStreaming && (
          <span className="ml-1 animate-pulse font-bold">
            ▋
          </span>
        )}
      </div>
    </div>
  );
}