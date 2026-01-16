import React from 'react'
import Dp from "../assets/dp.png"

function NotificationCard({ noti }) {
    
    return (
        <div className="
            w-full
            flex items-center justify-between
            gap-3
            px-4 py-3
            bg-gray-800
            rounded-full
        ">

            {/* LEFT: Avatar + Text */}
            <div className="flex items-center gap-3 min-w-0">

                {/* Avatar */}
                <div className="
                    w-10 h-10
                    sm:w-11 sm:h-11
                    md:w-12 md:h-12
                    rounded-full
                    overflow-hidden
                    flex-shrink-0
                ">
                    <img
                        src={noti.sender?.profileImage || Dp}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                    <span className="text-white font-semibold text-sm sm:text-base truncate">
                        {noti.sender?.userName}
                    </span>
                    <span className="text-gray-300 text-xs sm:text-sm truncate">
                        {noti.message}
                    </span>
                </div>
            </div>

            {/* RIGHT: Media */}
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                {noti.loop ? (
                    <video
                        src={noti.loop.media}
                        muted
                        loop
                        
                        className="w-full h-full object-cover"
                    />
                ) : noti.post?.mediaType === "image" ? (
                    <img
                        src={noti.post.media}
                        className="w-full h-full object-cover"
                        alt="post"
                    />
                ) : noti.post ? (
                    <video
                        src={noti.post.media}
                        muted
                        loop
                        autoPlay
                        className="w-full h-full object-cover"
                    />
                ) : null}
            </div>

        </div>
    )
}

export default NotificationCard
