import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // const auth = localStorage.getItem("users");

    const auth = Cookies.get("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log("Clicked login");
    try {
      const result = await fetch(`${process.env.baseurl}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

     const  user = await result.json();
      //  const  token= result.token;
        console.log("user data " , user);

      console.log("result login " , result);
      // if (result.name) {
      // localStorage.setItem("users", JSON.stringify(result));
      if (user.token) {
        Cookies.set("user", user.token, {
          expires: 7,
        });
        console.warn(result);
        navigate("/");
      } else {
        alert("Please enter correct details or Signup");
      }
    } catch (error) {
      console.log(error);
    }
navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: "80px",
        justifyContent: "center",
        alignItems: "center",
        //  textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <p>Email</p>
        <input
          className="inputBox"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <p>Password</p>
        <input
          className="inputBox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        style={{
          justifyContent: " center",
          alignItems: "center",
          display: "flex",
          marginLeft: "175px",
        }}
      >
        <button
          type="button"
          style={{
            alignSelf: "center",
            backgroundColor: "skyblue",
            width: "200px",
            padding: "10px",
            // marginLeft: "60px",
          }}
          onClick={async () => {
            await handleLogin(); // Function call is valid here
          }}
        >
          Log In
        </button>
      </div>
      <div
        style={{
          justifyContent: " center",
          alignItems: "center",
          display: "flex",
          marginTop:"20px",
          marginLeft: "175px",
        }}
      >
        <Link to="/emailotp">Reset Passwords</Link>
      </div>
    </div>
  );
};

export default Login;
