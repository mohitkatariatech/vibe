import React, { useEffect, useState } from 'react'
import axios from "axios"
import { serverUrl } from "../App"
import Nav from "../Components/Nav"
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserdata } from '../redux/UserSlice'
import { IoMdArrowRoundBack } from "react-icons/io"
import Dp from "../assets/dp.png"
import FollowButton from '../Components/FollowButton'
import Post from '../Components/Post'
import { setSelectedUser } from '../redux/messageSlice'


function Profile() {
  const { userName } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profileData, userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)
  const [postType, setPostType] = useState("posts")

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      )

      // IMPORTANT: adjust if backend returns { user: {...} }
      dispatch(setProfileData(result.data.user || result.data))

    } catch (error) {
      console.log(error)
    }
  }
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
      dispatch(setUserdata(null))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userName) handleProfile()
  }, [userName])

  if (!profileData) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-white">
        Loading profile...
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen bg-black text-white'>
      <div className='w-full h-[80px] flex justify-between items-center px-[30px] border-b border-gray-800'>

        <div
          className="cursor-pointer text-2xl"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack />
        </div>

        <div className="text-[20px] font-semibold">
          {profileData.userName}
        </div>

        <div className="text-red-400 cursor-pointer hover:text-red-500" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
      <div className='w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[10px] justify-center'>
        <div className='w-[70px] h-[70px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden    '  >
          <img src={profileData.profileImage || Dp} alt="" className='w-full h-full  object-cover ' />
        </div>
        <div className="flex flex-col gap-1 max-w-[420px]">

          <div className="font-semibold text-[20px] text-white">
            {profileData?.name}
          </div>

          <div className="text-[14px] text-gray-400">
            {profileData?.profession || "New User"}
          </div>

          {profileData?.bio && (
            <div className="text-[14px] text-gray-300 leading-snug mt-1">
              {profileData.bio}
            </div>
          )}

        </div>
      </div>
      <div className='w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white '>
        <div>
          <div className='text-white text-[22px] md:text-[30px] font-semibold '>{profileData?.posts.length}</div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7] '>Posts</div>
        </div>
        <div>
          <div className='flex items-center justify-center gap-[20px]'>
            <div className='flex relative'>

              {profileData?.followers?.slice(0, 3).map((user, index) => {
                return (
                  <div className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""} `}  >
                    <img src={user.profileImage || Dp} alt="" className='w-full  object-cover ' />
                  </div>
                )
              })}
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold '>
              {profileData?.followers.length}
            </div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Follwers</div>
        </div>

        <div>
          <div className='flex items-center justify-center gap-[20px]' >
            <div className='flex relative'>
              {profileData?.following?.slice(0, 3).map((user, index) => {
                return (
                  <div className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""} `}  >
                    <img src={user.profileImage || Dp} alt="" className='w-full  object-cover ' />
                  </div>
                )
              })}
            </div>
            <div className='text-white text-[22px] md:text-[30px] font-semibold '>
              {profileData?.following.length}
            </div>
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Following</div>
        </div>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
        {profileData?._id === userData?._id && (
          <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white text-black cursor-pointer rounded-2xl font-semibold" onClick={() => navigate('/editprofile')}>
            Edit Profile
          </button>
        )}
        {profileData?._id != userData?._id && (
          <>
            <FollowButton tailwind={"px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white text-black cursor-pointer rounded-2xl font-semibold"} targetUserId={profileData._id} onFollowChange={handleProfile} />


            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white text-black cursor-pointer rounded-2xl font-semibold"onClick={()=>{
              dispatch(setSelectedUser(profileData))
              navigate("/messageArea")
            }} >
              Message
            </button>
          </>

        )}

      </div>
      <div className='w-full min-h-[100vh] flex justify-center '>
        <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px] mb-5'>

          {profileData?._id === userData?._id &&
            <div className="w-[90%] sm:w-[80%] max-w-[300px] h-[60px] bg-white rounded-full
                flex items-center justify-between px-3
  
                mt-[30px] sm:mt-[60px]">

              {/* Post */}
              <div
                className={`${postType === "posts" ? "bg-black text-white" : "text-black"}
      w-[30%] h-[75%] flex justify-center items-center
      text-[14px] sm:text-[16px] md:text-[18px]
      font-semibold cursor-pointer rounded-full
      transition-all duration-300
      hover:bg-black hover:text-white`}
                onClick={() => setPostType("posts")}
              >
                Posts
              </div>

              {/* Story */}
              <div
                className={`${postType === "saved" ? "bg-black text-white" : "text-black"}
      w-[30%] h-[75%] flex justify-center items-center
      text-[14px] sm:text-[16px] md:text-[18px]
       font-semibold cursor-pointer rounded-full
      transition-all duration-300
      hover:bg-black hover:text-white`}
                onClick={() => setPostType("saved")}
              >
                Saved
              </div>
            </div>
          }


          <Nav />
          {/* POSTS – everyone can see */}
          {postType === "posts" &&
            postData
              ?.filter(post => post.author?._id === profileData?._id)
              .map(post => (
                <Post post={post} key={post._id} />
              ))}

          {/* SAVED – only owner */}
          {profileData?._id === userData?._id &&
            postType === "saved" &&
            postData
              ?.filter(post => userData?.saved?.includes(post._id))
              .map(post => (
                <Post post={post} key={post._id} />
              ))}
              
        </div>
      </div>
    </div>

  )
}

export default Profile
