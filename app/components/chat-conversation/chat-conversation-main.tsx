"use client";

import { useEffect, useState } from "react";
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
  LoaderIcon,
} from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getListChatListServices } from "../chat-list/chat-list-services";
import { getListChatMessagesServices } from "./chat-conversation-services";
import { cn } from "@/lib/utils";
import ChatErrorGetMessages from "./chat-conversation-error";

type Props = { 
    userPhoto: string,
    online: boolean,
    color: string,
    name: string,
    text_profile: string
    id: string
 };

 type file = {
   name: string,
   size: string,
   ext: string
 }

 type video = {
   duration: string,
   caption: string
 }

 type messages = {
    id: string ,
    senderId: string ,
    type: string,
    time: string,
    text?: string,
    file?: file,
    video?: video
 }

export default function ChatConversationMain({ userPhoto, online, color, name, text_profile, id }: Props) {
  const [input, setInput] = useState("");
  const [ messages, setMessages ] = useState<messages[]>([])
  const [ loadingGetMessages, setLoadingGetMessages ] = useState( false )
  const [ errorGetMessages, setErrorGetMessages ] = useState({
    error: false,
    message: ""
  })

  async function getListChatMessages(){
    if( errorGetMessages.error ){
      setErrorGetMessages({
        error: false,
        message: ""
      })
    }
    setLoadingGetMessages( true )
    var messagesRequest = await getListChatMessagesServices()
    console.log(messagesRequest)
    if( messagesRequest.error ){
      setErrorGetMessages({
        error: true,
        message: messagesRequest.error
      })
    }
    else{
      setMessages( messagesRequest.data )
    }
    setLoadingGetMessages( false )
  }

  useEffect( () => {
    if( id ){
      getListChatMessages()
    }
  }, [ id ])
  
  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
      <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Avatar>
           {userPhoto && <AvatarImage src={ userPhoto } alt="Foto do usuário" /> }
            <AvatarFallback>{ text_profile }</AvatarFallback>
          { online && <AvatarBadge className="bg-green-500 dark:bg-green-800" /> }
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-800">{ name }</p>
            <p className="text-xs">{ online ? 
              <span className="text-green-500">● Online</span> : 
              <span className="text-zinc-500">Offline</span>}
            </p>
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
      { loadingGetMessages &&
        <div className="h-full w-full flex justify-center items-center">
        <LoaderIcon
              role="status"
              aria-label="Loading"
              className={cn("size-6 animate-spin")}
            />
        </div>  
      }
      {
        !loadingGetMessages && errorGetMessages.error &&
        <div className="h-full w-full flex justify-center items-center">
            <ChatErrorGetMessages message={ errorGetMessages.message } cb={getListChatMessages}/>
        </div>
      }
      {/* Messages */}
      { !loadingGetMessages && !errorGetMessages.error &&
       <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!isMe && (
                <Avatar size="sm">
                  {userPhoto && <AvatarImage src={ userPhoto } alt="Foto do usuário" /> }
                  <AvatarFallback>{ text_profile }</AvatarFallback>
                  { online && <AvatarBadge className="bg-green-500 dark:bg-green-800" /> }
                </Avatar>
              )}

              <div className={`flex flex-col gap-1 max-w-sm ${isMe ? "items-end" : "items-start"}`}>
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

                {msg.type === "text" && msg.text && (
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? "bg-blue-600 text-white rounded-br-sm" : "bg-white text-gray-800 shadow-sm rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                )}

                <div className={`flex items-center gap-1 ${isMe ? "flex-row-reverse" : ""}`}>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>}

      {/* Input */}
     { !loadingGetMessages && !errorGetMessages.error &&
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
     }
    </div>
  );
}
