import React, { Fragment, useState } from "react";
import { MdAddLink, MdImage, MdLock, MdMail, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Context/AuthContext";
import "./signup.scss";

const Signup = () => {
  const { signup, currentUser } = useAuth();
  const [confirmPass, setConfirmPass] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupHandler = async () => {
    const data = {
      cpass: confirmPass,
      pass: pass,
      email: email,
    };
    if (pass !== confirmPass) {
      setError("password not match");
    } else {
      try {
        setLoading(true);
        setError("");
        await signup(email, pass);
      } catch (e) {
        setError("Faild to Signup Your Account");
      }
    }

    console.log(data);
    setLoading(false);
  };

  return (
    <div className="Signup">
      <div className="Signupwrapper">
        <div className="logo">
          <MdImage></MdImage>
          {currentUser?.email}
          {error && <label>{error}</label>}
        </div>
        <Fragment>
          <div className="forms">
            <div className="input-group ">
              <span className="input-group-text">
                <MdMail></MdMail>
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="input-group ">
              <span className="input-group-text">
                <MdLock></MdLock>
              </span>
              <input
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="input-group ">
              <span className="input-group-text">
                <MdLock></MdLock>
              </span>
              <input
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="buttons">
            <div className="top"></div>
            <div className="bottom">
              <button
                disabled={loading}
                className="login btn"
                onClick={signupHandler}>
                Sign up
              </button>

              <p className="signup">
                have account? <Link to={"/login"}>sign in</Link>
              </p>
              <p className="signup">
                <Link to={"/"}>Return To Home</Link>
              </p>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default Signup;
