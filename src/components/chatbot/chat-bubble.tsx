import React from 'react';
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isBot?: boolean;
  className?: string;
}

export function ChatBubble({ message, isBot = false, className }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full my-2",
        isBot ? "justify-start" : "justify-end",
        className
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-[18px] max-w-[85%] text-sm md:text-base shadow-sm whitespace-pre-wrap break-words",
          isBot
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-[4px]"
            : "bg-blue-600 text-white rounded-br-[4px]"
        )}
      >
        {message}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start my-2">
      <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-[18px] rounded-bl-[4px] shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
} 