import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/messageSlice";
import Dp from "../assets/dp.png"


function OnlineUser({ user }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
<div className="w-[50px] h-[50px] flex justify-center items-center relative">
<div className="w-[38px] h-[38px] border border-gray-700 rounded-full cursor-pointer overflow-hidden"
                onClick={() => {
                    dispatch(setSelectedUser(user))
                    navigate("/messageArea")
                }}
            >
                <img src={user.profileImage || Dp} alt="" className='w-full object-cover' />
            </div>
   <div className="
  absolute bottom-0 right-0
  w-2.5 h-2.5 bg-blue-500
  rounded-full border-2 border-black
"></div>


        </div>
    )
}

export default OnlineUser
