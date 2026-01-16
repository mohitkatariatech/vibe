import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserdata } from "../redux/UserSlice";
import { setCurrentUserStory } from "../redux/StorySlice";

function useCurrentUser (){
  const dispatch = useDispatch();
  const {storyData} = useSelector(state=>state.story)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
        dispatch(setUserdata(result.data));
        dispatch(setCurrentUserStory(result.data.story))
      } catch (error) {
        console.log(error)
      }
    };

    fetchUser();
  }, [storyData]);
};

export default useCurrentUser;
