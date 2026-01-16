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
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // SIGNin FUNCTION
    const handleSignin = async () => {
        setLoading(true);
        setMessage("");

        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/signin`,
                { userName, password },
                { withCredentials: true }
            );
            dispatch(setUserdata(result.data))

            console.log(result.data);

            setMessage("Login successful!");
            // navigate("/home");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong. Try again.");
            }
        }

        setLoading(false);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-[#25252b] text-white font-[Poppins] px-4">
  <div
    className="relative w-full max-w-[750px] md:h-[450px] border-2 border-[#e46033]
    shadow-[0_0_25px_#e46033] overflow-hidden transition-all duration-700
    flex flex-col md:block"
  >
    {/* BG SHAPES (Hidden on mobile) */}
    <div
      className={`hidden md:block absolute right-0 top-[-5px] h-[600px] w-[850px]
      bg-gradient-to-br from-[#25252b] to-[#e46033]
      origin-bottom-right transition-all duration-[1500ms]
      ${active ? "rotate-0 skew-y-0" : "rotate-[10deg] skew-y-[40deg]"}`}
    ></div>

    <div
      className={`hidden md:block absolute left-[250px] top-full h-[700px] w-[850px]
      bg-[#25252b] border-t-[3px] border-[#e46033]
      origin-bottom-left transition-all duration-[1500ms]
      ${active ? "-rotate-[11deg] -skew-y-[41deg]" : "rotate-0 skew-y-0"}`}
    ></div>

    {/* ---------------- LOGIN FORM ---------------- */}
    <div
      className={`relative md:absolute top-0 left-0 h-full w-full md:w-1/2
      flex flex-col justify-center px-6 md:px-[40px]
      transition-all duration-700
      ${active ? "md:-translate-x-[120%] md:opacity-0" : "opacity-100"}`}
    >
      <div className="flex gap-2 justify-center items-center text-[18px] md:text-[20px] font-semibold mb-6">
        <span>Sign In to</span>
        <img src={logo} alt="" className="w-[60px] md:w-[70px]" />
      </div>

      {/* Username */}
      <div className="relative w-full h-[45px] md:h-[50px] mt-4">
        <input
          type="text"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="peer w-full h-full bg-transparent border-b-2 border-white
          outline-none text-[15px] md:text-[16px] font-semibold pr-8
          focus:border-[#e46033]"
        />
        <label className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] md:text-[16px]
          transition peer-focus:top-[-5px] peer-focus:text-[#e46033]
          peer-valid:top-[-5px] peer-valid:text-[#e46033]">
          Username
        </label>
        <FiUser className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Password */}
      <div className="relative w-full h-[45px] md:h-[50px] mt-4">
        <input
          type={showLoginPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer w-full h-full bg-transparent border-b-2 border-white
          outline-none text-[15px] md:text-[16px] font-semibold pr-8
          focus:border-[#e46033]"
        />
        <label className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] md:text-[16px]
          transition peer-focus:top-[-5px] peer-focus:text-[#e46033]
          peer-valid:top-[-5px] peer-valid:text-[#e46033]">
          Password
        </label>

        {showLoginPassword ? (
          <IoIosEye
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowLoginPassword(false)}
          />
        ) : (
          <IoIosEyeOff
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowLoginPassword(true)}
          />
        )}
      </div>

      <p
        onClick={() => navigate("/forgot-password")}
        className="text-[13px] text-right mt-2 text-[#e46033] cursor-pointer hover:underline"
      >
        Forgot Password?
      </p>

      <button
        onClick={handleSignin}
        disabled={loading}
        className="relative w-full mt-6 h-[45px]
        rounded-[40px] border-2 border-[#e46033] font-semibold overflow-hidden"
      >
        {loading ? (
          <ClipLoader size={22} color="#e46033" />
        ) : (
          <>
            <span className="absolute inset-0 h-[300%] bg-gradient-to-b
            from-[#25252b] via-[#e46033] to-[#25252b]
            -top-full transition-all duration-500 hover:top-0"></span>
            <span className="relative z-[2]">Login</span>
          </>
        )}
      </button>

      <p className="text-[13px] text-center mt-4">
        Don’t have an account?
        <br />
        <button
          onClick={() => navigate("/signup")}
          className="text-[#e46033] font-semibold hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>

    {/* ---------------- RIGHT INFO (Desktop Only) ---------------- */}
    <div
      className={`hidden md:flex absolute top-0 right-0 h-full w-1/2
      flex-col justify-center text-right pr-[40px] pb-[60px] pl-[150px]
      transition-all duration-700
      ${active ? "translate-x-[120%] opacity-0" : "opacity-100"}`}
    >
      <h2 className="uppercase text-[30px] lg:text-[36px] font-extrabold">
        WELCOME BACK!
      </h2>
      <p className="text-[15px] mt-3">
        We are happy to have you with us again.
      </p>
    </div>
  </div>
</div>

    );
};

export default LoginRegister;
