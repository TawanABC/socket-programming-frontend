import { createMessage } from '@/services/chatService';
import { useAppDispatch, useAppSelector } from '@/states/hook';
import { SendIcon } from 'lucide-react';
import React, { useState } from 'react';

export default function ChatInput() {
    const dispatch = useAppDispatch();

    const activeChatRoomId = useAppSelector(state => {
        if (state.chat.activeRoom) {
            return state.chat.activeRoom.chatRoomId;
        }
        return null;
    });
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
        try {
            console.log("Submitted message:", message);
            const response = await createMessage({
                chatRoomId: activeChatRoomId!,
                content: message,
                messageType: "MESSAGE"
            })
            // console.log(response);
            setMessage("")
        } catch (error) {
            console.log("send message error", error);
        }

    };

    return (
        <div className='flex flex-row items-center space-x-2'>
            <input
                type="text"
                className="input input-accent bg-white grow"
                placeholder="Type here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                type="button" // Changed from submit to button to prevent accidental form submits
                onClick={handleSubmit}
                className='hover:bg-slate-200 p-2 rounded-md'
            >
                <SendIcon />
            </button>
        </div>
    );
}
