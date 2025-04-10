import React, { useEffect } from 'react'
import ChatItem from './ChatItem'
import { ChatRoom } from '@/common/model';
import { PlusIcon } from 'lucide-react';
import CreateChatModal from './CreateChatModal';
import { useAppSelector, useAppDispatch } from '@/states/hook';
import { setChatRooms } from '@/states/features/chatSlice';
import { getUserChatRooms } from '@/services/chatService';


export default function ChatList() {

    const userId = useAppSelector(state => state.user.user!.userId);
    const chatRooms = useAppSelector(state => state.chat.chatRooms);
    const dispatch = useAppDispatch();
    const activeRoomId = useAppSelector(state => {
        if (state.chat.activeRoom) {
            return state.chat.activeRoom.chatRoomId;
        }
        return null;
    });

    useEffect(() => {
        const fetchChatRooms = async () => {
            // console.log("fetching...");
            try {
                const chatRooms = await getUserChatRooms();
                dispatch(setChatRooms(chatRooms));
            } catch (error) {
                console.error("Failed to fetch chat rooms:", error);
            }
        };
        // console.log("chat lsit", chatRooms);
        fetchChatRooms();
    }, []);


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
