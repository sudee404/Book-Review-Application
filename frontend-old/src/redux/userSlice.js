import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		id: "",
		username: "",
		exp: "",
		token: "",
	},
	reducers: {
		setId: (state, action) => {
			state.id = action.payload;
		},
		setName: (state, action) => {
			state.username = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setId,setName,setToken } = userSlice.actions;

export default userSlice.reducer;
