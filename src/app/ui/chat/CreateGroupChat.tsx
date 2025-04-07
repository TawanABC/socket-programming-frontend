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

export default function CreateGroupChat() {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroupChat = () => {
    const selectedUsers = users.filter((user) =>
      selectedUserIds.includes(user.userId)
    );

    if (!groupName.trim()) {
      console.log("Please enter a group name.");
      return;
    }

    if (selectedUsers.length < 1) {
      console.log("Please select at least two users for a group chat.");
      return;
    }

    console.log("Creating group chat:");
    console.log("Group Name:", groupName);
    console.log("Members:", selectedUsers);
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
          {users.map((user) => (
            <li key={user.userId} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedUserIds.includes(user.userId)}
                onChange={() => toggleUserSelection(user.userId)}
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
      </div>

      <button
        onClick={handleCreateGroupChat}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Create Group Chat
      </button>
    </div>
  );
}
