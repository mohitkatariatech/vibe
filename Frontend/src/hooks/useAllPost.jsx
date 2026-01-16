import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/PostSlice";
import { setUserdata } from "../redux/UserSlice";

function useAllPost() {
  const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);


 useEffect(() => {
  const fetchPost = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/post/getAll`,
        { withCredentials: true }
      );

      dispatch(setPostData(result.data || []));
    } catch (error) {
      console.log(error);
      dispatch(setPostData([]));
    }
  };

  fetchPost();
}, [dispatch , userData]);

}

export default useAllPost;
