import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserdata } from "../redux/UserSlice";
import { setCurrentUserStory } from "../redux/StorySlice";

function useFollowingList() {
  const dispatch = useDispatch();
  const {storyData} = useSelector(state=>state.story)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/followingList`,
          { withCredentials: true }
        );
        dispatch(setFollowing(result.data))
      } catch (error) {
        console.log(error)
      }
    };

    fetchUser();
  }, [storyData]);
};

export default useFollowingList;
