import React from "react";
import Dp from "../assets/dp.png";
import { LuCircleFadingPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { useState } from "react";
import { useEffect } from "react";

function StoryCard({ ProfileImage, userName, story }) {
  const navigate = useNavigate()
  const [viewed,setViewed] = useState(false)
  const { userData } = useSelector(state => state.user)
  const {storyData,storyList} = useSelector(state=>state.story)
  

   
  useEffect(()=>{
    if( story?.viewers?.some((viewer)=>
    viewer._id==userData._id.toString() || viewer==userData._id.toString()
  )){
    setViewed(true)
  }else{
    setViewed(false)
  }
   

   
  },[story,userData,storyData,storyList])

  const handleViewers = async () =>{
    try {
       const result = await  axios.get(`${serverUrl}/api/story/view/${story._id}`,{ withCredentials: true} )

    } catch (error) {
     console.log(error) 
    }
  }
const handleClick = async () => {
  if (!story && userName === "Your Story") {
    navigate("/upload");
  } 
  else if (story && userName === "Your Story") {
    await handleViewers();
    navigate(`/story/${userData.userName}`);
  } 
  else {
    await handleViewers();
    navigate(`/story/${userName}`);
  }
};



  return (
    <div className="flex flex-col w-[80px] items-center"  >
      {/* OUTER STORY CIRCLE */}
      <div
    className={`w-[80px] h-[80px] relative p-[2px]
    ${!story ? "" : !viewed ? "bg-gradient-to-b from-cyan-400  to-blue-600" : "bg-gradient-to-b from-slate-500  to-slate-700"}
    rounded-full flex justify-center items-center`}
    onClick={handleClick}
>


        {/* DP */}
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full overflow-hidden">
          <img
            src={ProfileImage || Dp}
            alt="story"
            className="w-full h-full object-cover"
          />
          {!story && userName=="Your Story" && (
            <div className="absolute -bottom-1 right-1 bg-blue-500 rounded-full p-[3px] border-2 border-black">
              <LuCircleFadingPlus className="text-white w-[18px] h-[18px]" />
            </div>
          )}
        </div>
      </div>
      {/* USER NAME */}
      <div className="text-[14px] text-center truncate w-full text-white mt-1">
        {userName}
      </div>
    </div>
  );
}

export default StoryCard;
