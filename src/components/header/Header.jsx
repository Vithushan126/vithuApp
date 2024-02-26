import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { notification } from "antd";
import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hidenLinks/HidenLinks";

const logo = (
  <div className="font-bold text-white text-4xl">
    <Link to="/">
      <h2 className="">
        v<span className="text-orange-700">Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className=" text-white p-5 flex flex-row">
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        isActive ? "relative text-red-500 p-5 underline" : "p-5"
      }
    >
      Cart
      {/* <CheckCircleOutlined style={{ fontSize: "10px", color: "red" }} /> */}
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");

  //Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          console.log(u1);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, []);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        notification.success({
          message: "Logout Successful...",
        });
        navigate("/");
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        });
      });
  };

  return (
    <header className="bg-blue-950 w-full">
      <div className="w-full h-32 max-w-screen-lg mx-auto px-4 flex justify-between items-center relative">
        {logo}
        <nav className="w-3/4 flex justify-between ">
          <ul className="flex  items-center  list-none text-white    ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "relative text-red-500 p-5 underline" : "p-5"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "relative text-red-500 p-5 underline" : "p-5"
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="flex  items-center">
            <span className=" text-white  ">
              <ShowOnLogout>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "relative text-red-500 p-5 underline" : "p-5"
                  }
                >
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home">
                  <UserOutlined /> Hi, {displayName}
                </a>
              </ShowOnLogin>
              {/* <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "relative text-red-500 p-5 underline" : "p-5"
                }
              >
                Register
              </NavLink> */}
              <ShowOnLogin>
                <NavLink
                  to="/order-history"
                  className={({ isActive }) =>
                    isActive ? "relative text-red-500 p-5 underline" : "p-5"
                  }
                >
                  My Order
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className="hidden">
          {cart}
          <HiOutlineMenuAlt3 size={28} className="text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
