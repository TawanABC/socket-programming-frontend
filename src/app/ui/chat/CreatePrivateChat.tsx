import React, { useState } from "react";

type User = {
    userId: string;
    username: string;
    email: string;
    profileUrl: string | "/avatar.png";
};

const users: User[] = [
    {
        userId: "1a2b3c",
        username: "artlover21",
        email: "artlover21@example.com",
        profileUrl: "/avatar.png",
    },
    {
        userId: "4d5e6f",
        username: "creative_mind",
        email: "creativemind@example.com",
        profileUrl: "https://example.com/profiles/creative_mind.jpg",
    },
    {
        userId: "7g8h9i",
        username: "pixel_painter",
        email: "pixelpainter@example.com",
        profileUrl: "/avatar.png",
    },
];

export default function CreatePrivateChat() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleCreateChat = () => {
        const selectedUser = users.find(user => user.userId === selectedUserId);
        if (selectedUser) {
            console.log("Creating private chat with:", selectedUser);
        } else {
            console.log("No user selected.");
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Select a user to chat with:</h2>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.userId} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="selectedUser"
                            value={user.userId}
                            onChange={() => setSelectedUserId(user.userId)}
                            checked={selectedUserId === user.userId}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={user.profileUrl}
                            alt={user.username}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{user.username}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleCreateChat}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Create Chat
            </button>
        </div>
    );
}
