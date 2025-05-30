/* eslint-disable react-hooks/exhaustive-deps */
import { ChatRoom, User } from '@/common/model'
import { getChatRoomDetails } from '@/services/chatService';
import { getUserById } from '@/services/userService';
import { setActiveRoom } from '@/states/features/chatSlice';
import { useAppDispatch, useAppSelector } from '@/states/hook';
import React, { useEffect, useState } from 'react'

export default function ChatItem({ chatRoom }: { chatRoom: ChatRoom }) {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.user.user!.userId);
    const isChatGroup = chatRoom.isGroup
    const users = chatRoom.users
    const [otherUsername, setOtherUsername] = useState<string>('')
    const [otherUser, setOtherUser] = useState<User | null>(null);
    const otherUserUrl = (!otherUser || otherUser?.profileUrl === "") ? 'avatar.png' : otherUser?.profileUrl
    const chatIcon = isChatGroup ? "/group_chat.png" : otherUserUrl
    const handleSetActiveRoom = async () => {
        const chatRoomDetails = await getChatRoomDetails(chatRoom.chatRoomId);
        dispatch(setActiveRoom(chatRoomDetails))
    }



    useEffect(() => {
        const fetchOtherUsername = async () => {
            if (!isChatGroup) {
                const other = users.find((otherUser) => otherUser.userId !== userId)
                const otherUserId = other?.userId
                if (otherUserId) {
                    try {
                        const userData = await getUserById(otherUserId)
                        console.log(userData);
                        setOtherUser(userData);
                        setOtherUsername(userData.username || 'Unknown User')
                    } catch (err) {
                        console.error('Failed to fetch user:', err)
                        setOtherUsername('Unknown User')
                    }
                }
            }
        }

        fetchOtherUsername()
    }, [])
    const chatName = isChatGroup
        ? `${chatRoom.groupName} (${users.length})`
        : otherUsername || 'Loading...'
    return (
        <div
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition'
            onClick={handleSetActiveRoom}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chatIcon} alt="profile" className='w-10 h-10 rounded-full' />
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
