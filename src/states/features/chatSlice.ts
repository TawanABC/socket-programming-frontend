import { Message, ChatRoom, User } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatState = {
    chatRooms: Array<ChatRoom>;
    activeRoom: ChatRoom | null;
    activeReceiver: User | null,
    messages: Array<Message>;
}

const initialState: ChatState = {
    chatRooms: [],
    activeRoom: null,
    activeReceiver: null,
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatRooms(state, action: PayloadAction<Array<ChatRoom>>) {
            state.chatRooms = action.payload;
        },
        setActiveRoom(state, action: PayloadAction<ChatRoom>) {
            state.activeRoom = action.payload;
        },
        setMessages(state, action: PayloadAction<Array<Message>>) {
            state.messages = action.payload;
        },
        setReceiver(state, action: PayloadAction<User>) {
            state.activeReceiver = action.payload;
        },
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
    },
});

export const {
    setChatRooms,
    setActiveRoom,
    setMessages,
    addMessage,
    setReceiver
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;