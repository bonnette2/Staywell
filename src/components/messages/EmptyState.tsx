"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export default function EmptyState({
  title = "Select a conversation",
  subtitle = "Choose a conversation from the list to start chatting",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full text-center px-8"
    >
      <div className="w-20 h-20 bg-primary/8 rounded-[1.5rem] flex items-center justify-center mb-6">
        <MessageSquare size={36} className="text-primary/50" />
      </div>
      <h3 className="text-lg font-black text-zinc-800 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 font-medium max-w-xs leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}
