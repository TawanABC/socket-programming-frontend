import axios from "axios";


const serverAddr = process.env.SERVER_ADDRESS;



export const createChatRoom = async ({ userIds, isGroup, groupName }: {
    userIds: string[], isGroup: boolean, groupName: string
}) => {
    console.log("in chatroom", userIds, isGroup, groupName);
    try {
        const data = {
            users: userIds, isGroup, groupName
        }
        console.log("create chatroom", data);
        const options = {
            method: "POST",
            url: `${serverAddr}/chat`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        }
        const chatRoom = await axios.request(options);
        console.log("Chat Room Created: ", chatRoom);
    } catch (error) {
        throw error;
    }
}

export const getUserChatRooms = async () => {
    try {
        const options = {
            method: "GET",
            url: `${serverAddr}/chat/chatrooms`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.request(options);
        const chatRooms = data.chatRooms
        console.log("get user chatrooms", chatRooms);
        return chatRooms;
    } catch (error) {
        console.log("eeee");
        throw error;
    }
}

export const createMessage = async ({ chatRoomId, messageType, content }: {
    chatRoomId: string, messageType: string, content: string
}) => {
    try {
        const data = {
            chatRoomId,
            messageType,
            content
        };
        const options = {
            method: "POST",
            url: `${serverAddr}/chat/message`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };
        const response = await axios.request(options);
        const newMessage = response.data.newMessage;
        return newMessage;
        /*
        newMessage: {
            chatRoomId: string;
            createdAt: Date;
            messageId: string;
            senderId: string;
            messageType: $Enums.MessageType;
            isEdited: boolean;
            isUnsent: boolean;
            content: string;
        }
        */
    } catch (error) {
        throw error;
    }
};


export const getChatRoomDetails = async (chatRoomId: string) => {
    try {
        const options = {
            method: "GET",
            url: `${serverAddr}/chat/${chatRoomId}/details`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.request(options);
        const chatroom = data.data;
        console.log("get detail", chatroom);
        return chatroom;
        /*
        chatRoom: {
            users: {
                userId: string;
                username: string;
            }[];
            messages: {
                chatRoomId: string;
                createdAt: Date;
                messageId: string;
                senderId: string;
                messageType: $Enums.MessageType;
                isEdited: boolean;
                isUnsent: boolean;
                content: string;
            }[];
        } & {
            ...;
        }
        */
    } catch (error) {
        throw error;
    }
};


export const addUserToChatRoom = async ({ chatRoomId, newUserId }: {
    chatRoomId: string, newUserId: string
}) => {
    try {
        const data = {
            chatRoomId,
            newUserId
        };
        const options = {
            method: "POST",
            url: `${serverAddr}/chat/addUser`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };
        const response = await axios.request(options);
        const updatedChatRoom = response.data.updatedChatRoom;
        return updatedChatRoom;
        /*
        updatedChatRoom: {
            users: {
                userId: string;
                username: string;
            }[];
            messages: {
                chatRoomId: string;
                createdAt: Date;
                messageId: string;
                senderId: string;
                messageType: $Enums.MessageType;
                isEdited: boolean;
                isUnsent: boolean;
                content: string;
            }[];
        } & {
            ...;
        }
        */
    } catch (error) {
        throw error;
    }
};


export const unsendMessage = async (messageId: string) => {
    try {
        const options = {
            method: "PUT",
            url: `${serverAddr}/chat/message/${messageId}/unsend`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.request(options);
        const updatedMessage = response.data.unsentMessage;
        return updatedMessage;
        /*
        unsentMessage: {
        chatRoomId: string;
        createdAt: Date;
        messageId: string;
        senderId: string;
        messageType: $Enums.MessageType;
        isEdited: boolean;
        isUnsent: boolean;
        content: string;
        }
        */
    } catch (error) {
        throw error;
    }
};


export const getAllGroupChatRooms = async () => {
    try {
        const options = {
            method: "GET",
            url: `${serverAddr}/chat/group-chatrooms`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.request(options);
        const groupChatRooms = response.data.groupChatRooms;
        return groupChatRooms;
        /*
        const groupChatRooms: {
        chatRoomId: string;
        groupName: string;
        createdAt: Date;
        users: {
            userId: string;
            username: string;
            }[];
        }[]
        */
    } catch (error) {
        throw error;
    }
};

export const updateMessage = async ({ messageId, newContent }: { messageId: string, newContent: string }) => {
    try {
        const data = {
            content: newContent
        };
        const options = {
            method: "PUT",
            url: `${serverAddr}/chat/message/${messageId}/update`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: data,
        };
        const response = await axios.request(options);
        const updatedMessage = response.data.updatedMessage;
        return updatedMessage;
        /*
        updatedMessage: {
            chatRoomId: string;
            createdAt: Date;
            messageId: string;
            senderId: string;
            messageType: $Enums.MessageType;
            isEdited: boolean;
            isUnsent: boolean;
            content: string;
        }
        */
    } catch (error) {
        throw error;
    }
};