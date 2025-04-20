"use client"

import React from 'react'
import ChatRoom from '../ui/chat/Chatroom'
import ChatList from '../ui/chat/ChatList'
import OnlineUsers from '../ui/OnlineUsers'

export default function HomePage() {
  return (
    <div className='bg-slate-50 flex flex-row justify-around overflow-hidden rounded-lg'>
      <ChatList />
      <div className='grow'>
        <ChatRoom />
      </div>
      <OnlineUsers />
    </div>
  )
}
