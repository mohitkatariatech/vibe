import React, { useRef } from "react";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import VideoPlayer from '../Components/VideoPlayer'
import { serverUrl } from '../App';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/PostSlice";
import { setCurrentUserStory, setStoryData } from "../redux/StorySlice";
import { setLoopData } from "../redux/LoopSlice";
import { ClipLoader } from "react-spinners";
import { setUserdata } from "../redux/UserSlice";






function Upload() {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post")
  const [frontendMedia, setFrontendMedia] = useState(null)
  const [backendMedia, setBackendMedia] = useState(null)
  const [mediaType, setMediaType] = useState("")
  const mediaInput = useRef();
  const dispatch = useDispatch()


  const{postData} = useSelector(state=>state.post)
  const{storyData} = useSelector(state=>state.story)
  const{loopData} = useSelector(state=>state.loop)
    const { userData } = useSelector(state => state.user);
  

  const[loading,setloading] = useState(false)
  const [caption,setCaption]=useState("")

  const handleMedia = (e) => {
    console.log("handleMedia triggered");  // debug log
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setMediaType("image")
    } else {
      setMediaType("video")
    }
    console.log(file, "file");
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file))
  };

  const uploadPost = async () => {
  setloading(true)
  try {
    const formData = new FormData()
    formData.append("caption", caption)
    formData.append("mediaType", mediaType)
    formData.append("media", backendMedia)

    const result = await axios.post(
      `${serverUrl}/api/post/upload`,
      formData,
      { withCredentials: true }
    )

    dispatch(setPostData([...(postData || []), result.data]))
    setloading(false)
    navigate("/")
  } catch (error) {
    console.log(error)
    setloading(false)
  }
}


  const uploadStory = async()=>{
    try {
      const formData = new FormData() 
      formData.append("caption", caption)
      formData.append("mediaType",mediaType)
            formData.append("media",backendMedia)
            const result = await axios.post(`${serverUrl}/api/story/upload`,
              formData,{withCredentials: true}
            )
         dispatch(setCurrentUserStory(result.data))
             setloading(false)
        navigate("/")
            console.log(result)


    } catch (error) {
      console.log(error)
    }
  }

  const uploadLoop = async()=>{
    try {
      const formData = new FormData() 
      formData.append("caption", caption)
            formData.append("media",backendMedia)
            const result = await axios.post(`${serverUrl}/api/loop/upload`,
              formData,{withCredentials: true}
            )
            dispatch(setLoopData([...loopData,result.data]))
             setloading(false)
        navigate("/")
            console.log(result)


    } catch (error) {
      console.log(error)
    }
  }
  

  const handleUpload = ()=>{
    setloading(true)
    if(uploadType=="post"){
      uploadPost()
    }else if(uploadType == "story"){
      uploadStory()
    }else{
      uploadLoop()
    }
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center relative"
    >
      {/* Back Button */}
      <div className="flex items-center gap-2 cursor-pointer text-white absolute left-4 top-4" onClick={() => navigate("/")} > <IoMdArrowRoundBack className="text-2xl" /> <span className="text-lg font-semibold">Upload Media</span>
      </div>

      {/* Tabs */}
      <div className="w-[90%] sm:w-[80%] max-w-[500px] h-[60px] bg-white rounded-full
                flex items-center justify-between px-4
                mt-[140px] sm:mt-[120px]">

        {/* Post */}
        <div
          className={`${uploadType === "post" ? "bg-black text-white" : "text-black"}
      w-[30%] h-[75%] flex justify-center items-center
      text-[14px] sm:text-[16px] md:text-[18px]
      font-semibold cursor-pointer rounded-full
      transition-all duration-300
      hover:bg-black hover:text-white`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>

        {/* Story */}
        <div
          className={`${uploadType === "story" ? "bg-black text-white" : "text-black"}
      w-[30%] h-[75%] flex justify-center items-center
      text-[14px] sm:text-[16px] md:text-[18px]
       font-semibold cursor-pointer rounded-full
      transition-all duration-300
      hover:bg-black hover:text-white`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>

        {/* Loop */}
        <div
          className={`${uploadType === "loop" ? "bg-black text-white" : "text-black"}
      w-[30%] h-[75%] flex justify-center items-center
      text-[14px] sm:text-[16px] md:text-[18px]
      font-semibold cursor-pointer rounded-full
      transition-all duration-300
      hover:bg-black hover:text-white`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>


      {/* Upload Card */}
      {!frontendMedia && (
        <div
          className="w-[88%] sm:w-[85%] max-w-[500px] h-[260px] sm:h-[300px] md:h-[340px]
      bg-gradient-to-br from-[#0e1316] to-[#141a1e]
      border border-gray-700 rounded-3xl mt-10 
      flex flex-col items-center justify-center gap-3 cursor-pointer
      transition-all duration-300 ease-in-out
      hover:border-gray-500 hover:scale-[1.03] active:scale-[0.97]
      shadow-lg shadow-black/50"
          onClick={() => mediaInput.current.click()}
        >
          <input type="file"  accept={uploadType=="loop"?"video/*":""} hidden ref={mediaInput} onChange={handleMedia} />

          <AiOutlinePlusCircle className="text-white w-[30px] h-[30px] cursor-pointer" />
          <p className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
            Upload {uploadType}
          </p>

          <p className="text-gray-400 text-sm sm:text-base">
            Click to select photo or video
          </p>
        </div>
      )}

      {/* Preview */}


      {frontendMedia && mediaType === "image" && (
        <div className="w-[85%] max-w-[500px] h-[320px] sm:h-[360px] md:h-[400px] flex flex-col items-center  mt-[10vh]">
          <img
            src={frontendMedia}
            alt="preview"
            className="h-[95%] w-auto rounded-2xl object-contain"
          />
        {uploadType!="story" &&  <input
            type="text"
            className="w-full bg-transparent border-b-2 border-gray-400
             outline-none px-[10px] py-[6px]
             text-white placeholder:text-gray-400
             mt-[20px] focus:border-gray-300 transition"
            placeholder="Write caption" onChange={(e)=>setCaption(e.target.value)} value={caption}
          />}

          
        </div>
      )}

      {frontendMedia && mediaType === "video" && (
  <div className="w-[85%] max-w-[500px] h-[320px] sm:h-[360px] md:h-[400px]
                  flex flex-col items-center  mt-[10vh]">
    
    <video
      src={frontendMedia}
      className="h-[85%] w-auto rounded-2xl object-contain"
      controls
    />
    <VideoPlayer media={frontendMedia}/>
    {uploadType !== "story" && (
      <input
        type="text" 
        className="w-full bg-transparent border-b-2 border-gray-400
                   outline-none px-[10px] py-[6px]
                   text-white placeholder:text-gray-400
                   mt-[20px] focus:border-gray-300 transition"
        placeholder="Write caption"  onChange={(e)=>setCaption(e.target.value)} value={caption}
      />
    )}

  </div>
)}

      {frontendMedia && <button className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px]  bg-[white] mt-[50px] cursor-pointer rounded-2xl " onClick={ handleUpload}>
      {loading?<ClipLoader  size={30} color='black' />: `upload ${uploadType}`}</button>}
        
    </div>
  );
}

export default Upload;
