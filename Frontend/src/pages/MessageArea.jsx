import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Dp from "../assets/dp.png";
import { IoImageOutline, IoCameraOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import SenderMessage from "../Components/SenderMessage";
import ReceiverMessage from "../Components/ReceiverMessage"
import axios from "axios";
import { serverUrl } from "../App";
import { setMessages } from "../redux/messageSlice";


function MessageArea() {
    const navigate = useNavigate();
    const [input , setInput] = useState("")
    const {socket} = useSelector(state=>state.socket)
    const { selectedUser,messages} = useSelector(state => state.message);
    const {userData} = useSelector(state=>state.user)
    const imageInput = useRef();
    const[frontendImage,setFrontendImage] = useState(null)
    const[backendImage,setBackendImage] = useState(null)
    const dispatch  = useDispatch();
    const handleImage = (e)=>{
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

 const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    try {
        const formData = new FormData()
        formData.append("message",input)
        if(backendImage){
            formData.append("image",backendImage)
        }
        const result = await axios.post(
            `${serverUrl}/api/message/send/${selectedUser._id}`,
            formData,
            { withCredentials: true }
        );

        dispatch(setMessages([...messages, result.data]));
        setInput("");

        setFrontendImage(null);
        setBackendImage(null);
    } catch (error) {
        console.log(error);
    }
};

useEffect(()=>{
 getAllMessages()
},[])

const getAllMessages = async()=>{
    try {
         const result = await axios.get(`${serverUrl}/api/message/getAll/${selectedUser._id}`,{withCredentials:true})
         dispatch(setMessages(result.data))
    } catch (error) {
     console.log(error)   
    }
}


useEffect(() => {
  if (!socket) return;
  socket?.on("newMessage",(mess)=>{
dispatch(setMessages([...messages,mess]))
  } );
  return () => socket?.off("newMessage");
}, [socket]);


        return (
        <div className="w-full h-screen bg-black">

            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 fixed top-0 z-50 bg-black w-full">

                {/* Back Button */}
                <IoMdArrowRoundBack
                    className="text-white text-2xl cursor-pointer"
                    onClick={() => navigate("/")}
                />

                {/* Profile Image */}
                <div
                    className="w-10 h-10 rounded-full overflow-hidden border border-white cursor-pointer"
                    onClick={() => navigate(`/profile/${selectedUser?.userName}`)}
                >
                    <img
                        src={selectedUser?.profileImage || Dp}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col leading-tight">
                    <p className="text-white font-semibold text-[20px]">
                        {selectedUser?.userName}
                    </p>
                    <p className="text-gray-400 text-xs">
                        {selectedUser?.name}
                    </p>

                </div>

            </div>

        <div className="w-full h-[80%] pt-[100px] pb-[120px] lg:pb-[150px] px-[40px] flex flex-col gap-[50px] overflow-auto hide-scrollbar bg-black">      
                {messages && messages.map((mess,index)=>(
                mess.sender==userData._id?<SenderMessage message={mess} />: <ReceiverMessage message={mess}/>
             )) }
            </div>

            <div className="w-full h-[80px] fixed bottom-0 flex justify-center items-center bg-black z-[100] ">
             <form className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#131616] flex items-center gap-[10px] px-[20px] relative" onSubmit={handleSendMessage}>
                {frontendImage &&  <div className="w-[100px] rounded-2xl h-[100px] absolute top-[-120px] right-[10px] overflow-hidden">
                    <img src={frontendImage} alt=""  className="h-full object-cover"/>
                </div>}
    
                <input type="file" accept="image/*" hidden ref={imageInput} onChange={handleImage} />
                <input type="text" placeholder="Message" className="w-full h-full px-[20px] tex-[18px] text-white outline-0 " onChange={(e)=>setInput(e.target.value)} value={input} />
                <div onClick={()=>imageInput.current.click()}>
               <IoImageOutline className=" w-[28px] h-[28px] text-white text-xl cursor-pointer" />
                </div>
                {(input || frontendImage) && <button  className="w-[60px] h-[40px] rounded-full bg-gradient-to-br from-[#9500ff] to-[#ff0095] flex items-center justify-center  ">
                    <IoSend className=" text-white text-2xl cursor-pointer" />
                </button>}
                
             </form>
            </div>



        </div>
    );
}

export default MessageArea;
