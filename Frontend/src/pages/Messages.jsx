import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../Components/OnlineUser";
import { setSelectedUser } from "../redux/messageSlice";
import Dp from "../assets/dp.png"



function Messages() {
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);
  const { onlineUsers } = useSelector(state => state.socket);
  const { prevChatUsers, selectedUsers } = useSelector(state => state.message);
  const dispatch = useDispatch();

  return (
    <div className="w-full min-h-screen bg-black text-white relative">

      {/* HEADER */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-gray-800 sticky top-0 bg-black z-10"
        onClick={() => navigate(`/`)}
      >
        <IoMdArrowRoundBack className="text-2xl lg:hidden cursor-pointer" />
        <span className="text-xl font-semibold">Messages</span>
      </div>

      {/* ONLINE USERS */}
      <div className="
        w-full h-[90px] flex gap-4 items-center
        px-5 overflow-x-auto border-b border-gray-800
        scrollbar-hide
      ">
        {userData?.following?.map(user =>
          onlineUsers?.includes(user._id) ? (
            <OnlineUser key={user._id} user={user} />
          ) : null
        )}
      </div>

      <div className="w-full flex flex-col gap-1 overflow-auto px-2">
        {prevChatUsers?.map((user) => (
          <div
            key={user._id}
            className="w-full flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-gray-900 rounded-md"
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate("/messageArea");
            }}
          >
            {onlineUsers?.includes(user._id) ? (
              <OnlineUser user={user} />
            ) : (
              <div className="relative flex-shrink-0">
                <img
                  src={user.profileImage || Dp}
                  alt="dp"
                  className="w-[40px] h-[40px] rounded-full object-cover border border-gray-700" />
              </div>
            )}


            <div className="flex flex-col">
              <div className="text-white text-[14px] font-medium truncate">
                {user.userName}
              </div>

              {onlineUsers?.includes(user?._id) && (
                <div className="text-blue-500 text-[12px]">
                  Active Now
                </div>
              )}


            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default Messages;
