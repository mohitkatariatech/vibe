import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io"
import NotificationCard from '../Components/NotificationCard';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { serverUrl } from '../App'
import useAllNotifications from '../hooks/useAllNotification';

function Notification() {
  const navigate = useNavigate();
  const { notificationData } = useSelector(state => state.user);

  useAllNotifications(); // ✅ yahan call

  const ids = notificationData.map(n => n._id);

  const markAsRead = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/user/markAsRead`,
        { notificationId: ids },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ids.length > 0) {
      markAsRead();
    }
  }, []);


  return (
    <div className="w-full h-screen bg-black text-white flex justify-center">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[420px] lg:max-w-[480px] flex flex-col">

        {/* MOBILE HEADER */}
        <div className="lg:hidden sticky top-0 z-50 bg-black px-4 py-3 border-b border-gray-700">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            <IoMdArrowRoundBack className="text-xl" />
            <span className="text-lg font-semibold">
              Notification
            </span>
          </div>
        </div>

        {/* NOTIFICATION LIST (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-3 py-4 no-scrollbar">
          {notificationData?.length > 0 ? (
            notificationData.map((noti) => (
              <NotificationCard noti={noti} key={noti._id} />
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">
              No notifications yet
            </p>
          )}
        </div>

      </div>
    </div>
  );
}



export default Notification;
