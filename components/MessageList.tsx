import type { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({
  messages,
  isLoading,
}: MessageListProps) {
  return (
    <>
      {messages.length === 0 ? (
        <p className="text-gray-500">
          Start a conversation...
        </p>
      ) : (
        messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={
              isLoading &&
              message.role === "assistant" &&
              index === messages.length - 1
            }
          />
        ))
      )}
    </>
  );
}