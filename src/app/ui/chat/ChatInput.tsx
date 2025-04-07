import { SendIcon } from 'lucide-react';
import React, { useState } from 'react';

export default function ChatInput() {
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            console.log("Submitted message:", message);
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
