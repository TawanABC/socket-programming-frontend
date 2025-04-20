/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useAppDispatch, useAppSelector } from '@/states/hook';
import ChatInput from './ChatInput';
import { getUserById } from '@/services/userService';
import { io } from "socket.io-client";
import { setActiveRoom } from '@/states/features/chatSlice';
import { getChatRoomDetails } from '@/services/chatService';
import { Ellipsis } from 'lucide-react';
import GroupMembers from './GroupMembers';
import { Message } from '@/common/model';

const socket = io(process.env.SERVER_ADDRESS);


export default function ChatRoom() {
    const containerRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const loggedInUserId = useAppSelector(state => state.user.user?.userId);
    const activeChatRoom = useAppSelector(state => state.chat.activeRoom);


    const userId = useAppSelector(state => state.user.user!.userId);
    const isChatGroup = activeChatRoom?.isGroup
    const userIds = activeChatRoom?.users

    const [otherUsername, setOtherUsername] = useState<string>('')
    const [latestMessage, setLatestMessage] = useState<Message | null>(null)

    //go directly to most rececnt message upon opening
    // if (containerRef.current) {
    //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
    // }

    useEffect(() => {
        const fetchOtherUsername = async () => {
            if (!isChatGroup && activeChatRoom) {
                const otherUserId = userIds?.find((otherId) => otherId.userId !== userId)?.userId
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
        try {
            fetchOtherUsername()
        } catch (error) {
            console.log("chatroom fetch error", error);;
        }
    }, [activeChatRoom])

    useEffect(() => {
        const fetchMessageChatroom = async () => {
            console.log("fetch message chatroom");
            if (activeChatRoom?.chatRoomId !== undefined) {
                const chatRoomDetails = await getChatRoomDetails(activeChatRoom?.chatRoomId);
                console.log("fetch chatroom");
                dispatch(setActiveRoom(chatRoomDetails))
            }
        };


        socket.emit("joinRoom", {
            senderId: loggedInUserId,
            chatRoomId: activeChatRoom?.chatRoomId,
        });

        socket.on("receiveMessage", ({ newMessage }) => {
            console.log("new fetch");
            setLatestMessage(newMessage);
            fetchMessageChatroom();
        });

        socket.on("updateMessage", ({ updatedMessage }) => {
            fetchMessageChatroom();
            // setLatestMessage(updatedMessage);
            console.log("updateMessage fetch");
        });

        socket.on("unsendMessage", ({ unsentMessage }) => {
            fetchMessageChatroom();
            // setLatestMessage(unsentMessage);
            console.log("unsendMessage fetch");
        });


        return () => {
            socket.off("receiveMessage");
            socket.off("updateMessage");
            socket.off("unsendMessage");
        };

    }, [loggedInUserId, activeChatRoom]);



    const chatName = isChatGroup
        ? `${activeChatRoom.groupName} (${userIds ? userIds.length : ""})`
        : otherUsername || 'Please Select ChatRoom'

    useEffect(() => {
        const timer = setTimeout(() => {
            const isScrollDown = (latestMessage?.senderId === userId)
            if (containerRef.current && isScrollDown) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }, 50); // 50ms delay
        return () => clearTimeout(timer);
    }, [latestMessage]); // Scroll whenever messages change


    return (<>

        <div className='max-h-[500px] h-[500px] border border-gray-300 flex flex-col'>
            <div className='flex items-center gap-2 bg-gray-600 text-white px-3 py-2 w-full justify-between'>

                <span className='font-semibold'>{chatName}</span>
                {isChatGroup && <Ellipsis className='hover:bg-gray-700 rounded-sm'
                    onClick={() => (document.getElementById('groupMembers') as HTMLDialogElement)?.showModal()}
                />}
            </div>
            {/* Message container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hidden mt-1 px-2"
            >
                {activeChatRoom?.messages
                    .slice()
                    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map((message) => (
                        <ChatMessage message={message} key={message.messageId} />
                    ))}
            </div>
            {activeChatRoom &&
                <div className='flex flex-row justify-end p-2 space-x-1 shadow-2xl'>  <div className='grow'><ChatInput /></div> </div>
            }
        </div>
        <GroupMembers modalId='groupMembers' members={userIds} />
    </>

    )
}
