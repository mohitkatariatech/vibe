import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import useCurrentUser from './hooks/useCurrentUser'
import useSuggestedUser from './hooks/useSuggestedUser'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import useAllPost from './hooks/useAllPost'
import Loops from './pages/Loops'
import useAllLoops from './hooks/useAllLoops'
import Story from './pages/Story'
import useAllStories from './hooks/useAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import { useEffect } from 'react'
import { io, Socket } from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import useFollowingList from './hooks/useFollowingList'
import usePrevChatUsers from './hooks/usePrevChatUsers'
import Search from './pages/Search'
import useAllNotifications from './hooks/useAllNotification'
import Notifications from './pages/Notifications'
import { setNotificationData } from './redux/UserSlice'
export const serverUrl = "https://vibe-psr9.onrender.com"

function App() {

  useCurrentUser();
  useSuggestedUser();
  useAllPost();
  useAllLoops();
  useAllStories();
  useFollowingList();
  usePrevChatUsers();
  useAllNotifications();

  const { userData ,notificationData} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const { socket } = useSelector(state => state.socket)

   let socketIo = null; // ✅ SINGLE socket reference

    useEffect(() => {
    if (userData && !socketIo) {

      socketIo = io(serverUrl, {
        query: { userId: userData._id },
        transports: ["websocket"],
      });

      socketIo.on("connect", () => {
        console.log("✅ Socket connected:", socketIo.id);
        dispatch(setSocket(socketIo)); // stores ONLY socket.id if reducer fixed
      });

      socketIo.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
        console.log("online users:", users);
      });

      socketIo.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

    }

    return () => {
      if (!userData && socketIo) {
        socketIo.disconnect();
        socketIo = null;
        dispatch(setSocket(null));
      }
    };
  }, [userData, dispatch]);


  socket?.on("newNotification", (noti) => {
  dispatch(setNotificationData([...notificationData, noti]));
});

  
  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path="/story/:userName" element={userData ? <Story /> : <Navigate to="/signin" />} />
      <Route path="/profile/:userName" element={userData ? <Profile /> : <Navigate to="/signin" />} />
      <Route path="/upload" element={userData ? <Upload /> : <Navigate to="/signin" />} />
            <Route path="/search" element={userData ? <Search /> : <Navigate to="/signin" />} />
             <Route path="/notifications" element={userData ? <Notifications /> : <Navigate to="/signin" />} />

      <Route path="/editprofile" element={userData ? <EditProfile /> : <Navigate to="/signin" />} />
      <Route path="/loops" element={userData ? <Loops /> : <Navigate to="/signin" />} />
      <Route path="/messages" element={userData ? <Messages /> : <Navigate to="/signin" />} />
      <Route path="/messageArea" element={userData ? <MessageArea /> : <Navigate to="/signin" />} />

    </Routes>
  )
}

export default App
//https://vibe-silk-one.vercel.app/