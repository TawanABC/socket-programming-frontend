import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import { Message } from '@/common/model'
import { useAppDispatch, useAppSelector } from '@/states/hook';
import ChatInput from './ChatInput';
import { getUserById } from '@/services/userService';
import { io } from "socket.io-client";
import { addMessage, setActiveRoom, setMessages } from '@/states/features/chatSlice';
import { getChatRoomDetails } from '@/services/chatService';

const socket = io(process.env.SERVER_ADDRESS);


export default function ChatRoom() {
    const containerRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const loggedInUserId = useAppSelector(state => state.user.user?.userId);
    const activeChatRoom = useAppSelector(state => state.chat.activeRoom);
    const activeRoomId = activeChatRoom?.chatRoomId
    const messages = useAppSelector((state) => state.chat.messages);

    // console.log("active room", activeChatRoom);

    const userId = useAppSelector(state => state.user.user!.userId);
    const isChatGroup = activeChatRoom?.isGroup
    const userIds = activeChatRoom?.users
    // console.log("userIdssss", userIds);
    const [otherUsername, setOtherUsername] = useState<string>('')


    useEffect(() => {
        // Fetch messages from backend
        const fetchMessageChatroom = async () => {
            if (activeRoomId !== undefined) {
                const chatRoomDetails = await getChatRoomDetails(activeRoomId);
                console.log("room details", chatRoomDetails);
                dispatch(setMessages(chatRoomDetails.messages));
                console.log("msg", chatRoomDetails.messages, messages);

            }
        };

        fetchMessageChatroom();
    }, [activeChatRoom]);





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
        try {
            fetchOtherUsername()
        } catch (error) {
            console.log("chatroom fetch error", error);;
        }
    }, [activeChatRoom])

    useEffect(() => {
        const fetchMessageChatroom = async () => {
            console.log("fetcherss");
            if (activeRoomId !== undefined) {
                const chatRoomDetails = await getChatRoomDetails(activeRoomId);
                dispatch(setActiveRoom(chatRoomDetails))
                console.log("chatroom det", chatRoomDetails);
            }
        };


        socket.emit("joinRoom", {
            senderId: loggedInUserId,
            chatRoomId: activeRoomId,
        });

        socket.on("receiveMessage", ({ newMessage }) => {
            // const { commission, ...rest } = newMessage;
            console.log("socketssss", newMessage);
            fetchMessageChatroom()
        });


        return () => {
            socket.off("receiveMessage");
        };

    }, [loggedInUserId, activeChatRoom]);



    const chatName = isChatGroup
        ? `${activeChatRoom.groupName} (${userIds.length})`
        : otherUsername || 'Loading...'

    useEffect(() => {
        console.log("use effect", activeChatRoom?.messages);
        if (containerRef.current) {
            // console.log(`Scrolling to ${containerRef.current.scrollHeight}`);
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [activeChatRoom?.messages]);

    return (
        <div className='max-h-[500px] h-[500px] border border-gray-300 flex flex-col'>
            {/* Top bar showing who you're chatting with */}
            <div className='flex items-center gap-2 bg-gray-600 text-white px-3 py-2 w-full'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* <img src={chattingWith.avatar} alt="avatar" className='w-8 h-8 rounded-full' /> */}
                <span className='font-semibold'>{chatName}</span>
            </div>
            <>{loggedInUserId}</>
            {/* Message container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hidden mt-1 px-2"
            >
                {activeChatRoom?.messages.map((message) => (
                    <ChatMessage message={message} key={message.messageId} />
                ))}
            </div>
            <div className='flex flex-row justify-end p-2 space-x-1 shadow-2xl'>  <div className='grow'><ChatInput /></div> </div>
        </div>
    )
}
