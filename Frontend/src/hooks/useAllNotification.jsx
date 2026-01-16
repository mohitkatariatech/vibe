import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationData } from "../redux/UserSlice";

function useAllNotifications() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return; 
    const fetchNotifications = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/getAllNotifications`,{withCredentials:true}
           
        );

        dispatch(setNotificationData(result.data || []));
      } catch (error) {
        console.log(error);
        dispatch(setNotificationData([]));
      }
    };

    fetchNotifications();
  }, [userData, dispatch]);
}

export default useAllNotifications;
