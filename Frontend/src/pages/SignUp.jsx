import React, { useState } from "react";
import logo from "../assets/logo3.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserdata } from "../redux/UserSlice";


const LoginRegister = () => {
  const [active, setActive] = useState(false);

  // Login states
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup states
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const dispatch = useDispatch()


  // SIGNUP FUNCTION
  const handleSignup = async () => {
    setLoading(true);
    setSignupMessage("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, userName, email, password },
        { withCredentials: true }
      );
      dispatch(setUserdata(result.data))

      console.log(result.data);
      setSignupMessage("Signup successful!");
      // navigate("/signin");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setSignupMessage(error.response.data.message);
      } else {
        setSignupMessage("Something went wrong. Try again.");
      }
    }

    setLoading(false);
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#25252b] text-white font-[Poppins]">
      
      
  <div
    className={`relative
    w-full max-w-[420px]
    md:max-w-[750px]
    h-auto md:h-[450px]
    border-2 border-[#e46033]
    shadow-[0_0_25px_#e46033]
    overflow-hidden transition-all duration-700`}
  >
        {/* BG SHAPES */}
          <div
      className={`hidden md:block absolute right-0 top-[-5px]
      h-[600px] w-[850px]
      bg-gradient-to-br from-[#25252b] to-[#e46033]
      origin-bottom-right transition-all duration-[1500ms]
      ${active ? "rotate-0 skew-y-0" : "rotate-[10deg] skew-y-[40deg]"}`}
    />

    <div
      className={`hidden md:block absolute left-[250px] top-full
      h-[700px] w-[850px]
      bg-[#25252b] border-t-[3px] border-[#e46033]
      origin-bottom-left transition-all duration-[1500ms]
      ${active ? "-rotate-[11deg] -skew-y-[41deg]" : "rotate-0 skew-y-0"}`}
    />

        {/* ---------------- LOGIN FORM ---------------- */}
        <div
      className={`relative md:absolute top-0 left-0
      w-full md:w-1/2
      h-auto md:h-full
      flex flex-col justify-center
      px-5 md:px-[40px]
      py-8 md:py-0
      transition-all duration-700
      ${active ? "md:-translate-x-[120%] md:opacity-0" : "opacity-100"}`}
    >
          <div className="flex gap-2 justify-center items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign In to</span>
            <img src={logo} alt="" className="w-[70px]" />
          </div>

          {/* Username */}
          <div className="relative w-full h-[50px] mt-[25px]">
            <input
              type="text"
              required
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-[16px] font-semibold pr-8 transition duration-500 focus:border-[#e46033]"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 text-[16px] transition peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
              Username
            </label>
            <FiUser className="absolute right-0 top-1/2 -translate-y-1/2 text-[18px] text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative w-full h-[50px] mt-[25px]">
            <input
              type={showLoginPassword ? "text" : "password"}
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-[16px] font-semibold pr-8 transition duration-500 focus:border-[#e46033]"
            />

            <label className="absolute left-0 top-1/2 -translate-y-1/2 transition duration-500 peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
              Password
            </label>

            {showLoginPassword ? (
              <IoIosEye
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer text-gray-400"
                onClick={() => setShowLoginPassword(false)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer text-gray-400"
                onClick={() => setShowLoginPassword(true)}
              />
            )}
          </div>

          <button className="relative w-full mt-7 h-[45px] rounded-[40px] border-2 border-[#e46033] font-semibold overflow-hidden z-[1]">
            <span className="absolute inset-0 h-[300%] bg-gradient-to-b from-[#25252b] via-[#e46033] to-[#25252b] -top-full transition-all duration-500 hover:top-0"></span>
            <span className="relative z-[2]">Login</span>
          </button>

          <p className="text-[14px] text-center mt-5">
            Don’t have an account?
            <br />
            <button
              onClick={() => setActive(true)}
              className="text-[#e46033] font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* ---------------- LOGIN INFO TEXT ---------------- */}
        <div
      className={`hidden md:flex absolute top-0 right-0 h-full w-1/2
      flex-col justify-center text-right
      pr-[40px] pb-[60px] pl-[150px]
      transition-all duration-700
      ${active ? "translate-x-[120%] opacity-0" : "opacity-100"}`}
    >
          <h2 className="uppercase text-[36px] font-extrabold">
            WELCOME BACK!
          </h2>
          <p className="text-[16px] mt-3">
            We are happy to have you with us again.
          </p>
        </div>



        {/* ---------------- REGISTER FORM ---------------- */}
        <div
      className={`relative md:absolute top-0 right-0
      w-full md:w-1/2
      h-auto md:h-full
      flex flex-col justify-center
      px-5 md:px-[60px]
      py-8 md:py-0
      transition-all duration-700
      ${active ? "opacity-100" : "md:translate-x-[120%] md:opacity-0"}`}
    >
          <div className="flex gap-2 justify-center items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign Up to</span>
            <img src={logo} alt="" className="w-[70px]" />
          </div>

          {/* Name */}
          <div className="relative w-full h-[50px] mt-[25px]">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-[16px] pr-8 font-semibold focus:border-[#e46033]"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 transition peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
              Name
            </label>
            <FiUser className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Username */}
          <div className="relative w-full h-[50px] mt-[25px]">
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="peer w-full h-full bg-transparent border-b-2 border-white outline-none pr-8 font-semibold focus:border-[#e46033]"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 transition peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
              Username
            </label>
            <FiUser className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Email */}
          <div className="relative w-full h-[50px] mt-[25px]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full h-full bg-transparent border-b-2 border-white outline-none pr-8 font-semibold focus:border-[#e46033]"
            />
            <label className="absolute left-0 top-1/2 -translate-y-1/2 transition peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
              Email
            </label>
            <FiMail className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative w-full h-[50px] mt-[25px]">
            <input
              type={showSignupPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full h-full bg-transparent border-b-2 border-white outline-none pr-8 font-semibold focus:border-[#e46033]"
            />

            <label className="absolute left-0 top-1/2 -translate-y-1/2 transition peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
              Password
            </label>

            {showSignupPassword ? (
              <IoIosEye
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer text-gray-400"
                onClick={() => setShowSignupPassword(false)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer text-gray-400"
                onClick={() => setShowSignupPassword(true)}
              />
            )}
          </div>

          {/* Signup message here */}
          {signupMessage && (
            <p className="text-center mt-3 text-[#e46033] font-semibold">
              {signupMessage}
            </p>
          )}


          <button
            onClick={handleSignup}
            disabled={loading}
            className="relative w-full mt-7 h-[45px] rounded-[40px] border-2 border-[#e46033] font-semibold overflow-hidden flex justify-center items-center"
          >
            {loading ? (
              <ClipLoader size={25} color="#e46033" />
            ) : (
              <>
                <span className="absolute inset-0 h-[300%] bg-gradient-to-b from-[#25252b] via-[#e46033] to-[#25252b] -top-full transition-all duration-500 hover:top-0"></span>
                <span className="relative z-[2]">Register</span>
              </>
            )}
          </button>


          <p className="text-[14px] text-center mt-3">
            Already have an account?
            <br />
            <button
              onClick={() => navigate("/signin")}
              className="text-[#e46033] font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* ---------------- REGISTER INFO ---------------- */}
        <div
      className={`hidden md:flex absolute top-0 left-0 h-full w-1/2
      flex-col justify-center text-left
      pl-[38px] pb-[60px] pr-[150px]
      pointer-events-none transition-all duration-700
      ${active ? "opacity-100" : "opacity-0"}`}
    >
          <h2 className="uppercase text-[36px]">WELCOME!</h2>
          <p className="text-[16px] mt-3">
            We’re delighted to have you here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
