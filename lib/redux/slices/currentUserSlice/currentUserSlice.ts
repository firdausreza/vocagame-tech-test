/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CurrentUserSliceState {
	fullname: string;
	username: string;
	password: string;
}

const initialState: CurrentUserSliceState = {
	fullname: "",
	username: "",
	password: "",
};

export const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		setCurrentUser: (
			state,
			action: PayloadAction<{
				fullname: string;
				username: string;
				password: string;
			}>
		) => {
			state.fullname = action.payload.fullname;
			state.username = action.payload.username;
			state.password = action.payload.password;
		},
		flushCurrentUser: (state) => {
			state.fullname = "";
			state.username = "";
			state.password = "";
		},
	},
});
