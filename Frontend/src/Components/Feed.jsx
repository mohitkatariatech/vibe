import React from 'react'
import logo from "../assets/logo.jpeg"
import { RiHeartsFill } from "react-icons/ri";
import Nav from './Nav';
import { useSelector } from 'react-redux';
import Post from './Post';
import StoryCard from './StoryCard';
import { RiMessage3Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const Feed = () => {
  const navigate = useNavigate();
  const { postData } = useSelector(state => state.post);
  const { userData ,notificationData} = useSelector(state => state.user);
  const{storyList,currentUserStory} = useSelector(state=>state.story)
  
  
  return (
    <div className="w-full bg-black min-h-full">

      {/* Mobile Top Bar */}
      <div className="w-full h-[70px] flex items-center justify-between px-4 lg:hidden">
  <img src={logo} alt="logo" className="w-[80px]" />

  {/* ICON GROUP */}
  <div className="flex items-center gap-4">
    <div className="relative">
  <RiHeartsFill
    size={24}
    className="text-white w-[25px] h-[25px]"
    onClick={()=>navigate("/notifications")}
  />

  {notificationData?.length > 0 &&
    notificationData?.some(noti => noti.isRead === false) && (
      <div className="w-[10px] h-[10px] bg-blue-700 rounded-full absolute top-0 right-[-1px]" />
    )}
</div>
 
    <RiMessage3Fill className="text-white w-[30px] h-[30px] hover:text-blue-400 cursor-pointer" onClick={()=>navigate("/messages")} />
  </div>
</div>


      {/* STORIES (HORIZONTAL ONLY) */}
      <div className="flex flex-row gap-4 px-4 py-4 overflow-x-auto no-scrollbar bg-black">
{/* USER STORY */}
<StoryCard
  userName="Your Story"
  ProfileImage={userData.profileImage}
  story={currentUserStory}
/>



{storyList
  ?.filter(story => story.author._id !== userData._id)
  .map(story => (
    <StoryCard
      key={story._id}
      story={story}
      userName={story.author.userName}
      ProfileImage={story.author.profileImage}
    />
))}
      </div>
      {/* FEED CONTENT */}
      <div className="w-full bg-[#ffffff]
         rounded-t-[60px] pt-6 pb-[120px] min-h-screen">
{/* Posts */}
        <div className="flex flex-col gap-6 px-4">
          {postData?.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </div>
      {/* Bottom Nav (MOBILE ONLY) */}
      <div className="fixed bottom-0 left-0 w-full">
        <Nav />
      </div>
    </div>
  );
};
export default Feed;
