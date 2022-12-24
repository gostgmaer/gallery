import React, { useState } from "react";
import { MdImage, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import './ForgetPassword.scss'
const ForgetPassword = () => {
  const [emailaddress, setEmailaddress] = useState("");


  const clickpassHandler =()=>{
    console.log(emailaddress);
  }

  return (
    <div className="ForgetPassword">
      <div className="ForgetPasswordwrapper">
        <div className="logo">
          <MdImage></MdImage>
        </div>
        <div className="forms">
          <div className="input-group ">
            <span className="input-group-text">
              <MdPerson></MdPerson>
            </span>
            <input
              // @ts-ignore
              onChange={(e) => setEmailaddress(e.target.value)}
              // @ts-ignore
              value={emailaddress}
              type="text"
              className="form-control"
              placeholder="Email Address"
            />
          </div>
        </div>
        <div className="buttons">
          {/* <div className="top"></div> */}
          <div className="bottom">
            <button className="login btn" onClick={clickpassHandler}>
              Forget Password
            </button>
            <p className="signup">
              <Link to={"/"}>Return To Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
