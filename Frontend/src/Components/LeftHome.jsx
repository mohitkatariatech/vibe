import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.jpeg"
import Dp from "../assets/dp.png"
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setUserdata } from '../redux/UserSlice';
import axios from "axios";
import OtherUser from './OtherUser';
import { RiHeartsFill } from "react-icons/ri";
import Notifications from '../pages/Notifications';



function LeftHome() {
  const {notificationData} = useSelector(state=>state.user)

  const { userData, suggestedUsers } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [showNotification,setShowNotification] = useState("")
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
      dispatch(setUserdata(null))
    } catch (error) {
      console.log(error)
    }
  }
 useEffect(() => {
  console.log("Notifications updated:", notificationData);
}, [notificationData]);


  return (
   <aside className="
  hidden lg:flex
  w-[280px] xl:w-[320px]
  h-[100dvh]
  bg-black
  border-r border-gray-800
  flex-col
  sticky top-0
">


      {/* LOGO */}
      <div className="h-[64px] px-4 flex items-center justify-between">
        <img src={logo} alt="logo" className="w-[80px]" />
        <div className='relative z-[100]' onClick={()=>setShowNotification(prev=>!prev)}>
          <RiHeartsFill size={24}
          className="text-white w-[25px] h-[25px] " 
          />
          {notificationData?.length>0 && notificationData?.some(noti => !noti.isRead)  && 
            (<div className='w-[10px] h-[10px] bg-blue-700 rounded-full absolute top-0 right-[-1] '>
          </div>)
          }
        
        </div>                                                                        
      </div>
{!showNotification && <>
  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-[44px] h-[44px] rounded-full overflow-hidden">
            <img
              src={userData?.profileImage || Dp}
              alt="dp"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="leading-[1.1]">
            <p className="text-white text-[16.5px] font-semibold">
              {userData?.userName}
            </p>
            <p className="text-gray-400 text-[12.5px]">
              {userData?.name}
            </p>
          </div>
        </div>

        <span
          onClick={handleLogOut}
          className="text-blue-500 text-[17.5px] font-semibold cursor-pointer"
        >
          Log out
        </span>
      </div>

<div className="flex-1 px-4 pt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        <p className="text-gray-400 text-[12.5px] mb-3">
          Suggested for you
        </p>

        <div className="flex flex-col gap-4">
          {suggestedUsers?.slice(0, 3).map((user, index) => (
            <div
              key={user._id || index}
              className="w-full"
            >
              <OtherUser user={user} />
            </div>
          ))}
        </div>
      </div>
</>}
     {showNotification && (
  <div className="flex-1 overflow-y-auto">
    <Notifications />
  </div>
)}

    

    </aside>
  )
}
export default LeftHome