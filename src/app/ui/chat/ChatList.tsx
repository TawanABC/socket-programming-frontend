import React, { useEffect, useState } from 'react'
import ChatItem from './ChatItem'
import { PlusIcon } from 'lucide-react';
import CreateChatModal from './CreateChatModal';
import { useAppSelector, useAppDispatch } from '@/states/hook';
import { setChatRooms } from '@/states/features/chatSlice';
import { getUserChatRooms } from '@/services/chatService';


export default function ChatList() {
    const [chatCreatedTrigger, setChatCreatedTrigger] = useState(true);
    const handlesetChatCreatedTrigger = () => {
        setChatCreatedTrigger(prev => !prev);
    };

    const chatRooms = useAppSelector(state => state.chat.chatRooms);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchChatRooms = async () => {
            console.log("fetching...");
            try {
                const chatRooms = await getUserChatRooms();
                dispatch(setChatRooms(chatRooms));
            } catch (error) {
                console.error("Failed to fetch chat rooms:", error);
            }
        };
        fetchChatRooms();
    }, [chatCreatedTrigger, dispatch]);


    const openModal = (modalId: string) => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
        (
            document.getElementById(modalId) as HTMLDialogElement
        )?.showModal();
    }
    return (<>
        <div>
            <div className='p-3 flex flex-row justify-between'>
                <h2 className='text-xl font-bold'>Chats</h2>
                <button type="button" className='hover:bg-slate-200 hover:cursor-pointer p-1 rounded-md'
                    onClick={() => openModal('createChatModal')}>
                    <PlusIcon />
                </button>
            </div>

            <div className='w-[300px] bg-slate-50 p-3 max-h-[500px] h-[440] overflow-y-auto overflow-x-hidden'>

                {chatRooms.map(chatRoom => (
                    <ChatItem chatRoom={chatRoom} key={`chat-item-${chatRoom.chatRoomId}`} />
                ))}
            </div>
        </div>
        <CreateChatModal modalId='createChatModal' chatCreatedTrigger={handlesetChatCreatedTrigger} />
    </>

    )
}
