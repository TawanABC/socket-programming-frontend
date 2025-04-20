"use client"

import React from 'react'
import ChatRoom from '../ui/chat/Chatroom'
import ChatList from '../ui/chat/ChatList'
import OnlineUsers from '../ui/OnlineUsers'

export default function HomePage() {
  return (
    <div className='bg-slate-50 flex flex-row justify-around overflow-hidden rounded-lg'>
      {/* <div className="mt-24 flex max-h-[600px] flex-row bg-gray-100 w-9/12 justify-around gap-3 p-3 overflow-hidden"></div> */}
      <ChatList />
      <div className='flex-1'>
        <ChatRoom />
      </div>
      <div className='flex-1'>
        <OnlineUsers />
      </div>
    </div>
  )
}
