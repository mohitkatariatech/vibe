import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/UserSlice";

function useSuggestedUser() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/user/suggested`, { withCredentials: true });
                console.log("Suggested API data:", res.data);
                dispatch(setSuggestedUsers(res.data));
            } catch (error) {
                console.log("Suggested users error:", error);
            }
        };
        // <-- actually call the function
        fetchSuggestedUsers();
    }, [userData, dispatch]); // include dispatch to satisfy lint rules
}

export default useSuggestedUser;
