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
        console.log(data);
        const chatRooms = data.chatRooms
        console.log("get user chatrooms", chatRooms);
        return chatRooms;
    } catch (error) {
        console.log("eeee");
        throw error;
    }
}
