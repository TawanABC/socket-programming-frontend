import { User } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    user: User | null
};

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            // console.log(`Setting user:`);
            // console.log(action.payload);
            state.user = action.payload;
        },
        clearUser: () => initialState
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
