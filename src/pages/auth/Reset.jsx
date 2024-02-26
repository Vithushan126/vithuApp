import React, { useState } from "react";
import ResetImage from "../../assets/forgot.png";
import { Link, useNavigate } from "react-router-dom";
import { Spin, notification } from "antd";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        notification.success({
          message: "Check your email for a reset link.",
        });
        setLoading(false);
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        });
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <Spin size="large" />}
      <div className="flex ">
        <div className="w-1/2 flex justify-end">
          <img src={ResetImage} alt="forgot/png" className="h-96 " />
        </div>
        <div className="w-1/2  flex flex-col justify-center items-start ">
          <div className="shadow-2xl  p-4 rounded-md">
            <h1 className="text-red-800 text-3xl flex justify-items-center">
              Reset Password
            </h1>
            <div className="mt-4 ">
              <form onSubmit={resetPassword} className="flex flex-col ">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mb-2 p-2 border rounded-sm"
                />

                <button
                  type="submit"
                  className="bg-blue-700 text-white rounded-sm p-1"
                >
                  Reset Password
                </button>
                <div className="flex justify-between">
                  <Link to="/login">- Login</Link>
                  <Link to="/register">- Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
