
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { CheckCheck } from "lucide-react";

type Chat = {
  id: string,
  name: string,
  online: boolean,
  color_profile: string,
  text_profile: string,
  lastMessage: string,
  lastMessageDate: string,
  typeLastMessage: string,
  unreadMessages: number,
  isLastMessageFromMe: boolean,
  isRead: boolean,
  photo: string
}

export default function ChatItem({ chat, selected, onClick }: { chat: Chat; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left relative hover:cursor-pointer ${
        selected ? "bg-blue-50" : ""
      }`}
    >
      <div className="relative shrink-0">
        <Avatar>
           {chat.photo && <AvatarImage src={ chat.photo } alt="Foto do usuário" /> }
            <AvatarFallback>{chat.text_profile}</AvatarFallback>
          {chat.online && <AvatarBadge className="bg-green-500 dark:bg-green-800" /> }
        </Avatar>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold text-gray-800 truncate`}>
            {chat.name}
          </span>
          <span className="text-xs text-gray-400 shrink-0 ml-2">{chat.lastMessageDate}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-2">
            {chat.isLastMessageFromMe && chat.isRead &&  <CheckCheck size={14} color="#44ACFF"/> } 
            {chat.isLastMessageFromMe && !chat.isRead &&  <CheckCheck size={14}/> } 
            <p className={`text-xs text-gray-500 truncate`}>
              {chat.lastMessage}
            </p>
           </div> 
         
          {chat.unreadMessages > 0 && (
            <span className="ml-2 shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              {chat.unreadMessages}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}