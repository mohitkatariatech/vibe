import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../redux/UserSlice";

function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const { searchData } = useSelector(state => state.user)

const handleSearch = async (e) => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/user/search?keyWord=${input} `,{withCredentials:true}
    );
    dispatch(setSearchData(result.data));
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  handleSearch();
}, [input]);




    


    return (
        <div className="w-full min-h-screen bg-black flex flex-col items-center gap-5 relative">

            {/* BACK */}
            <div
                className="flex items-center gap-2 cursor-pointer text-white absolute left-5 top-5"
                onClick={() => navigate(-1)}
            >
                <IoMdArrowRoundBack className="text-2xl" />
            </div>

            {/* SEARCH BAR */}
            <div className="w-full h-[80px] flex items-center justify-center mt-10">
<form
  className="w-[90%] max-w-[800px] h-[50px] rounded-full bg-[#0f1414] flex items-center px-4 gap-3"
  onSubmit={(e) => e.preventDefault()}
>
                    <ImSearch className="w-5 h-5 text-white" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
                        onChange={(e) => setInput(e.target.value)} value={input}
                    />
                </form>
            </div>

           { input && searchData?.map((user) => (
  <div
    key={user._id}
    onClick={() => navigate(`/profile/${user.userName}`)}
    className="
      w-[90vw] max-w-[700px] h-[75px]
      rounded-full
      bg-[#0f1414]
      flex items-center gap-4 px-4
      cursor-pointer
      transition-all duration-300
      hover:bg-[#1a1f1f]
      hover:scale-[1.02]
      hover:shadow-lg
    "
  >
    {/* PROFILE IMAGE */}
    <div className="
      w-[48px] h-[48px]
      rounded-full overflow-hidden
      border border-gray-700
      flex-shrink-0
    ">
      <img
        src={user.profileImage || Dp}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>

    {/* USER INFO */}
    <div className="flex flex-col">
      <span className="text-white text-[16px] font-semibold leading-tight">
        {user.userName}
      </span>
      <span className="text-gray-400 text-[14px]">
        {user.name}
      </span>
    </div>
  </div>
))}
{!input && <div className="text-[30px] text-gray-700 font-bold  ">
    Search Here...
    </div>}
  
        </div>
    );
}


export default Search