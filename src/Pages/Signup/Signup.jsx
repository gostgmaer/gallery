import React, { useState } from 'react'
import { MdAddLink, MdImage, MdLock, MdMail, MdPerson } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './signup.scss'


const Signup = () => {

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  const clickandler = () => {
    const data = {
      username: username,
      pass: pass,
      isremeber: email,
    };
    console.log(data);
  };

  return (
    <div className='Signup'>
       <div className="Signupwrapper">
        <div className="logo">
          <MdImage></MdImage>
        </div>
        <div className="forms">
        <div className="input-group ">
            <span className="input-group-text">
             <MdAddLink></MdAddLink>
            </span>
            <input
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              type="text"
              className="form-control"
              placeholder="full name"
            />
          </div>
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
           
          </div>
          <div className="bottom">
            <button className="login btn" onClick={clickandler}>
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
      </div>
    </div>
  )
}

export default Signup