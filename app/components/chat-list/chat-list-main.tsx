"use client";

import { useEffect, useState } from "react";
import { CheckCheck, Search } from "lucide-react";
import { getListChatListServices } from "./chat-list-services";
import { Skeleton } from "@/components/ui/skeleton";
import ChatListLoading from "./chat-list-loading";
import { Google_Sans } from "next/font/google";
const google_sans = Google_Sans({
});

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

const tabs = ["All Chats", "Groups", "Archived"];

export default function ChatList({ selectedId, onSelect }: Props) {
  const [activeTab, setActiveTab] = useState("All Chats");
  const [search, setSearch] = useState("");
  const [ chatList, setChatList ] = useState([])
  const [ loadingGetChatList, setLoadingGetChatList ] = useState<boolean>( true )

  const filtered = chatList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  async function teste(){
    var result = await getListChatListServices()
    console.log( result )
    setChatList( result.data )
    setLoadingGetChatList( false )
  }

  useEffect( () => {
    teste()
  },[])




  return (
    <div className="w-80 bg-white border-r border-gray-100 flex flex-col shrink-0" id="container-chat-list">
      
      <>
      { loadingGetChatList ? <ChatListLoading/>
        :
        (
        <>
          <div className="px-4 pt-5 pb-3">
            <h1 className="text-lg font-semibold text-gray-800 mb-3">My Chats</h1>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder:text-gray-400"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-1 px-4 pb-3 border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === tab ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                selected={chat.id === selectedId}
                onClick={() => onSelect(chat.id)}
              />
            ))}
          </div>
        </>
        )
         }
      </>
    </div>
  );
}

function ChatItem({ chat, selected, onClick }: { chat: Chat; selected: boolean; onClick: () => void }) {
  const color = `bg-[${chat.color_profile}]`;
  console.log(color)

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left relative ${
        selected ? "bg-blue-50" : ""
      }`}
    >
      <div className="relative shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold`}
         style={{ backgroundColor: chat.color_profile }}
        >
          {chat.text_profile}
        </div>
        {chat.online && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold text-gray-800 truncate ${google_sans.className}`}>
            {chat.name}
            {chat.pinned && <span className="ml-1 text-yellow-500">📌</span>}
          </span>
          <span className="text-xs text-gray-400 shrink-0 ml-2">{chat.time}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-2">
            {chat.isLastMessageFromMe && chat.isRead &&  <CheckCheck size={14} color="#44ACFF"/> } 
            {chat.isLastMessageFromMe && !chat.isRead &&  <CheckCheck size={14}/> } 
            <p className={`text-xs text-gray-500 truncate ${google_sans.className}`}>
              {chat.lastMessage}
            </p>
           </div> 
         
          {chat.unread > 0 && (
            <span className="ml-2 shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              {chat.unread}
            </span>
          )}
        </div>
        <div className={`absolute text-[12px] top-2 right-2 ${google_sans.className}`}>{ chat.lastMessageDate}</div>

      </div>

    </button>
  );
}
