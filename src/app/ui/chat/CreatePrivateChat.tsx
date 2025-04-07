import { createChatRoom } from "@/services/chatService";
import { getAllUsers, getUserById } from "@/services/userService";
import { useAppSelector } from "@/states/hook";
import React, { useEffect, useState } from "react";

type User = {
    userId: string;
    username: string;
    email: string;
    profileUrl: string | "/avatar.png";
};

export default function CreatePrivateChat() {
    const userId = useAppSelector(state => state.user.user!.userId);
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                const filteredUsers = allUsers.filter((user: User) => user.userId !== userId);
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchAllUsers();
    }, [userId]);


    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleCreateChat = async () => {
        if (!selectedUserId) {
            console.log("No user selected.");
            return;
        }

        try {
            await createChatRoom({
                userIds: [userId, selectedUserId],
                isGroup: false,
                groupName: "",
            });
        } catch (error) {
            console.error("Error creating chat room:", error);
        }
    };


    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Select a user to chat with:</h2>
            <ul className="space-y-2">
                {users && users.map((user) => (
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
                            src={user.profileUrl ? user.profileUrl : 'avatar.png'}
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
