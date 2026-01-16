import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const storySlice = createSlice({
  name: "story",
  initialState: {
    storyData: null,   // ✅ object
    storyList: null,
    currentUserStory:null
  },
  reducers: {
    setStoryData: (state, action) => {
      state.storyData = action.payload;
    },
    setStoryList: (state, action) => {
      state.storyList = action.payload;
    },
    setCurrentUserStory:(state,action)=>{
      state.currentUserStory = action.payload
    }
  },
});


export const {setStoryData,setStoryList,setCurrentUserStory} = storySlice.actions;
export default storySlice.reducer;

