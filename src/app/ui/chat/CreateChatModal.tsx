import React, { useState } from 'react'
import CreateGroupChat from './CreateGroupChat'
import CreatePrivateChat from './CreatePrivateChat'


interface ModalProp {
    modalId: string
}


export default function CreateChatModal({ modalId }: ModalProp) {
    const [chatType, setChatType] = useState<'private' | 'group' | null>(null)

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
                    </div>

                    {chatType === 'private' && <CreatePrivateChat />}

                    {chatType === 'group' && (
                        <CreateGroupChat />
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

