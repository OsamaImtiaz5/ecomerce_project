import React from "react";
import { Link, Navigate,  } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = () => {
  // const auth = localStorage.getItem("users");
  const auth = Cookies.get("user");
  const logout = () => {
    // localStorage.clear();
    Cookies.remove("user");

    Navigate("/login");
  };

  return (
    <div>
      <div className="header-nav">
        {auth ? (
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
            </li>
            <li>
              <Link to="/update">Update Products</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  logout();
                }}
                to="/signup"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul style={{ textAlign: "right" }}>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Nav;
