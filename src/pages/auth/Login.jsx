import React, { useState } from "react";
import LoginImage from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { Spin, notification } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("loginUse", user);
        setLoading(false);
        notification.success({
          message: "Login Successful...",
        });
        navigate("/");
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        });
        setLoading(false);
      });
  };
  //Login with Google
  const provider = new GoogleAuthProvider();
  const sighInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("userLoginwithGoogle", user);
        notification.success({
          message: "Login Successful...",
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
    <>
      {loading && <Spin size="large" />}
      <div className="flex ">
        <div className="w-1/2 flex justify-end ">
          <img src={LoginImage} alt="login/png" className="h-96 " />
        </div>
        <div className="w-1/2  flex flex-col justify-center items-start ">
          <div className="shadow-2xl  p-4 rounded-md">
            <h1 className="text-red-800 text-3xl flex justify-items-center">
              Login
            </h1>
            <div className="mt-4 ">
              <form onSubmit={loginUser} className="flex flex-col ">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mb-2 p-2 border rounded-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mb-2 p-2 border rounded-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white rounded-sm p-1"
                >
                  Login
                </button>
                <div className="">
                  <Link to="/reset">Reset Password</Link>
                </div>
                <p className="text-center ">-- or --</p>
              </form>
              <button
                onClick={sighInWithGoogle}
                className="bg-orange-700 text-white rounded-sm w-full p-1 mb-2"
              >
                <GoogleOutlined className="" /> Login With Google
              </button>
              <span className="">
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
