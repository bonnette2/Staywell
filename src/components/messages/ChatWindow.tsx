"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  MoreVertical,
} from "lucide-react";
import type { Conversation, Message } from "@/data/messages";

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  onBack: () => void;
}

export default function ChatWindow({
  conversation,
  messages: initialMessages,
  onBack,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset messages when conversation changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [conversation.id]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: Message = {
      id: `new-${Date.now()}`,
      conversationId: conversation.id,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `reply-${Date.now()}`,
        conversationId: conversation.id,
        text: getAutoReply(text),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ─── Chat Header ─── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100">
        {/* Back button (mobile) */}
        <button
          onClick={onBack}
          className="md:hidden p-2 -ml-2 rounded-xl hover:bg-zinc-50 text-zinc-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src={conversation.participantAvatar}
              alt={conversation.participantName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          {conversation.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-black text-zinc-800 truncate">
            {conversation.participantName}
          </h3>
          <p className="text-[11px] font-medium text-zinc-400">
            {conversation.isOnline
              ? "Online"
              : `Last seen ${conversation.lastSeen ?? "recently"}`}
          </p>
        </div>

        {/* Actions */}
        <button className="p-2 rounded-xl hover:bg-zinc-50 text-zinc-400 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* ─── Messages Area ─── */}
      <div className="flex-1 overflow-y-auto px-5 py-6 messages-scrollbar bg-[#fafafa]">
        {/* Property context badge */}
        {conversation.propertyName && (
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-zinc-100 rounded-full text-[11px] font-bold text-zinc-500 shadow-sm">
              🏠 {conversation.propertyName}
            </span>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i < initialMessages.length ? 0 : 0.1 }}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] md:max-w-[60%] group ${
                  msg.isOwn ? "order-2" : ""
                }`}
              >
                <div
                  className={`px-4 py-3 text-sm font-medium leading-relaxed ${
                    msg.isOwn
                      ? "bg-primary text-white rounded-[1.25rem] rounded-br-md shadow-md shadow-primary/15"
                      : "bg-white text-zinc-700 rounded-[1.25rem] rounded-bl-md shadow-sm border border-zinc-100"
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`flex items-center gap-1 mt-1 px-1 ${
                    msg.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="text-[10px] font-medium text-zinc-400">
                    {msg.timestamp}
                  </span>
                  {msg.isOwn && msg.status && (
                    <span className="text-zinc-400">
                      {msg.status === "read" ? (
                        <CheckCheck size={12} className="text-primary" />
                      ) : (
                        <Check size={12} />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex justify-start"
              >
                <div className="bg-white border border-zinc-100 rounded-[1.25rem] rounded-bl-md px-5 py-3 shadow-sm">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Input Area ─── */}
      <div className="px-5 py-4 border-t border-zinc-100 bg-white">
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl hover:bg-zinc-50 text-zinc-400 hover:text-zinc-600 transition-all">
            <Paperclip size={18} />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-zinc-50 text-zinc-400 hover:text-zinc-600 transition-all">
            <Smile size={18} />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-5 py-3 bg-zinc-50 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-zinc-400"
            suppressHydrationWarning
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-3 rounded-2xl transition-all shadow-md ${
              input.trim()
                ? "bg-primary text-white hover:bg-[#064e3b] shadow-primary/20"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none"
            }`}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ─── Auto-reply generator (for demo feel) ─── */
function getAutoReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("check-in") || lower.includes("check in"))
    return "Check-in is at 2 PM, but I can arrange early check-in upon request!";
  if (lower.includes("parking") || lower.includes("car"))
    return "Yes, free private parking is available on-site.";
  if (lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("internet"))
    return "High-speed Wi-Fi is included. I'll send you the credentials before your arrival.";
  if (lower.includes("pool") || lower.includes("swim"))
    return "The pool is open from 8 AM to 10 PM daily. Towels are provided poolside!";
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate"))
    return "Our rates are very competitive. You can check the latest pricing on the property page.";
  if (lower.includes("thank"))
    return "You're welcome! Don't hesitate to reach out if you need anything else. 😊";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hi there! How can I help you today?";

  const genericReplies = [
    "Thanks for your message! I'll get back to you shortly.",
    "Great question! Let me check on that for you.",
    "Absolutely! I'm happy to help with that.",
    "I'll look into this and update you soon.",
    "Thanks for reaching out! Everything is on track for your stay. 🏡",
  ];
  return genericReplies[Math.floor(Math.random() * genericReplies.length)];
}
