import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GetOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    console.log(location?.state);
    if (location?.state) {
      const { email } = location?.state;
      setEmail(email);
    } else {
      // Navigate back to the email input page if state is not available
      navigate("/emailotp");
    }
  }, []);

  const verifyOtp = async () => {
    axios
      .post(`${process.env.baseurl}/api/user/verifyotp`, { email, otp })
      .then((response) => {
        if (response.status === 200) {
          navigate("/changepassword", { state: { email: email } });
          
        } else {
          console.error("Invalid OTP");
        }
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="X X X X"
        onChange={(e) => {
          setOtp(e.target.value);
        }}
      />
      <button onClick={verifyOtp}> Verify OTP</button>
    </div>
  );
};

export default GetOtp;
