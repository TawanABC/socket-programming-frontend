import { ChatRoom } from '@/common/model'
import React from 'react'

export default function ChatItem({ chatRoom }: { chatRoom: ChatRoom }) {
    const isChatGroup = chatRoom.isChatGroup
    const users = chatRoom.users
    const chatName = isChatGroup ? users[0].username : `${users[0].username} (${users.length})`
    return (
        <div
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition'
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isChatGroup ? "/group_chat.png" : users[0].profileUrl} alt="profile" className='w-10 h-10 rounded-full' />
            <div className='flex-1'>
                <div className='flex justify-between'>
                    <span className='font-medium'>{chatName}</span>
                    {/* <span className='text-sm text-gray-400'>{chat.time}</span> */}
                </div>
                <p className='text-sm text-gray-600 truncate'>{"last message"}</p>
            </div>
        </div>
    )
}
