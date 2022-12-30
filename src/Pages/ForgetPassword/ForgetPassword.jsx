import React, { useState } from "react";
import { MdImage, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Context/AuthContext";
import './ForgetPassword.scss'

const ForgetPassword = () => {
  const [emailaddress, setEmailaddress] = useState("");
  const [ispasswordSuccess, setIspasswordSuccess] = useState(false);
  const [, set] = useState();

  const {forgetPassword} =useAuth()

  const resetPasswordHandler =()=>{
    try {
      forgetPassword(emailaddress)
    setIspasswordSuccess(true)
    console.log(emailaddress);
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const AfterPassEmailSend =()=>{
   return <div className="ForgetPasswordwrapper">
    <div className="logo">
      <MdImage></MdImage>
      <div>Please Check Your Email for Password Reset Instructions</div>
    </div>
 
    <div className="buttons">
      {/* <div className="top"></div> */}
      <p className="login">
          <Link className="btn" to={"/login"}>Return To Signin</Link>
        </p>
    </div>
  </div>
  }

  return (
    <div className="ForgetPassword">
     {ispasswordSuccess?<AfterPassEmailSend></AfterPassEmailSend>: <div className="ForgetPasswordwrapper">
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
            <button className="login btn" onClick={resetPasswordHandler}>
              Forget Password
            </button>
            <p className="signup">
              <Link to={"/"}>Return To Home</Link>
            </p>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default ForgetPassword;
