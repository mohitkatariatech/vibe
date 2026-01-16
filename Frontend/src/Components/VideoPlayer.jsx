import React, { useRef, useState,useEffect } from "react";

import { IoVolumeMediumSharp } from "react-icons/io5";
import { MdOutlineVolumeOff } from "react-icons/md";

function VideoPlayer({ media }) {
    const videoTag = useRef()
    const [mute, setMute] = useState(true)
    const [isplaying, setIsPlaying] = useState(true)

    const handleclick = () => {
        if (isplaying) {
            videoTag.current.pause()
            setIsPlaying(false)
        } else {
            videoTag.current.play()
            setIsPlaying(true)
        }

    }

   
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoTag.current;
        if (!video) return; // 🔥 MOST IMPORTANT LINE

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoTag.current) observer.observe(videoTag.current);

    return () => {
      if (videoTag.current) observer.unobserve(videoTag.current);
    };
  }, []);
    return (
        <div className="h-full relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
            <video ref={videoTag}
                src={media}
                autoPlay
                loop
                muted={mute}
                className="h-full w-full object-cover rounded-2xl"
                onClick={handleclick}
            />
            <div className="absolute bottom-[10px] right-[10px]" onClick={() => setMute(prev => !prev)}>
                {!mute ? <IoVolumeMediumSharp className="w-[20px] h-[20px] text-white font-semibold " /> : <MdOutlineVolumeOff className="w-[20px] h-[20px] text-white font-semibold " />}

            </div>
        </div>

    );
}

export default VideoPlayer