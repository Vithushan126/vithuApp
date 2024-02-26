import React, { useState } from "react";
import RegisterImage from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { Spin, notification } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      notification.error({
        message: "Passwords do not match.",
      });
      return; // Stop further execution
    } else {
      setLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          setLoading(false);
          notification.success({
            message: "Registation Successful...",
          });
          navigate("/login");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          notification.error({
            message: error.message,
          });
          setLoading(false);
        });
    }
  };

  return (
    <>
      {loading && <Spin size="large" />}
      <div className="flex ">
        <div className="w-1/2  flex flex-col justify-center items-end ">
          <div className="shadow-2xl  p-4 rounded-md">
            <h1 className="text-red-800 text-3xl flex justify-items-center">
              Register
            </h1>
            <div className="mt-4 ">
              <form onSubmit={registerUser} className="flex flex-col ">
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
                <input
                  type="password"
                  placeholder="Conform Password"
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                  required
                  className="mb-2 p-2 border rounded-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white rounded-sm p-1"
                >
                  Register
                </button>
              </form>
              <span className="">
                <p>
                  Already an account? <Link to="/login">Login</Link>
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-start">
          <img src={RegisterImage} alt="register/png" className="h-96 " />
        </div>
      </div>
    </>
  );
};

export default Register;
