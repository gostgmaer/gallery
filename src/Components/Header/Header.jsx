import React from 'react'
import './Header.scss'
import { MdPerson, MdSearch } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Utils/Context/Context'
const Header = () => {


    const { keyword,
        setkeyword,} =useGlobalContext()

    return (
        <header className='Header'>
            <div className="headerWrapper">
                <div className="left">
                    <Link to={'/login'}> <MdPerson></MdPerson> login </Link>
                </div>
                <Link to={'/'} className="logo">Image Gallery</Link>
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