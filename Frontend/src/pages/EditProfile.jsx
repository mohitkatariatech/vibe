import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowRoundBack } from "react-icons/io"
import Dp from "../assets/dp.png"
import axios from 'axios'
import { serverUrl } from '../App'
import { setProfileData, setUserdata } from '../redux/UserSlice'
import { ClipLoader } from "react-spinners";


function EditProfile() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageInput = useRef()
    const [frontendImage, setFrontendImage] = useState(userData.profileImage || Dp)
    const [backendImage, setBackendImage] = useState(null)
    const [name, setName] = useState(userData.name || "")
    const [userName, setuserName] = useState(userData.userName || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [profession, setProfession] = useState(userData.profession || "")
    const [gender, setGender] = useState(userData.gender || "")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    const handleEditProfile = async () => {
        setLoading(true)
        try {
            const formdata = new FormData()
            formdata.append("name", name)
            formdata.append("userName", userName)
            formdata.append("bio", bio)
            formdata.append("profession", profession)
            formdata.append("gender", gender)
            if (backendImage) {
                formdata.append("profileImage", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/editProfile`, formdata, { withCredentials: true })
            console.log("EDIT PROFILE RESPONSE:", result.data)
           dispatch(setProfileData(result.data.user || result.data))
        dispatch(setUserdata(result.data.user || result.data))


            setLoading(false)
            navigate(`/profile/${result.data.userName}`, { replace: true })
        } catch (error) {
            setLoading(false)

            console.log(error)
        }
    }
    return (
        <div className="w-full min-h-screen bg-black p-[20px] fixed ">

            {/* Header */}
            <div
                className="flex items-center gap-[10px] cursor-pointer text-white absolute left-[20px] top-[20px]"
                onClick={() => navigate(`/profile/${userData.userName}`)}
            >
                <IoMdArrowRoundBack className="text-2xl" />
                <span className="text-[20px] font-semibold">
                    Edit Profile
                </span>
            </div>
            <div className="flex justify-center p-9 md:p-16 -mt-4 md:-mt-10">
                <div className="w-[70px] h-[70px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={() => imageInput.current.click()}>
                    <input type="file" accept='image/*' ref={imageInput} hidden onChange={handleImage} />
                    <img
                        src={frontendImage}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="text-blue-500 text-center -mt-[25px] text-[12px] md:text-[18px] font-semibold cursor-pointer" onClick={() => imageInput.current.click()}>
                Change Your Profile Picture
            </div>
            <div className="flex flex-col items-center w-full space-y-4 md:space-y-6">
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-4 md:px-8 outline-none text-white placeholder-gray-400"
                    onChange={(e) => setName(e.target.value)} value={name} />
                <input
                    type="text"
                    placeholder="Enter Your UserName"
                    className="w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-4 md:px-8 outline-none text-white placeholder-gray-400"
                    onChange={(e) => setuserName(e.target.value)} value={userName} />
                <input
                    type="text"
                    placeholder="Enter Your Bio"
                    className="w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-4 md:px-8 outline-none text-white placeholder-gray-400"
                    onChange={(e) => setBio(e.target.value)} value={bio} />
                <input
                    type="text"
                    placeholder="Enter Your Profession"
                    className="w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-4 md:px-8 outline-none text-white placeholder-gray-400"
                    onChange={(e) => setProfession(e.target.value)} value={profession} />
                <input
                    type="text"
                    placeholder="Enter Your Gender"
                    className="w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[50px] md:h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-4 md:px-8 outline-none text-white placeholder-gray-400"
                    onChange={(e) => setGender(e.target.value)} value={gender} />

                {/* Save Profile Button */}
                <button className="w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[50px] md:h-[60px] bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl transition-colors duration-300" onClick={handleEditProfile} >
                    {loading ? <ClipLoader size={30} color='black' /> : "Save Profile"}
                </button>
            </div>

        </div>
    )
}

export default EditProfile
