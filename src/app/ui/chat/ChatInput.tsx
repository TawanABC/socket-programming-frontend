import React from 'react'

export default function ChatInput() {


    return (
        <div>


            <form
                onSubmit={handleSubmit}
                className="p-1 flex flex-row items-center gap-2 border-t border-gray-200"
            >

                {/* add button Section */}

                <div>
                    {/* Plus Icon with Options */}
                    <div className="">
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            type="button"
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-transform duration-300"
                        >
                            {showOptions ? <X size={20} className="transform rotate-180 transition-all duration-300" /> : <Plus size={20} className="transition-all duration-300" />}
                        </button>
                    </div>
                </div>

                {/* text input section */}
                <input
                    type="text"
                    value={message}
                    placeholder="Type your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    className="input input-bordered input-primary w-full focus:ring-primary"
                />
                <button
                    type="submit"
                    className="ml-3 rounded-md bg-primary px-8 py-3 text-white hover:bg-accent 
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                    Send
                </button>
            </form>

        </div>
    )
}
