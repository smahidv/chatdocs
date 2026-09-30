"use client";

import { useState } from "react";
import type { Message } from "@/types/chat";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSend = async () => {
		if (!input.trim()) return;
		setIsLoading(true);

		const userMessage = {
			id: crypto.randomUUID(),
			role: "user" as const,
			content: input,
		};

		// Show the user's message immediately
		const assistantId = crypto.randomUUID();

		setMessages((prev) => [
			...prev,
			userMessage,
			{
				id: assistantId,
				role: "assistant",
				content: "",
			},
		]);

		// Save the current input before clearing it
		const message = input;

		// Clear the input
		setInput("");

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
				}),
			});

			// before streaming we returned json response
			const reader = response.body?.getReader();

			if (!reader) {
				throw new Error("No response body");
			}

			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				const chunk = decoder.decode(value);

				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === assistantId
							? {
									...msg,
									content: msg.content + chunk,
								}
							: msg,
					),
				);
			}
		} catch (error) {
			console.error(error);
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: "Something went wrong.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto flex h-screen max-w-4xl flex-col p-6">
			<div className="flex-1 overflow-y-auto rounded-lg border p-4">
			<MessageList messages={messages} isLoading={isLoading} />
			</div>
		
			<ChatInput
				value={input}
				isLoading={isLoading}
				onChange={setInput}
				onSend={handleSend}
			/>
		</div>
	);
}
