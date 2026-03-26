'use client'
import { useState } from "react";
import ChatList from "./chat-list/chat-list-main";
import Sidebar from "./Sidebar";

export default function ChatScreen(){
    const [ selectedId, onSelect ] = useState('')
    return(
        <div className="flex h-full">
            <Sidebar/> 
            <ChatList selectedId={selectedId} onSelect={onSelect}/>
        </div>
    )
}