import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = location.state?.email;

  const verifyPassword = async () => {
    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          `${process.env.baseurl}/api/user/update_password`,
          {
            email,
            password,
          }
        );
        if (response.status === 200) {
          navigate("/login");
        } else {
          console.log("Backend error");
        }
      } catch (error) {
        console.error("There was an error updating the password!", error);
      }
    } else {
      alert("Your passwords do not match");
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button onClick={verifyPassword}>Confirm Password</button>
      </div>
    </div>
  );
};

export default ChangePassword;
