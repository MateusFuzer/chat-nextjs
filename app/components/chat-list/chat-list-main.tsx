"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getListChatListServices } from "./chat-list-services";
import ChatListLoading from "./chat-list-loading";
import ChatItem from "./chat-item-list";
import { Chat } from "../types/types";
type Props = {
  selectedId: string;
  onSelect: (chat: Chat) => void;
};

const tabs = ["Todas conversas", "Grupos"];

export default function ChatList({ selectedId, onSelect }: Props) {
  const [activeTab, setActiveTab] = useState("All Chats");
  const [search, setSearch] = useState("");
  const [ chatList, setChatList ] = useState([])
  const [ loadingGetChatList, setLoadingGetChatList ] = useState<boolean>( true )

  const filtered = chatList.filter((c: Chat) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  async function getListChatList(){
    var result = await getListChatListServices()
    setChatList( result.data )
    setLoadingGetChatList( false )
  }

  useEffect( () => {
    getListChatList()
  },[])


  return (
    <div className="w-80 bg-white border-r border-gray-100 flex flex-col shrink-0" id="container-chat-list">
      <>
      { loadingGetChatList ? <ChatListLoading/>
        :
        (
        <>
          <div className="px-4 pt-5 pb-3">
            <h1 className={`text-lg font-semibold text-gray-800 mb-3`}>Meu Chat</h1>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                className={`bg-transparent text-sm outline-none w-full text-gray-600 placeholder:text-gray-400`}
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
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors${
                  activeTab === tab ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((chat: Chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                selected={chat.id === selectedId}
                onClick={() => onSelect( chat )}
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


