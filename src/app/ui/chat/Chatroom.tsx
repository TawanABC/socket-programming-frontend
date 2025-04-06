import React, { useRef } from 'react'
import ChatMessage from './ChatMessage'
import { Message } from '@/common/model'
import { useAppDispatch, useAppSelector } from '@/states/hook';

export default function ChatRoom() {
    const containerRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const loggedInUserId = useAppSelector(state => state.user.user!.userId);
    console.log("login id", loggedInUserId);
    // Dummy name for the person you're chatting with
    const chattingWith = {
        id: "334",
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?u=jane" // You can use a placeholder avatar
    }

    const messages: Message[] = [
        {
            messageId: "111",
            chatRoomId: "222",
            senderId: "111",
            content: "hello",
            createdAt: "12:45",
        },
        {
            messageId: "112",
            chatRoomId: "222",
            senderId: "334",
            content: "hey there!",
            createdAt: "12:46",
        },
        {
            messageId: "113",
            chatRoomId: "222",
            senderId: "111",
            content: "how are you?",
            createdAt: "12:47",
        },
        {
            messageId: "114",
            chatRoomId: "222",
            senderId: "334",
            content: "I'm good, thanks!",
            createdAt: "12:48",
        },
        {
            messageId: "1",
            chatRoomId: "222",
            senderId: "111",
            content: "hello",
            createdAt: "12:45",
        },
        {
            messageId: "2",
            chatRoomId: "222",
            senderId: "334",
            content: "hey there!",
            createdAt: "12:46",
        },
        {
            messageId: "3",
            chatRoomId: "222",
            senderId: "111",
            content: "how are you?",
            createdAt: "12:47",
        },
        {
            messageId: "4",
            chatRoomId: "222",
            senderId: "334",
            content: "I'm good, thanks!",
            createdAt: "12:48",
        },
    ]

    return (
        <div className='max-h-[500px] h-[500px] border border-gray-300 flex flex-col'>
            {/* Top bar showing who you're chatting with */}
            <div className='flex items-center gap-2 bg-gray-600 text-white px-3 py-2 w-full'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chattingWith.avatar} alt="avatar" className='w-8 h-8 rounded-full' />
                <span className='font-semibold'>{chattingWith.name}</span>
            </div>

            {/* Message container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hidden mt-1 px-2"
            >
                {messages.map((message) => (
                    <ChatMessage message={message} key={message.messageId} />
                ))}
            </div>
        </div>
    )
}
