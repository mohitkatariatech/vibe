import React from 'react'
import LeftHome from '../Components/LeftHome'
import Feed from '../Components/Feed'
import RightHome from '../Components/RightHome'

const Home = () => {
  return (
    <div className="w-full h-screen bg-black flex justify-center overflow-hidden">

      {/* LEFT */}
      <div className="hidden lg:block w-[25%] h-screen">
        <LeftHome />
      </div>

      {/* CENTER */}
      <div className="w-full lg:w-[50%] h-screen overflow-y-auto no-scrollbar flex justify-center">
        <div className="w-full max-w-[600px]">
          <Feed />
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block w-[25%] h-screen">
        <RightHome />
      </div>

    </div>
  );
};

export default Home;




