import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setStoryList } from "../redux/StorySlice";

function useAllStories (){
  const dispatch = useDispatch();
  const {userData} = useSelector(state=>state.user)
  const {storyData} = useSelector(state=>state.story)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/story/getAll`,
          { withCredentials: true }
        );
        dispatch(setStoryList(result.data));
      } catch (error) {
        dispatch(setStoryList(null)); 
      }
    };

    fetchStories();
  }, [dispatch,userData,storyData]);
};

export default useAllStories;
