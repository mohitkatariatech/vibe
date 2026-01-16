import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserdata } from "../redux/UserSlice";
import { setCurrentUserStory } from "../redux/StorySlice";
import { setPrevChatUsers } from "../redux/messageSlice";

function usePrevChatUsers (){
  const dispatch = useDispatch();
  const {messages} = useSelector(state=>state.message)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/message/prevChats`,
          { withCredentials: true }
        );
        dispatch(setPrevChatUsers(result.data));
        console.log("prev",result.data)
      } catch (error) {
        console.log(error)
      }
    };

    fetchUser();
  }, [messages]);
};

export default usePrevChatUsers;
