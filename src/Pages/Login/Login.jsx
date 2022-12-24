import React, { useState } from "react";
import { MdImage, MdLock, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Login.scss";
const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);

  const clickandler = () => {
    const data = {
      username: username,
      pass: pass,
      isremeber: remember,
    };
    console.log(data);
  };

  return (
    <div className="Login">
      <div className="loginwrapper">
        <div className="logo">
          <MdImage></MdImage>
        </div>
        <div className="forms">
          <div className="input-group ">
            <span className="input-group-text">
              <MdPerson></MdPerson>
            </span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="input-group ">
            <span className="input-group-text">
              <MdLock></MdLock>
            </span>{" "}
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="buttons">
          <div className="top">
            {" "}
            <label className="custom-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setRemember(!remember)}
                className="custom-control-input"
              />
              <span className="custom-control-indicator">Remember me</span>
            </label>
            <Link to={"/forget-password"}>Forget Password</Link>
          </div>
          <div className="bottom">
            <button className="login btn" onClick={clickandler}>
              Login
            </button>

            <p className="signup">
              don't have account? <Link to={"/signup"}>sign up</Link>
            </p>
            <p className="signup">
              <Link to={"/"}>Return To Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
