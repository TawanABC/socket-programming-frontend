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
    messageType: string;
    isEdited: boolean;
    isUnsent: boolean;
    content: string;
    createdAt: string;
}

// model Message {
//     messageId   String      @id @default(uuid())
//     chatRoomId  String      @db.Uuid
//     senderId    String      @db.Uuid
//     messageType MessageType
//     isEdited    Boolean     @default(false)
//     isUnsent    Boolean     @default(false)
//     content     String
//     createdAt   DateTime    @default(now())

//     chatRoom    ChatRoom    @relation(fields: [chatRoomId], references: [chatRoomId])
//     sender      User        @relation(fields: [senderId], references: [userId])
//   }

export type ChatRoom = {
    chatRoomId: string;
    users: User[];
    messages: Message[];
    isGroup: string;
    groupName: string;
    createdAt: string;
}





export type loginSchema = {
    email: string;
    password: string
}