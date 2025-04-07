import React from 'react'
import ChatItem from './ChatItem'
import { ChatRoom } from '@/common/model';
import { PlusIcon } from 'lucide-react';
import CreateChatModal from './CreateChatModal';

const chatRooms: ChatRoom[] = [
    {
        chatRoomId: 'room-001',
        isChatGroup: false,
        users: [
            {
                userId: 'u-001',
                username: 'Alice Johnson',
                email: 'alice.johnson@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=alice',
            },
            {
                userId: 'u-002',
                username: 'You',
                email: 'you@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=you',
            },
        ],
    },
    {
        chatRoomId: 'room-002',
        isChatGroup: false,
        users: [
            {
                userId: 'u-003',
                username: 'Bob Smith',
                email: 'bob.smith@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=bob',
            },
            {
                userId: 'u-002',
                username: 'You',
                email: 'you@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=you',
            },
        ],
    },
    {
        chatRoomId: 'room-003',
        isChatGroup: true,
        users: [
            {
                userId: 'u-002',
                username: 'You',
                email: 'you@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=you',
            },
            {
                userId: 'u-004',
                username: 'Charlie Tan',
                email: 'charlie.tan@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=charlie',
            },
            {
                userId: 'u-005',
                username: 'Dana Lee',
                email: 'dana.lee@email.com',
                profileUrl: 'https://i.pravatar.cc/150?u=dana',
            },
        ],
    },
];

export default function ChatList() {
    const openModal = (modalId: string) => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
        (
            document.getElementById(modalId) as HTMLDialogElement
        )?.showModal();
    }
    return (<>
        <div className='w-[300px] bg-slate-50 p-3 overflow-y-auto'>
            <div className='flex flex-row items-center justify-between'>
                <h2 className='text-xl font-bold'>Chats</h2>
                <button type="button" className='hover:bg-slate-200 hover:cursor-pointer p-1 rounded-md'
                    onClick={() => openModal('createChatModal')}>
                    <PlusIcon />
                </button>
            </div>
            {chatRooms.map(chatRoom => (
                <ChatItem chatRoom={chatRoom} key={`chat-item-${chatRoom.chatRoomId}`} />
            ))}
        </div>

        <CreateChatModal modalId='createChatModal' />
    </>

    )
}
