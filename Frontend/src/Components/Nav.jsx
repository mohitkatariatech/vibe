import React from 'react';
import { AiFillHome, AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { RiVideoAiLine } from "react-icons/ri";
import Dp from "../assets/dp.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Nav() {
  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)
  return (
    <div
      className="
        w-[90%] max-w-[500px] lg:w-[40%] h-[60px] 
        bg-black flex justify-around items-center 
        fixed bottom-[20px] left-1/2 transform -translate-x-1/2 
        rounded-full shadow-2xl shadow-black z-[100]
      "
    >
      {/* Icons for nav */}
      <AiFillHome onClick={()=>navigate("/")} className="text-white w-[25px] h-[25px] cursor-pointer" />
      <RiVideoAiLine onClick={()=>navigate("/loops")} className="text-white w-[25px] h-[25px] cursor-pointer" />
      <AiOutlinePlusCircle onClick={()=>navigate("/upload")} className="text-white w-[30px] h-[30px] cursor-pointer" />
      <AiOutlineSearch className="text-white w-[25px] h-[25px] cursor-pointer" onClick={()=>navigate("/search")} />
       <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'
        onClick={()=>navigate(`/profile/${userData.userName}`)}>
                <img src={userData.profileImage ||  Dp} alt="" className='w-full object-cover' />
              </div>
      {/* <BsPerson className="text-white w-[25px] h-[25px] cursor-pointer" /> */}
    </div>
  );
}

export default Nav;
