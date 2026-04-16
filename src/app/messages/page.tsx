"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";
import EmptyState from "@/components/messages/EmptyState";
import { mockConversations, mockMessages } from "@/data/messages";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function MessagesPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false); // mobile toggle

  // Auth guard
  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  const activeConvo = mockConversations.find((c) => c.id === activeId) ?? null;
  const activeMessages = activeId ? mockMessages[activeId] ?? [] : [];

  const handleSelect = (id: string) => {
    setActiveId(id);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  return (
    <>
      <Header />
      <main className="pt-[88px] h-screen flex flex-col bg-[#f5f5f5]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-5 flex flex-col"
        >
          <div className="flex-1 bg-white rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden flex min-h-0">
            {/* ─── Left Panel: Conversation List ─── */}
            <div
              className={`w-full md:w-[340px] md:min-w-[340px] md:border-r border-zinc-100 flex-shrink-0 ${
                showChat ? "hidden md:flex md:flex-col" : "flex flex-col"
              }`}
            >
              <ConversationList
                conversations={mockConversations}
                activeId={activeId}
                onSelect={handleSelect}
              />
            </div>

            {/* ─── Right Panel: Chat / Empty ─── */}
            <div
              className={`flex-1 min-w-0 ${
                !showChat ? "hidden md:flex md:flex-col" : "flex flex-col"
              }`}
            >
              {activeConvo ? (
                <ChatWindow
                  conversation={activeConvo}
                  messages={activeMessages}
                  onBack={handleBack}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
