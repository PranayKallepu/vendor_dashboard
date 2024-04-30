import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({showLoginHandler,showRegisterHandler, showLogout, logoutHandler}) => {
    const firmName = localStorage.getItem('firmName')
    return (
        <div className="navSection">
            <div>
                    <Link to="/" className="company">
                    <img  className='image-logo' src="https://vectorified.com/images/vendor-icon-png-16.png" alt="logo" />
                    <p >Dashboard</p>
                    </Link>
            </div>
            <div>
                <div className="firm-name">
                    <h4>FirnName: {firmName} </h4>
                </div>
            </div>
            <div className="userAuth">
                {!showLogout ?
                <>
                    <span className='span-button' onClick={showLoginHandler}>Login / </span>
                    <span className='span-button' onClick={showRegisterHandler}>Register</span>
                </> :
                <span className='span-button' onClick={logoutHandler}>Logout</span> }
                
            </div>
        </div>
    )
}

export default Navbar
