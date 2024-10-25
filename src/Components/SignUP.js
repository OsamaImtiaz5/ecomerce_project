import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // const auth = localStorage.getItem("users");
    const auth = Cookies.get("user")
    if (auth) {
      navigate("/");
    }
  });
  const collecdata = async () => {
    // let result = await fetch("http://localhost:8000/api/register", {
    //   method: "POST",
    //   body: JSON.stringify({ name, email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // result = await result.json();
    // localStorage.setItem("users", JSON.stringify(result));
    // console.warn(result);
    // navigate("/");

    axios
      .post(
        "http://localhost:8000/api/user/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const result = response.data;
        // localStorage.setItem("users", JSON.stringify(result));
        Cookies.set("user", result.token, {
          expires: 7,
        });
        console.warn(result);
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1>Sign Up</h1>
      <div>
        <p>Name:</p>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>Email:</p>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <p>Password:</p>
        <input
          className="inputBox"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        type="button"
        onClick={async () => {
          await collecdata();
        }}
        style={{
          backgroundColor: "skyblue",
          width: "200px",
          padding: "10px",
          margin: "5px",
        }}
      >
        Sign Up
      </button>

      {/* <Outlet/> */}
    </div>
  );
};

export default SignUP;
