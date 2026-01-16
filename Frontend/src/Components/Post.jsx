import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dp from "../assets/dp.png";
import VideoPlayer from '../Components/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CgComment } from "react-icons/cg";
import { IoBookmarkOutline, IoBookmark, IoSend } from "react-icons/io5";
import axios from "axios";
import { serverUrl } from "../App";
import { setPostData } from "../redux/PostSlice";
import { setUserdata } from "../redux/UserSlice";
import FollowButton from "./FollowButton";



function Post({ post }) {
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);
  const { postData } = useSelector(state => state.post);
  const { socket } = useSelector(state => state.socket)
  const [showComment, setShowComment] = useState(false);
  const [message, setMessage] = useState("")

  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/post/like/${post._id}`,
        { withCredentials: true }
      );

      const updatedPost = result.data;
      const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };


  const handleComment = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/post/comment/${post._id}`, { message },
        { withCredentials: true }
      );

      const updatedPost = result.data;
      const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaved = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/post/saved/${post._id}`,
        { withCredentials: true }
      );
      dispatch(setUserdata(result.data));
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("likedPost", (updatedData) => {
      const updatedPosts = postData.map(p => p._id == updatedData.postId ? { ...p, likes: updatedData.likes } : p)
      dispatch(setPostData(updatedPosts))
    })
    socket.on("commentedPost", (updatedData) => {
      const updatedPosts = postData.map(p => p._id == updatedData.postId ? { ...p, comments: updatedData.comments } : p)
      dispatch(setPostData(updatedPosts))
    })
    return () => {
      socket?.off("likedPost")
      socket?.off("commentedPost")
    }

  }, [socket])





  return (
    <div className="w-[95%] sm:w-[90%] min-h-[350px] sm:min-h-[450px] mx-auto flex flex-col gap-3 bg-white shadow-xl shadow-black/20 rounded-2xl">

      {/* HEADER */}
      <div className="w-full sm:h-[80px] flex items-center px-4">
        <div className="flex items-center gap-4 w-full">
          <div
            className="w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] border-2 border-black rounded-full overflow-hidden cursor-pointer"
            onClick={() => navigate(`/profile/${post.author?.userName}`)}
          >
            <img
              src={post.author?.profileImage || Dp}
              alt="dp"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-semibold truncate">
            {post.author?.userName}
          </p>
        </div>
        {userData?._id !== post.author?._id && (
          <FollowButton
            tailwind={'w-[100px] px-[12px] py-[5px] h-[40px] bg-black text-white rounded-2xl font-semibold'}
            targetUserId={post.author?._id}
          />
        )}



      </div>

      {/* MEDIA */}
      <div className="w-full flex justify-center mt-6">
        {post.media && post.mediaType === "image" && (
          <img
            src={post.media}
            alt="preview"
            className="w-full max-w-lg rounded-2xl object-contain"
          />
        )}

        {post.media && post.mediaType === "video" && (
          <VideoPlayer media={post.media} />
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between px-6 mb-5 mt-3">
        <div className="flex gap-5">

          {/* LIKE */}
          <div className="flex items-center gap-2">
            {post.likes?.includes(userData?._id) ? (
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
            <span>{post.likes?.length || 0}</span>
          </div>

          {/* COMMENT */}
          <div className="flex items-center gap-2">
            <CgComment className="text-2xl" onClick={() => setShowComment(prev => !prev)} />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>

        {/* SAVE */}
        {userData.saved?.some(
          (savedPost) =>
            savedPost._id?.toString() === post._id.toString()
        ) ? (
          <IoBookmark
            onClick={handleSaved}
            className="text-2xl cursor-pointer"
          />
        ) : (
          <IoBookmarkOutline
            onClick={handleSaved}
            className="text-2xl cursor-pointer"
          />
        )}

      </div>

      {/* CAPTION */}
      {/* CAPTION */}
      {post.caption && (
        <div className="px-6 flex gap-2 mb-5">
          <b>{post.author?.userName || "User"}</b>
          <span>{post.caption}</span>
        </div>
      )}


      {/* COMMENT INPUT */}
      {showComment && (
        <div className="px-6 mb-4">

          {/* INPUT ROW */}
          <div className="flex items-center gap-3">
            <img
              src={userData?.profileImage || Dp}
              alt="dp"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />

            <input
              type="text"
              placeholder="Write comment..."
              className="flex-1 border-b outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <IoSend
              className="text-xl cursor-pointer"
              onClick={handleComment}
            />
          </div>

          {/* COMMENTS LIST (DOWNWARDS + RIGHT SIDE) */}
          <div className="w-full max-h-[300px] overflow-auto mt-4 pl-[60px]">
            {post.comments?.map((com, index) => (
              <div key={index} className="flex items-start gap-3 mt-2">

                <img
                  src={com.author?.profileImage || Dp}
                  alt="dp"
                  className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                  onClick={() => {
                    if (!com.author?.userName) return;
                    navigate(`/profile/${com.author.userName}`);
                  }}
                />

                <div className="bg-gray-100 px-3 py-2 rounded-xl max-w-[80%]">
                  <p className="text-xs font-semibold">
                    {com.author?.userName}
                  </p>
                  <p className="text-sm">
                    {com.message}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
}

export default Post;



