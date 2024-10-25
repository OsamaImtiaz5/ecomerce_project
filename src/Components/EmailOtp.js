import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const EmailOtp = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  // const emailOtp = () => {
  //   navigate("/getotp");
  // };

  const checkEmail = async () => {
    try {
      axios
        .post("http://localhost:8000/api/user/reset-mail", { email })
        .then((response) => {
          // const result = response.data;
          if (response.status === 200) {
            navigate("/getotp", { state: { email: email } });
          }
        });
      
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div>
      <div
        style={{
          justifyContent: " center",
          alignItems: "center",
          display: "flex",
          // marginLeft: "175px",
        }}
      >
        <p>Email</p>
        <input
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div
        style={{
          justifyContent: " center",
          alignItems: "center",
          display: "flex",
          marginLeft: "100px",
        }}
      >
        <button
          style={{
            width: "200px",
            backgroundColor: "skyblue",
            padding: "10px",
          }}
          type="submit"
          onClick={checkEmail}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmailOtp;
