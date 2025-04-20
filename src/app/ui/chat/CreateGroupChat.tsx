import { createChatRoom } from "@/services/chatService";
import { getAllUsers } from "@/services/userService";
import { useAppSelector } from "@/states/hook";
import React, { useEffect, useState } from "react";

type User = {
  userId: string;
  username: string;
  email: string;
  profileUrl: string | "/avatar.png";
};

interface createChatProp {
  closeModal?: () => void;
};

export default function CreateGroupChat({ closeModal }: createChatProp) {
  const userId = useAppSelector(state => state.user.user!.userId);
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState(false);

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



  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroupChat = async () => {
    const selectedUsers = users?.filter((user) =>
      selectedUserIds?.includes(user.userId)
    ) || [];


    if (!groupName.trim()) {
      setError(true);
      console.log("Please enter a group name.");
      return;
    }

    if (selectedUsers && selectedUsers.length < 1) {
      setError(true);
      console.log("Please select at least two users for a group chat.");
      return;
    }
    console.log("selected users", selectedUsers);
    console.log(userId);
    const allUserIds = [...selectedUsers.map(user => user.userId), userId];
    console.log(allUserIds);
    try {
      console.log("Creating group chat:");
      console.log("Group Name:", groupName);
      console.log("Members:", selectedUsers);
      await createChatRoom({
        userIds: allUserIds,
        isGroup: true,
        groupName: groupName,
      });
      if (closeModal) closeModal();
      setError(false)
      setGroupName("");
      setSelectedUserIds([]);
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Create a Group Chat</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group chat name"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select Members:</label>
        <ul className="space-y-2">
          {users && users.map((user) => (
            <li key={user.userId} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedUserIds.includes(user.userId)}
                onChange={() => toggleUserSelection(user.userId)}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.profileUrl && user.profileUrl !== "" ? user.profileUrl : "/avatar.png"}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
      {error && <div className="text-error">Group Name must be entered and at least one user must be selected</div>}
      <button
        onClick={handleCreateGroupChat}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Group Chat
      </button>
    </div>
  );
}
