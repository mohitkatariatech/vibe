import React, { useEffect, useState } from "react";
import Dp from "../assets/dp.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import VideoPlayer from "./VideoPlayer";
import { FaEye } from "react-icons/fa";

function StoryCardDp() {
  const { storyData } = useSelector(state => state.story);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [showViewers,setShowViewers] = useState(false)
  const{userData} = useSelector(state=>state.user)

  useEffect(() => {
    if (!storyData) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [storyData, navigate]);

  return (
    <div className="w-full max-w-[500px] h-screen bg-black border-x border-gray-800 relative mx-auto">
     
     
      {/* TOP BAR */}
      <div className="absolute top-[10px] left-0 w-full h-[60px] flex items-center px-4 gap-3 bg-black z-10">

        <button
          onClick={() => navigate("/")}
          className="text-white mt-[20px]"
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </button>

        <div
          className="w-[36px] h-[36px] rounded-full overflow-hidden cursor-pointer mt-[20px]"
          onClick={() => navigate(`/profile/${storyData?.author?.userName}`)}
        >
          <img
            src={storyData?.author?.profileImage || Dp}
            alt="dp"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-white font-semibold text-sm truncate mt-[20px]">
          {storyData?.author?.userName}
        </p>
      </div>

      <div className="absolute top-[10px] w-full h-[4px] bg-gray-800 z-20">
        <div
          className="h-full bg-white transition-all duration-150 linear"
          style={{ width: `${progress}%` }}
        />
      </div>
       
       {!showViewers && <> 
          
            <div className="w-full h-[90vh] flex justify-center mt-6">
        {storyData?.media && storyData?.mediaType === "image" && (
          <img
            src={storyData.media}
            alt="preview"
            className="w-full max-w-lg rounded-2xl object-contain"
          />
        )}


        {storyData?.media && storyData?.mediaType === "video" && (
          <VideoPlayer media={storyData.media} />
        )}
      </div>

      

{storyData?.author?.userName === userData?.userName &&  (
  <div className="absolute w-full flex items-center mb-4 h-[70px] bottom-0 p-2 left-0 bg-black/40 cursor-pointer " onClick={()=>setShowViewers(true)} >
    <div className="text-white flex items-center gap-2 mt-7 ">

      <FaEye />
      {storyData?.viewers?.length}

      <div className="flex relative ml-2 mb-5">
        {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
          <div
            key={viewer._id}
            className="w-[30px] h-[30px] border-2 mr-8 border-black rounded-full overflow-hidden absolute"
            style={{ left: `${index * 18}px` }}
          >
            <img
              src={viewer?.profileImage || Dp}
              alt="viewer"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  </div>
)}</>}

{showViewers && (
  <>
    {/* STORY MEDIA */}
    <div className="w-full h-[220px] mt-[100px] overflow-hidden flex justify-center items-center cursor-pointer " onClick={()=>setShowViewers(false)}>
      {storyData?.media && storyData?.mediaType === "image" && (
        <img
          src={storyData.media}
          alt="preview"
          className="w-full max-w-lg h-full rounded-2xl object-cover"
        />
      )}

     {storyData?.media && storyData?.mediaType === "video" && (
  <video
    src={storyData.media}
    className="w-full max-w-lg h-full rounded-2xl object-contain bg-black"
    autoPlay
  />
)}
    </div>

 
    <div className="flex items-center gap-2 text-white mt-4">
      <FaEye/>
      <span>{storyData?.viewers?.length}</span>
      <span>Viewers</span>
    </div>

    <div className="w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]">
     {storyData?.viewers.map((viewer,index)=>(
      <div className="w-full flex items-center gap-[20px]">
       <div
          className="w-[36px] h-[36px] rounded-full overflow-hidden cursor-pointer mt-[20px]"
         
        >
          <img
            src={viewer?.profileImage || Dp}
            alt="dp"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-white font-semibold text-sm truncate mt-[20px]">
          {viewer?.userName}
        </p>
      </div>
     ))}
    </div>

  </>
)}




    </div>
  );
}


export default StoryCardDp;
