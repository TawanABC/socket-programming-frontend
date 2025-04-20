/* eslint-disable @next/next/no-img-element */
import { Message, User } from '@/common/model'
import { unsendMessage, updateMessage } from '@/services/chatService'
import { getUserById } from '@/services/userService'
import { useAppSelector } from '@/states/hook'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface MessageProps {
    message: Message
}

const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok',
}

export default function ChatMessage({ message }: MessageProps) {
    const userId = useAppSelector(state => state.user.user!.userId)
    const isMyMessage = message.senderId === userId

    const [sender, setSender] = useState<User | null>(null)
    const [editedContent, setEditedContent] = useState(message.content)

    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(message.createdAt))
    const senderProfileUrl = sender?.profileUrl

    useEffect(() => {
        const fetchSender = async () => {
            try {
                const res = await getUserById(message.senderId)
                setSender(res)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSender()
    }, [message.senderId])

    const handleRightClick = (event: React.MouseEvent) => {
        if (isMyMessage) {
            event.preventDefault()
            const modal = document.getElementById(`msg-modal-${message.messageId}`) as HTMLDialogElement
            modal?.showModal()
        }
    }

    const handleUnsend = async () => {
        try {
            await unsendMessage(message.messageId)
            const modal = document.getElementById(`msg-modal-${message.messageId}`) as HTMLDialogElement
            modal?.close()
            // Redux update or refetch happens elsewhere (ChatRoom)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditSubmit = async () => {
        try {
            await updateMessage({
                messageId: message.messageId,
                newContent: editedContent.trim(),
            })
            const modal = document.getElementById(`msg-modal-${message.messageId}`) as HTMLDialogElement
            modal?.close()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div
                className={clsx('chat', {
                    'chat-start': !isMyMessage,
                    'chat-end': isMyMessage,
                })}
            >
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="avatar"
                            src={senderProfileUrl || '/avatar.png'}
                        />
                    </div>
                </div>

                <div className="chat-header">
                    {sender?.username}
                    <time className="text-xs opacity-50 ml-2">{formattedDate}</time>
                </div>

                {message.isUnsent ? (
                    <div className="bg-black opacity-30 text-white text-[10px] rounded-lg p-1">
                        Message has been unsent
                    </div>
                ) : (
                    <>
                        <div
                            className="chat-bubble hover:chat-bubble-info"
                            onContextMenu={handleRightClick}
                        >
                            {message.content}
                        </div>
                        <div className="chat-footer opacity-50">
                            {message.isEdited ? '(edited)' : 'Delivered'}
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            <dialog id={`msg-modal-${message.messageId}`} className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Edit or Unsend</h3>
                    <input
                        type="text"
                        className="bg-white border border-slate-200 w-full mt-2 px-2 py-1"
                        placeholder="Edit message here"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button className="btn btn-error" onClick={handleUnsend}>Unsend</button>
                        <button className="btn btn-primary" onClick={handleEditSubmit}>Save</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setEditedContent(message.content)}>close</button>
                </form>
            </dialog>
        </>
    )
}
