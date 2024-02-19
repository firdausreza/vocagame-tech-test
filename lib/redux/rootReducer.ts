/* Instruments */
import { counterSlice } from "./slices";
import { currentUserSlice } from "./slices";

export const reducer = {
	counter: counterSlice.reducer,
	currentUser: currentUserSlice.reducer,
};
