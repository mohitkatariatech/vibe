import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // FIXED: Start from Step 1
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1 → Send OTP
const handleStepOne = async () => {
  setLoading(true);
  setMessage("");

  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/sendOtp`,
      { email },
      { withCredentials: true }
    );

    setMessage("OTP sent to your email!");
    console.log(result.data);

    setStep(2); // 👉 MOVE TO STEP 2
  } catch (error) {
    setMessage("Incorrect email try again !.");
    console.log(error);
  }

  setLoading(false);
};

// Step 2 → Verify OTP
 const handleStepTwo = async () => {
  setLoading(true);
  setMessage("");

  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/verifyOtp`,
      { email, otp },
      { withCredentials: true }
    );

    console.log(result.data);
    setMessage("OTP Verified Successfully!");
    setStep(3);
  } catch (error) {
    console.log(error);
    setMessage(error.response?.data?.message || "Invalid or expired OTP");
  }

  setLoading(false);
};


// Step 3 → Reset Password
const handleStepThree = async () => {
  setLoading(true);
  setMessage("");

  try {
    if (newPassword !== confirmPassword) {
      setLoading(false);
      return setMessage("Passwords do not match.");
    }

    const result = await axios.post(
      `${serverUrl}/api/auth/resetPassword`,
      { email, password: newPassword },
      { withCredentials: true }
    );

    setMessage("Password reset successful! 🎉");

    // ✅ Navigate to Sign In after 1.5 seconds
    setTimeout(() => {
      navigate("/signin"); // or "/login"
    }, 1500);

  } catch (error) {
    setMessage("Error resetting password.");
    console.log(error);
  }

  setLoading(false);
};



 

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#25252b] text-white font-[Poppins] px-4">
  <div className="w-full max-w-[420px] bg-[#2e2e35] shadow-[0_0_20px_#e46033] p-5 sm:p-8 rounded-xl border border-[#e46033]">

    {/* TITLE */}
    <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
      {step === 1 && "Forgot Password"}
      {step === 2 && "Verify OTP"}
      {step === 3 && "Reset Password"}
    </h2>

    {/* STEP 1 */}
    {step === 1 && (
      <>
        <p className="text-xs sm:text-sm text-gray-300 text-center mb-6">
          Enter your email and we'll send an OTP.
        </p>

        <div className="relative w-full h-[48px]">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-sm sm:text-[16px] font-semibold focus:border-[#e46033]"
          />
          <label className="absolute left-0 top-1/2 -translate-y-1/2 text-sm sm:text-[16px] transition-all peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
            Email Address
          </label>
        </div>

        <button
          onClick={handleStepOne}
          disabled={loading}
          className="relative w-full mt-7 h-[44px] sm:h-[45px] rounded-full border-2 border-[#e46033] font-semibold overflow-hidden flex justify-center items-center"
        >
          {loading ? (
            <ClipLoader size={22} color="#e46033" />
          ) : (
            <>
              <span className="absolute inset-0 h-[300%] bg-gradient-to-b from-[#25252b] via-[#e46033] to-[#25252b] -top-full transition-all duration-500 hover:top-0"></span>
              <span className="relative z-[2] text-sm sm:text-base">Send OTP</span>
            </>
          )}
        </button>
      </>
    )}

    {/* STEP 2 */}
    {step === 2 && (
      <>
        <p className="text-center text-xs sm:text-sm text-gray-300 mb-6">
          Enter the OTP sent to{" "}
          <span className="text-[#e46033] break-all">{email}</span>
        </p>

        <div className="relative w-full h-[48px]">
          <input
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-sm sm:text-[16px] font-semibold focus:border-[#e46033]"
          />
          <label className="absolute left-0 top-1/2 -translate-y-1/2 text-sm sm:text-[16px] transition-all peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
            Enter OTP
          </label>
        </div>

        <button
          onClick={handleStepTwo}
          disabled={loading}
          className="relative w-full mt-7 h-[44px] sm:h-[45px] rounded-full border-2 border-[#e46033] font-semibold overflow-hidden flex justify-center items-center"
        >
          {loading ? (
            <ClipLoader size={22} color="#e46033" />
          ) : (
            <>
              <span className="absolute inset-0 h-[300%] bg-gradient-to-b from-[#25252b] via-[#e46033] to-[#25252b] -top-full transition-all duration-500 hover:top-0"></span>
              <span className="relative z-[2] text-sm sm:text-base">Verify OTP</span>
            </>
          )}
        </button>
      </>
    )}

    {/* STEP 3 */}
    {step === 3 && (
      <>
        <p className="text-center text-xs sm:text-sm text-gray-300 mb-6">
          Set your new password.
        </p>

        {/* New Password */}
        <div className="relative w-full h-[48px] mb-5">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-sm sm:text-[16px] font-semibold pr-10 focus:border-[#e46033]"
          />
          <label className="absolute left-0 top-1/2 -translate-y-1/2 text-sm sm:text-[16px] transition-all peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
            New Password
          </label>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xl"
          >
            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative w-full h-[48px]">
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="peer w-full h-full bg-transparent border-b-2 border-white outline-none text-sm sm:text-[16px] font-semibold pr-10 focus:border-[#e46033]"
          />
          <label className="absolute left-0 top-1/2 -translate-y-1/2 text-sm sm:text-[16px] transition-all peer-focus:top-[-5px] peer-focus:text-[#e46033] peer-valid:top-[-5px] peer-valid:text-[#e46033]">
            Confirm Password
          </label>

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xl"
          >
            {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </button>
        </div>

        <button
          onClick={handleStepThree}
          disabled={loading}
          className="relative w-full mt-7 h-[44px] sm:h-[45px] rounded-full border-2 border-[#e46033] font-semibold overflow-hidden flex justify-center items-center"
        >
          {loading ? (
            <ClipLoader size={22} color="#e46033" />
          ) : (
            <>
              <span className="absolute inset-0 h-[300%] bg-gradient-to-b from-[#25252b] via-[#e46033] to-[#25252b] -top-full transition-all duration-500 hover:top-0"></span>
              <span className="relative z-[2] text-sm sm:text-base">Reset Password</span>
            </>
          )}
        </button>
      </>
    )}

    {message && (
      <p className="text-center mt-4 text-[#e46033] font-medium text-sm">
        {message}
      </p>
    )}
  </div>
</div>

  );
};

export default ForgotPassword;
