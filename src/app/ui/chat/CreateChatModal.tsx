import React, { useState } from 'react'
import CreateGroupChat from './CreateGroupChat'
import CreatePrivateChat from './CreatePrivateChat'
import ChatGroupJoin from './ChatGroupJoin';


interface ModalProp {
    modalId: string
    chatCreatedTrigger: () => void;
}


export default function CreateChatModal({ modalId, chatCreatedTrigger }: ModalProp) {
    const [chatType, setChatType] = useState<'private' | 'group' | 'join-group' | null>(null)
    const closeModal = () => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
        chatCreatedTrigger();
    }
    return (
        <div>
            <dialog id={modalId} className="modal">
                <div className="modal-box bg-white">
                    <div className="flex flex-row space-x-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setChatType('private')}
                            className={`px-4 py-2 rounded ${chatType === 'private' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Private Chat
                        </button>
                        <button
                            type="button"
                            onClick={() => setChatType('group')}
                            className={`px-4 py-2 rounded ${chatType === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Group Chat
                        </button>
                        <button
                            type="button"
                            onClick={() => setChatType('join-group')}
                            className={`px-4 py-2 rounded ${chatType === 'join-group' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Join Group
                        </button>
                    </div>

                    {chatType === 'private' && <CreatePrivateChat closeModal={closeModal} />}

                    {chatType === 'group' && (
                        <CreateGroupChat closeModal={closeModal} />
                    )}
                    {chatType === 'join-group' && (
                        <ChatGroupJoin closeModal={closeModal} />
                    )}
                    {!chatType && (
                        <p className="py-4 text-gray-500">Choose a chat type to get started</p>
                    )}
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

