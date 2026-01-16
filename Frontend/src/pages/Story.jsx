import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/StorySlice";
import StoryCardDp from "../Components/StoryCardDp";


function Story(){
    const {userName}=useParams();
    const dispatch = useDispatch();
   const {storyData} = useSelector(state=>state.story)

    const handleStory=async ()=>{
                     dispatch(setStoryData(null))

        try {
            const result = await axios.get(`${serverUrl}/api/story/getByUserName/${userName}`,{withCredentials:true})
             dispatch(setStoryData(result.data[0]))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
     if(userName){
        handleStory()
     }
         

    },[userName])
    return(
    
  <div className="w-full h-screen bg-black flex justify-center">
    <StoryCardDp story={storyData} />
  </div>

    )
}

export default Story