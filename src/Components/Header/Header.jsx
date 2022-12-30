import React, { useState } from 'react'
import './Header.scss'
import { MdClose, MdLogin, MdLogout, MdPerson, MdSearch } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../Utils/Context/Context'
import { useAuth } from '../../Utils/Context/AuthContext'

const Header = () => {
    const {currentUser,logout} = useAuth()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { keyword,
        setkeyword,} =useGlobalContext()

 const handleLogout = async()=>{
    try {
        setLoading(true);
        setError("");
       await logout()
        navigate('/login');
      } catch (e) {
        setError("logout Faild");
      }
      setLoading(false)
 }

    return (
        <header className='Header'>
            <div className="headerWrapper">
                <div className="left">
                   {currentUser === null ? <Link to={'/login'}> <MdLogin></MdLogin> login </Link>:
                    <div onClick={handleLogout} className='logout' > <MdLogout></MdLogout> <div>logout</div> </div>}
                </div>
                <div className="logo">
                <NavLink to={'/'}>Image Gallery</NavLink>
                </div>
                <div className="right">
                    <div className="input-group ">
                        <input onChange={(e)=>setkeyword(e.target.value)} value={keyword} type="text" className="form-control" placeholder="Search Images...." />
                        <span className="input-group-text"><MdSearch></MdSearch></span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header