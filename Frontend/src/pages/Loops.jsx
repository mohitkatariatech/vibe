import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import LoopCard from "../Components/LoopCard";
import { useSelector } from "react-redux";


function Loops() {
    const navigate = useNavigate();
    const { loopData } = useSelector(state => state.loop);

    return (
        <div className="w-screen h-dvh bg-black overflow-hidden justify-center items-center relative">

            {/* Back button */}
            <div
                className="flex items-center gap-[10px] cursor-pointer text-gray-300 absolute left-[20px] top-[20px] z-50 "
                onClick={() => navigate(`/`)}
            >
                <IoMdArrowRoundBack className="text-2xl" />
                <span className="text-[20px] font-semibold">Loops</span>
            </div>

            {/* Scroll Container */}
            <div className="h-dvh w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide
                flex flex-col items-center">
                {loopData.map((loop, index) => (
                    <div
                        key={loop._id || index}
                        className="h-dvh w-full flex justify-center snap-start"
                    >
                        <LoopCard loop={loop} />
                    </div>
                ))}
            </div>

        </div>
    );
}


export default Loops 