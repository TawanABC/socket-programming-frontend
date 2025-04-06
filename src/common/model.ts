export type User = {
    userId: string;
    username: string;
    email: string;
    profileUrl: string | "/avatar.png";
}


export type Message = {
    messageId: string;
    chatRoomId: string;
    senderId: string;
    content: string;
    createdAt: string;
}

export type ChatRoom = {
    chatRoomId: string;
    isChatGroup: boolean;
    users: User[]
}

export type loginSchema = {
    email: string;
    password: string
}