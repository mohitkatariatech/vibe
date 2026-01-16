import React, { useEffect, useRef, useState } from "react";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { MdOutlineVolumeOff } from "react-icons/md";
import Dp from "../assets/dp.png";
import FollowButton from "./FollowButton";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { CgComment } from "react-icons/cg";
import { setLoopData } from "../redux/LoopSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { IoSend } from "react-icons/io5";

function LoopCard({ loop }) {
  const videoRef = useRef(null);
  const { userData } = useSelector(state => state.user);
  const { loopData } = useSelector(state => state.loop);
  const {socket}= useSelector(state=>state.socket)
  const dispatch = useDispatch();
  const [showComment, setShowComment] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHeart, setShowHeart] = useState(false)
  const commentRef = useRef();
  const [message, setMessage] = useState("")

  // ✅ FIXED
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };



  const handleClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(prev => !prev);
  };

  const handleLikeOnDoubleClick = () => {
    setShowHeart(true)
    setTimeout(() => {
      setShowHeart(false);
    }, 600);

    { !loop.likes?.includes(userData._id) ? handleLike() : null }

  }


  const handleLike = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/loop/like/${loop._id}`,
        { withCredentials: true }
      );

      const updatedLoop = result.data;
      const updatedLoops = loopData.map(p => p._id == loop._id ? updatedLoop : p)
      dispatch(setLoopData(updatedLoops));
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/loop/comment/${loop._id}`,
        { message },
        { withCredentials: true }
      );

      const updatedLoop = result.data;
      const updatedLoops = loopData.map(p => p._id == loop._id ? updatedLoop : p)
      dispatch(setLoopData(updatedLoops));
      setMessage(""); // ⭐ VERY IMPORTANT

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        commentRef.current &&
        !commentRef.current.contains(event.target)
      ) {
        setShowComment(false);
      }
    };

    if (showComment) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComment]);






  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => { });
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);


    useEffect(() => {
      if (!socket) return;
      socket.on("likedLoop", (updatedData) => {
        const updatedLoops = loopData.map(p => p._id == updatedData.loopId ? { ...p, likes: updatedData.likes } : p)
        dispatch(setLoopData(updatedLoops))
      })
      socket.on("commentedLoop", (updatedData) => {
        const updatedLoops = loopData.map(p => p._id == updatedData.loopId ? { ...p, comments: updatedData.comments } : p)
        dispatch(setLoopData(updatedLoops))
      })
      return () => {
        socket?.off("likedLoop")
        socket?.off("commentedLoop")
      }
  
    }, [socket,dispatch])

  return (
    <div className="w-full lg:w-[420px] h-dvh bg-black relative overflow-hidden flex items-center justify-center">

      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="heart-animation">
            <FaHeart className="w-[90px] h-[90px] text-white drop-shadow-2xl" />
          </div>
        </div>
      )}

      <div ref={commentRef}
        className={`absolute z-[200] bottom-0 left-0 w-full h-[500px] 
  p-[10px] rounded-2xl bg-[#0e1718] 
  transform transition-transform duration-300 ease-in-out
  ${showComment ? "translate-y-0" : "translate-y-full"}
  `}>
        <h1 className="text-white text-[20px] text-center font-semibold ">Comments</h1>
<div className="w-full h-[350px] overflow-y-auto no-scrollbar flex flex-col gap-[20px]">
          {loop.comments.length == 0 && <div className="text-center text-white text-[20px] font-semibold mt-[50px]">
            No Comment
          </div>}
          {loop.comments?.map((com, index) => (
            <div className="w-full  flex flex-col gap-[5px] border-b-[1px] border-gray-800 justify-center pb-[10px]">
              <div className="flex items-center gap-4 w-full">
                <div
                  className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] border-2 border-black rounded-full overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/profile/${loop.author?.userName}`)}
                >
                  <img
                    src={com.author?.profileImage || Dp}
                    alt="dp"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="font-semibold truncate text-white">
                  {com.author?.userName}
                </p>
              </div>
              <div className="text-white pl-[60px]">{com.message}</div>
            </div>
          ))}

        </div>


        <div className="px-6 mb-4">

          {/* INPUT ROW */}
          <div className="flex items-center  gap-3">
            <img
              src={userData?.profileImage || Dp}
              alt="dp"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />


            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-b outline-none text-white bg-transparent"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
           {message && <IoSend
              className="text-xl cursor-pointer" style={{ color: "white" }}
              onClick={handleComment}
            />}
            
          </div>
        </div>
      </div>




      <video
        ref={videoRef}
        src={loop?.media}
        autoPlay
        muted={isMute}
        loop
        playsInline
        className="w-full h-full object-cover"
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
        onDoubleClick={handleLikeOnDoubleClick}
      />

      {/* 🔊 Mute / Unmute */}
      <div
        className="absolute top-[20px] right-[20px] z-[100] cursor-pointer"
        onClick={() => setIsMute(prev => !prev)}
      >
        {isMute ? (
          <MdOutlineVolumeOff className="w-[22px] h-[22px] text-white" />
        ) : (
          <IoVolumeMediumSharp className="w-[22px] h-[22px] text-white" />
        )}
      </div>




      {/* ⏱ Progress Bar */}
      <div className="absolute bottom-0 w-full h-[4px] bg-gray-800">
        <div
          className="h-full bg-white transition-all duration-150 linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="absolute bottom-[5px] w-full h-[100px] flex flex-col ">
        <div className="flex items-center gap-4 w-full">
          <div
            className="w-[40px] h-[40px] mt-6 sm:w-[40px] sm:h-[40px] border-2 border-black rounded-full overflow-hidden cursor-pointer"
            onClick={() => navigate(`/profile/${loop.author?.userName}`)}
          >
            <img
              src={loop.author?.profileImage || Dp}
              alt="dp"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-semibold mt-6 text-white truncate">
            {loop.author?.userName}
          </p>
          <FollowButton targetUserId={loop.author?._id} tailwind={"px-[10px] py-[5px] w-[100px]  mt-6  border-2  text-white rounded-2xl font-semibold  border-white "} />
        </div>
        <div className="text-white px-[10px] ">
          {loop.caption}
        </div>
        <div className="absolute right-0 flex flex-col gap-[20px]  text-white bottom-[150px] justify-bottom px-[10px] right-3">
          {/* heart icon */}
          <div className="flex flex-col items-center cursor-pointer">
            <div className="flex items-center gap-2">
              {loop.likes?.includes(userData?._id) ? (
                <FaHeart
                  onClick={handleLike}
                  className="text-red-500 text-2xl cursor-pointer"
                />
              ) : (
                <FaRegHeart
                  onClick={handleLike}
                  className="text-2xl cursor-pointer"
                />
              )}

            </div>
            <div> <span>{loop.likes?.length || 0}</span></div>
          </div>
          {/* comment icon */}
          <div className="flex flex-col cursor-pointer items-center" >
            <div className="flex items-center gap-2" onClick={() => setShowComment(true)}>

              <CgComment className="text-2xl " />
            </div>
            <div> <span>{loop.comments?.length || 0}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoopCard;
