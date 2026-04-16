/* ─── Message & Conversation types + mock data ─── */

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: "host" | "guest";
  isOnline: boolean;
  lastSeen?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  propertyName?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
}

/* ─── Mock Conversations ─── */
export const mockConversations: Conversation[] = [
  {
    id: "c1",
    participantName: "Alice Kamanzi",
    participantAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    participantRole: "host",
    isOnline: true,
    lastMessage: "The pool area is available after 3 PM 🏊",
    lastMessageTime: "2 min ago",
    unreadCount: 3,
    propertyName: "Lakeside Villa, Kibuye",
  },
  {
    id: "c2",
    participantName: "David Mugisha",
    participantAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    participantRole: "host",
    isOnline: false,
    lastSeen: "1 hour ago",
    lastMessage: "Sure, I can arrange early check-in for you.",
    lastMessageTime: "45 min ago",
    unreadCount: 1,
    propertyName: "Mountain Retreat, Musanze",
  },
  {
    id: "c3",
    participantName: "Sarah Uwimana",
    participantAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    participantRole: "host",
    isOnline: true,
    lastMessage: "Thank you for your booking! Looking forward to hosting you.",
    lastMessageTime: "3 hrs ago",
    unreadCount: 0,
    propertyName: "Modern Apartment, Kigali",
  },
  {
    id: "c4",
    participantName: "James Habimana",
    participantAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    participantRole: "guest",
    isOnline: false,
    lastSeen: "Yesterday",
    lastMessage: "Is parking included with the reservation?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    propertyName: "City Center Studio",
  },
  {
    id: "c5",
    participantName: "Grace Mukamana",
    participantAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    participantRole: "host",
    isOnline: false,
    lastSeen: "2 days ago",
    lastMessage: "Wi-Fi password has been sent to your email.",
    lastMessageTime: "2 days ago",
    unreadCount: 0,
    propertyName: "Cozy Bungalow, Rubavu",
  },
  {
    id: "c6",
    participantName: "Emmanuel Ndayisaba",
    participantAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    participantRole: "host",
    isOnline: true,
    lastMessage: "Your reservation is confirmed for next Friday.",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    propertyName: "Eco Lodge, Nyungwe",
  },
];

/* ─── Mock Messages per conversation ─── */
export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: "m1", conversationId: "c1", text: "Hi! I just booked the Lakeside Villa for next weekend. Can't wait!", timestamp: "10:02 AM", isOwn: true, status: "read" },
    { id: "m2", conversationId: "c1", text: "Welcome! You're going to love it. The sunset views are incredible 🌅", timestamp: "10:05 AM", isOwn: false },
    { id: "m3", conversationId: "c1", text: "That sounds amazing! Is the pool heated?", timestamp: "10:08 AM", isOwn: true, status: "read" },
    { id: "m4", conversationId: "c1", text: "Yes, the pool is heated year-round. Perfect temperature!", timestamp: "10:12 AM", isOwn: false },
    { id: "m5", conversationId: "c1", text: "Great! What time can we access the pool area?", timestamp: "10:15 AM", isOwn: true, status: "read" },
    { id: "m6", conversationId: "c1", text: "The pool area is available after 3 PM 🏊", timestamp: "10:18 AM", isOwn: false },
  ],
  c2: [
    { id: "m7", conversationId: "c2", text: "Hello! I have a booking for the Mountain Retreat on the 20th.", timestamp: "9:00 AM", isOwn: true, status: "read" },
    { id: "m8", conversationId: "c2", text: "Hi there! Yes, I can see your booking. Everything looks good.", timestamp: "9:15 AM", isOwn: false },
    { id: "m9", conversationId: "c2", text: "Would it be possible to check in a bit earlier? Around 11 AM?", timestamp: "9:20 AM", isOwn: true, status: "read" },
    { id: "m10", conversationId: "c2", text: "Sure, I can arrange early check-in for you.", timestamp: "9:30 AM", isOwn: false },
  ],
  c3: [
    { id: "m11", conversationId: "c3", text: "Hi Sarah! Just confirmed my booking for the Modern Apartment.", timestamp: "Yesterday", isOwn: true, status: "read" },
    { id: "m12", conversationId: "c3", text: "Thank you for your booking! Looking forward to hosting you.", timestamp: "Yesterday", isOwn: false },
  ],
  c4: [
    { id: "m13", conversationId: "c4", text: "Hi! I'm interested in the City Center Studio.", timestamp: "Yesterday", isOwn: false },
    { id: "m14", conversationId: "c4", text: "Hello James! It's available for your dates. Would you like to book?", timestamp: "Yesterday", isOwn: true, status: "read" },
    { id: "m15", conversationId: "c4", text: "Is parking included with the reservation?", timestamp: "Yesterday", isOwn: false },
  ],
  c5: [
    { id: "m16", conversationId: "c5", text: "Hi! I just arrived at the Cozy Bungalow. What's the Wi-Fi password?", timestamp: "2 days ago", isOwn: true, status: "read" },
    { id: "m17", conversationId: "c5", text: "Wi-Fi password has been sent to your email.", timestamp: "2 days ago", isOwn: false },
  ],
  c6: [
    { id: "m18", conversationId: "c6", text: "Hi Emmanuel! I'd like to book the Eco Lodge for next Friday.", timestamp: "3 days ago", isOwn: true, status: "read" },
    { id: "m19", conversationId: "c6", text: "That's a great choice! Let me check availability.", timestamp: "3 days ago", isOwn: false },
    { id: "m20", conversationId: "c6", text: "Your reservation is confirmed for next Friday.", timestamp: "3 days ago", isOwn: false },
  ],
};
