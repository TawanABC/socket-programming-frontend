import { Message } from '@/common/model'
import clsx from 'clsx';
import React from 'react'
interface messageProps {
    message: Message
}

export default function ChatMessage({ message }: messageProps) {
    const userId = "111"
    // const userId = useAppSelector(state => state.user.user!.userId);
    // const loggedInUser = useAppSelector(state => state.user.user);
    // const receiver = useAppSelector(state => state.chat.activeReceiver);
    const isMyMessage = message.senderId === userId;
    return (
        <div className={clsx(`chat`, {
            'chat-start': !isMyMessage,
            'chat-end': isMyMessage,
        })}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">

                    {/*eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="chat-header">
                {message.senderId}
                <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">{message.content}</div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    )
}
