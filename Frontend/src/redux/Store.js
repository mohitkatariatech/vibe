import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import postSlice from "./PostSlice";
import storySlice from "./StorySlice";
import loopSlice from "./LoopSlice"
import messageSlice from "./messageSlice"
import socketslice from "./socketSlice"

const store = configureStore({
  reducer: {
    user: userSlice,
    post:postSlice,
    story: storySlice,
    loop:loopSlice,
    message:messageSlice,
    socket:socketslice
  },
});

export default store;
