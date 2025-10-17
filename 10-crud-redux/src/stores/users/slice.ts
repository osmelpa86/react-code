import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const DEFAULT_STATE = [{id: "1", name: "Osmel Perez", email: "osmelpa86@gmail.com", github: "osmelpa86"},
    {id: "2", name: "Jane Doe", email: "jane@example.com", github: "janedoe"},];

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__");
    if (persistedState) {
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            state.push({id, ...action.payload});
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
        roolbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some((user) => user.id === action.payload.id);
            if (!isUserAlreadyDefined) {
                state.push(action.payload);
            }
        }
    },
});

export default usersSlice.reducer;

export const {addNewUser, deleteUserById, roolbackUser} = usersSlice.actions;