import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,          // now stores socket.id (string)
    onlineUsers: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setSocket, setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;
