"use client";

import { MessageSquare, Phone, Users, Settings, Moon, Globe } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-2 shrink-0">
      {/* Logo */}
      <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
        <Image
          src={"/icons8-wolf-32 -white.png"}
          alt="Icone do lobo"
          width={20}
          height={20}
        />
      </div>

      {/* Nav icons */}
      <button className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
        <MessageSquare className="w-5 h-5" />
      </button>
      {/* <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <Phone className="w-5 h-5" />
      </button> */}
      <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <Users className="w-5 h-5" />
      </button>
     {/*  <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <Settings className="w-5 h-5" />
      </button>
 */}
      <div className="flex-1" />

      <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <Moon className="w-5 h-5" />
      </button>
      {/* <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100">
        <Globe className="w-5 h-5" />
      </button> */}

      {/* User avatar */}
      <div className="w-9 h-9 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs font-semibold mt-2">
        ME
      </div>
    </div>
  );
}
