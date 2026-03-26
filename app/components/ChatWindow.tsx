"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  Video,
  User,
  MoreVertical,
  Plus,
  Mic,
  Send,
  FileText,
  Download,
  Play,
  CheckCheck,
} from "lucide-react";
import { messages, chats, avatarColors } from "@/lib/mock-data";

type Props = { chatId: string };

export default function ChatWindow({ chatId }: Props) {
  const [input, setInput] = useState("");
  const chat = chats.find((c) => c.id === chatId);
  const color = avatarColors[chat?.avatar ?? ""] ?? "bg-gray-400";

  if (!chat) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold`}>
              {chat.avatar}
            </div>
            {chat.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{chat.name}</p>
            <p className="text-xs text-green-500">{chat.online ? "● Online" : "Offline"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button className="hover:text-gray-600"><Search className="w-5 h-5" /></button>
          <button className="hover:text-gray-600"><Phone className="w-5 h-5" /></button>
          <button className="hover:text-gray-600"><Video className="w-5 h-5" /></button>
          <button className="hover:text-gray-600"><User className="w-5 h-5" /></button>
          <button className="hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              {!isMe && (
                <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                  {chat.avatar}
                </div>
              )}

              <div className={`flex flex-col gap-1 max-w-sm ${isMe ? "items-end" : "items-start"}`}>
                {/* File message */}
                {msg.type === "file" && msg.file && (
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isMe ? "bg-blue-600 text-white" : "bg-white text-gray-800 shadow-sm"}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isMe ? "bg-blue-500" : "bg-blue-50"}`}>
                      <FileText className={`w-5 h-5 ${isMe ? "text-white" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{msg.file.name}</p>
                      <p className={`text-xs ${isMe ? "text-blue-200" : "text-gray-400"}`}>{msg.file.size}</p>
                    </div>
                    {isMe && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-500 px-2 py-0.5 rounded font-medium">{msg.file.ext}</span>
                        <button><Download className="w-4 h-4 text-white" /></button>
                      </div>
                    )}
                  </div>
                )}

                {/* Video message */}
                {msg.type === "video" && msg.video && (
                  <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="relative w-64 h-40 bg-gray-700 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      {/* Fake video thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-gray-600 to-gray-800 opacity-80" />
                      <button className="relative z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                      </button>
                      <span className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-1.5 py-0.5 rounded">
                        {msg.video.duration}
                      </span>
                    </div>
                    <p className="text-xs text-center text-gray-600 py-2 px-3">{msg.video.caption}</p>
                  </div>
                )}

                {/* Text message */}
                {msg.type === "text" && msg.text && (
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? "bg-blue-600 text-white rounded-br-sm" : "bg-white text-gray-800 shadow-sm rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                )}

                {/* Time + read */}
                <div className={`flex items-center gap-1 ${isMe ? "flex-row-reverse" : ""}`}>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 shrink-0">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600">
          <Plus className="w-5 h-5" />
        </button>
        <input
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none text-gray-700 placeholder:text-gray-400"
          placeholder="Write your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600">
          <Mic className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
