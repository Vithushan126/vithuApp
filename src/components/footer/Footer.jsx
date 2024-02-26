import React from "react";
import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const Year = date.getFullYear();
  return (
    <>
      <div className="bg-blue-950 w-full h-20 text-white flex justify-center items-center">
        &copy; {Year} All Rights Reserved V.Vithushan
      </div>
    </>
  );
};

export default Footer;
