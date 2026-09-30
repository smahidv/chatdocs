interface ChatInputProps {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  value,
  isLoading,
  onChange,
  onSend,
}: ChatInputProps) {
  return (
    <div className="mt-4 flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend();
          }
        }}
        placeholder="Ask something..."
        className="flex-1 rounded-lg border px-4 py-2"
      />

      <button
        onClick={onSend}
        disabled={isLoading}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}