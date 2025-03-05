'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatBubble, TypingIndicator } from "./chat-bubble";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isBot: boolean;
}

export function ChatContainer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 첫 번째 열었을 때 인사 메시지 표시
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          text: "안녕하세요! 군입대 관련 궁금한 점을 물어보세요. 예를 들어 '신체검사 1급이 뭐야?'와 같이 질문해 보세요.",
          isBot: true
        }
      ]);
    }
    
    // 대화창이 열리면 입력창에 포커스
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // 새 메시지가 추가될 때마다 스크롤 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage() {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsTyping(true);

    try {
      // 약간의 지연 효과
      setTimeout(async () => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ message: userMessage }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("API 요청 실패");
          }

          const { reply } = await res.json();
          setMessages(prev => [...prev, { text: reply, isBot: true }]);
        } catch (error) {
          console.error("에러:", error);
          setMessages(prev => [...prev, { text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.", isBot: true }]);
        } finally {
          setIsTyping(false);
        }
      }, 1000);
    } catch (error) {
      console.error("에러:", error);
      setMessages(prev => [...prev, { text: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.", isBot: true }]);
      setIsTyping(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="w-[95%] max-w-md p-0 gap-0 border rounded-2xl shadow-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 sm:zoom-in-90">
        <div className="flex flex-col h-[500px]">
          {/* 헤더 */}
          <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-900">
            <DialogTitle className="font-bold">군입대 정보 도우미</DialogTitle>
            <Button 
              onClick={() => setOpen(false)}
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8 p-0"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-500"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="sr-only">닫기</span>
            </Button>
          </div>
          
          {/* 메시지 영역 */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {messages.map((msg, index) => (
              <ChatBubble
                key={index}
                message={msg.text}
                isBot={msg.isBot}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          {/* 입력 영역 */}
          <div className="p-3 border-t flex items-center gap-2 bg-white dark:bg-gray-900">
            <Input
              ref={inputRef}
              placeholder="질문을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 rounded-full border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700 flex-shrink-0 shadow-sm"
              disabled={!input.trim()}
              aria-label="메시지 보내기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 