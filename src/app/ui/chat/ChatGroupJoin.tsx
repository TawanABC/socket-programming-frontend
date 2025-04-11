import { ChatRoom } from '@/common/model';
import { addUserToChatRoom, getAllGroupChatRooms, getUserChatRooms } from '@/services/chatService';
import { useAppSelector } from '@/states/hook';
import { join } from 'path';
import React, { useEffect, useState } from 'react';

interface groupJoinProps {
    closeModal?: () => void;
}

export default function ChatGroupJoin({ closeModal }: groupJoinProps) {
    const userId = useAppSelector(state => state.user.user!.userId);


    const [chatGroups, setChatGroups] = useState<ChatRoom[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [joinTrigger, setJoinTrigger] = useState(false);
    useEffect(() => {
        const fetchAllExistingGroup = async () => {
            try {
                const allGroups = await getAllGroupChatRooms();
                const chatRooms = await getUserChatRooms()
                const unJoinedGroups = allGroups.filter(
                    (group: ChatRoom) =>
                        !chatRooms.some(room => room.chatRoomId === group.chatRoomId)
                );
                setChatGroups(unJoinedGroups);
            } catch (error) {
                console.error("Error fetching group chats:", error);
                setError(true);
            }
        };
        fetchAllExistingGroup();
    }, [userId, joinTrigger]);

    const handleJoinGroup = async () => {

        try {
            if (!selectedGroupId) return;
            const selectedGroup = chatGroups.find(g => g.chatRoomId === selectedGroupId);
            console.log("Joining group:", selectedGroup); // 🧪 Replace this with your real join function
            if (selectedGroup) {
                const res = await addUserToChatRoom({
                    chatRoomId: selectedGroup?.chatRoomId,
                    newUserId: userId
                })
                console.log("join group", res);
            }
            if (closeModal) closeModal();
            setJoinTrigger(prev => !prev);
            setSelectedGroupId(null);
        } catch (error) {
            console.error(error);
        }


    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Join a Group</h2>

            {chatGroups.length === 0 && (
                <p className="text-sm text-gray-500">No available groups to join.</p>
            )}

            <ul className="space-y-2">
                {chatGroups.map((group) => (
                    <li key={group.chatRoomId} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="groupSelect"
                            value={group.chatRoomId}
                            checked={selectedGroupId === group.chatRoomId}
                            onChange={() => setSelectedGroupId(group.chatRoomId)}
                        />
                        <label>{`${group.groupName} (${group.users.length})`}</label>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    className="btn btn-primary"
                    disabled={!selectedGroupId}
                    onClick={handleJoinGroup}
                >
                    Join
                </button>
            </div>
        </div>
    );
}
