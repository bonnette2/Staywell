"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Conversation } from "@/data/messages";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase()) ||
      (c.propertyName?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-xl font-black text-zinc-900 mb-4">Messages</h2>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-50 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-zinc-400"
            suppressHydrationWarning
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 messages-scrollbar">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm font-bold text-zinc-400">No conversations found</p>
          </div>
        ) : (
          filtered.map((convo, i) => {
            const isActive = activeId === convo.id;
            return (
              <motion.button
                key={convo.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => onSelect(convo.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-4 rounded-2xl text-left transition-all mb-1 group ${
                  isActive
                    ? "bg-primary/5 shadow-sm"
                    : "hover:bg-zinc-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={convo.participantAvatar}
                      alt={convo.participantName}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Online indicator */}
                  {convo.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-sm font-bold truncate ${
                        isActive ? "text-primary" : "text-zinc-800"
                      }`}
                    >
                      {convo.participantName}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-400 shrink-0 ml-2">
                      {convo.lastMessageTime}
                    </span>
                  </div>
                  {convo.propertyName && (
                    <p className="text-[11px] font-bold text-primary/60 truncate mb-0.5">
                      {convo.propertyName}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 font-medium truncate pr-2">
                      {convo.lastMessage}
                    </p>
                    {convo.unreadCount > 0 && (
                      <span className="shrink-0 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                        {convo.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>
    </div>
  );
}
