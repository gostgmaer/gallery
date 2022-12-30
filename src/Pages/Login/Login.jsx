import React, { Fragment, useState } from "react";
import { MdImage, MdLock, MdPerson } from "react-icons/md";
import {
  Link,
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../Utils/Context/AuthContext";
import "./Login.scss";
const Login = () => {
  const { signin, currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const clickandler = async () => {
    const data = {
      username: username,
      pass: pass,
      isremeber: remember,
    };
    console.log(data);
    try {
      setLoading(true);
      setError("");
      await signin(username, pass);
      navigate(redirectPath, { replace: true });
    } catch (e) {
      setError("Login Failed");
      console.log(error);
    }
    setLoading(false);
  };

  const LoginFailed = () => {
    return (
      <Fragment>
        <div className="loginFail">
          <p>{error}</p>
         
          <button
            disabled={loading}
            className="login btn"
            onClick={() => setError(null)}>
            Try Again
          </button>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="Login">
      <div className="loginwrapper">
     {error? <LoginFailed></LoginFailed>:   <Fragment>
        
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
            <button
              disabled={loading}
              className="login btn"
              onClick={clickandler}>
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
      </Fragment>}

     
      </div>
    </div>
  );
};

export default Login;
