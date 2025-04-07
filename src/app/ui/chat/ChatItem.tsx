import { ChatRoom } from '@/common/model'
import { getUserById } from '@/services/userService';
import { useAppSelector } from '@/states/hook';
import React, { useEffect, useState } from 'react'

export default function ChatItem({ chatRoom }: { chatRoom: ChatRoom }) {

    const userId = useAppSelector(state => state.user.user!.userId);
    const isChatGroup = chatRoom.isGroup
    const userIds = chatRoom.users
    console.log("userId",userIds);
    const [otherUsername, setOtherUsername] = useState<string>('')
    useEffect(() => {
        const fetchOtherUsername = async () => {
            if (!isChatGroup) {
                const otherUserId = userIds.find((otherId) => otherId.userId !== userId).userId
                if (otherUserId) {
                    try {
                        const userData = await getUserById(otherUserId)
                        console.log(userData);
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
        ? `${chatRoom.groupName} (${userIds.length})`
        : otherUsername || 'Loading...'
    return (
        <div
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition'
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isChatGroup ? "/group_chat.png" : "/group_chat.png"} alt="profile" className='w-10 h-10 rounded-full' />
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
