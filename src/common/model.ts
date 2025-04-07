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
    users: string[];
    isGroup: string;
    groupName: string;
}

// model ChatRoom {
//     chatRoomId  String       @id @default(uuid()) @db.Uuid
//     users       User[]       @relation(name: "UserChatRooms")
//     messages    Message[]
//     isGroup     Boolean      @default(false)
//     groupName   String       @default("") @db.VarChar(1024)
//     createdAt   DateTime     @default(now())
//   }



export type loginSchema = {
    email: string;
    password: string
}