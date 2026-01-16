import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/PostSlice";
import { setUserdata } from "../redux/UserSlice";
import { setLoopData } from "../redux/LoopSlice";

function useAllLoops() {
  const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);


 useEffect(() => {
  const fetchLoops = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/loop/getAll`,
        { withCredentials: true }
      );

      dispatch(setLoopData(result.data || []));
    } catch (error) {
      console.log(error);
      dispatch(setLoopData([]));
    }
  };

  fetchLoops();
}, [dispatch , userData]);

}

export default useAllLoops;
