import { Message, User } from '@/common/model'
import { unsendMessage, updateMessage } from '@/services/chatService';
import { getUserById } from '@/services/userService';
import { useAppSelector } from '@/states/hook';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
interface messageProps {
    message: Message
}
const options = {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok' // change this if needed
};
export default function ChatMessage({ message }: messageProps) {
    const userId = useAppSelector(state => state.user.user!.userId);
    const isMyMessage = message.senderId === userId;
    const [sender, setSender] = useState<User | null>(null);
    const [editedContent, setEditedContent] = useState(message.content);
    const [displayContent, setDisplayContent] = useState(message.content)
    const [isMessageEdit, setIsMessageEdit] = useState(message.isEdited);
    const [isMessageUnsent, setIsMessageUnsent] = useState(message.isUnsent);

    const createDate = new Date(message.createdAt);
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(createDate);
    const senderProfileUrl = sender?.profileUrl
    const handleRightClick = (event: React.MouseEvent) => {
        if (isMyMessage) {
            console.log(message);
            event.preventDefault();
            (document.getElementById(`msg-modal-${message.messageId}`) as HTMLDialogElement)?.showModal();
        }
    };
    const handleUnsend = async () => {
        try {
            const res = await unsendMessage(message.messageId)
            console.log('Unsend:', res);
            setIsMessageUnsent(true);
            const modal = document.getElementById(`msg-modal-${message.messageId}`) as HTMLDialogElement;
            modal?.close();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditSubmit = async () => {
        console.log('Edited Message:', editedContent);
        const modal = document.getElementById(`msg-modal-${message.messageId}`) as HTMLDialogElement;
        const res = updateMessage({
            messageId: message.messageId,
            newContent: editedContent.trim(),
        })
        console.log("edit msg", res);
        modal?.close();
        setIsMessageEdit(true);
        setDisplayContent(editedContent.trim());
    };

    useEffect(() => {
        const fetchSender = async () => {
            try {
                const res = await getUserById(message.senderId);
                setSender(res);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSender();
    }, []);


    return (<>
        <div className={clsx(`chat`, {
            'chat-start': !isMyMessage,
            'chat-end': isMyMessage,
        })}
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">

                    {/*eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={senderProfileUrl ? senderProfileUrl : '/avatar.png'} />
                </div>
            </div>
            <div className="chat-header">
                {sender?.username}
                <time className="text-xs opacity-50">{formattedDate}</time>
            </div>
            {isMessageUnsent ? <div className="bg-black opacity-30 text-white text-[10px] rounded-lg p-1"
            >Message has been unsent</div> : <><div className="chat-bubble hover:chat-bubble-info"
                onContextMenu={handleRightClick}
            >{displayContent}</div>
                <div className="chat-footer opacity-50">{isMessageEdit ? '(edited)' : 'Delivered'}</div></>}
        </div>


        {/* modal of unsend and edit */}
        <dialog id={`msg-modal-${message.messageId}`} className="modal">
            <div className="modal-box bg-white">
                <div className='flex flex-col'>
                    <h3 className="font-bold text-lg">Edit or Unsend</h3>

                    <input
                        type="text"
                        className="bg-white border border-slate-200 grow"
                        placeholder='Edit message here'
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    ></input>

                    <div className="flex justify-end gap-2 mt-4">
                        <button className="btn btn-error" onClick={handleUnsend}>
                            Unsend
                        </button>
                        <button className="btn btn-primary" onClick={handleEditSubmit}>
                            Save
                        </button>
                    </div>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => setEditedContent(message.content)}>close</button>
            </form>
        </dialog>
    </>
    )
}
