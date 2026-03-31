'use client'
import { use, useState } from "react";
import ChatList from "./chat-list/chat-list-main";
import Sidebar from "./Sidebar";
import ChatConversationMain from "./chat-conversation/chat-conversation-main";
import { Chat } from "./types/types";

export default function ChatScreen(){
    const [ user, onSelect ] = useState<Chat>({
        id: "",
        name: "",
        online: false,
        color_profile: "",
        text_profile: "",
        lastMessage: "",
        lastMessageDate: "",
        typeLastMessage: "",
        unreadMessages: 0,
        isLastMessageFromMe: false,
        isRead: false,
        photo: ""
    })
    return(
        <div className="flex h-full">
            <Sidebar/> 
            <ChatList selectedId={user.id} onSelect={onSelect}/>
            { user.id && 
            <ChatConversationMain 
                color={ user.color_profile }
                name={ user.name }
                online={ user.online }
                text_profile={ user.text_profile }
                userPhoto={ user.photo}
                id={ user.id }
            />}
        </div>
    )
}