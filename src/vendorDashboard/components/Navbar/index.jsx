import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import { ColorRing } from "react-loader-spinner";
import "./index.css";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook



const NavBar = () => {
  const navigate = useNavigate(); 
  const [username, setUserName] = useState('');
  const [sidebar, setSidebar] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hideAddFirm, setHideAddFirm] = useState(false);


  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogOut(true);
      setShowWelcome(true);
      setShowFirmTitle(true)
    }
  }, []);

useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUserName(username);
    }else{
      setShowFirmTitle(false)
    }
}, []);

useEffect(() => {
    const firmId = localStorage.getItem("firmId");
    if (!firmId) {
      setHideAddFirm(false);
    }
}, []);


  const logOutHandler = () => {
    if (window.confirm("Are you sure to logout?")) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmName");
      localStorage.removeItem("userName");
      setShowWelcome(false);
      setShowFirmTitle(false);
      setShowLogOut(false);
    }
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    // setShowLogOut(true)
    setShowRegister(false);
    setShowWelcome(true);
    
    // navigate('/home')
    
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowWelcome(true)
    
    
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="navbar">
        {showWelcome && 
          <div>
          <IconContext.Provider value={{ color: "fff" }}>
            <div className="nabar">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={toggleSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={toggleSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>

                {hideAddFirm ?


                <>
                  {Sidebar.map((item, index) => (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="span">{item.title}</span>
                    </Link>
                  </li>
                ))}
                </> :
                <>
                  <li key='4' className='nav-text'>
                    <Link to='/add-firm'>
                      <span className="span">Add Firm</span>
                    </Link>
                  </li>
                  {Sidebar.map((item, index) => (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="span">{item.title}</span>
                    </Link>
                  </li>
                ))}
                </>
                }
              
              </ul>
            </nav>
          </IconContext.Provider>
        </div>
        }
        <div className="firmName">
          {showFirmTitle ? <h4> {username}</h4> : <h2>Dashboard</h2> }
          
        </div>
        <div className="userAuth">
          {!showLogOut ? (
            <>
              <Link to="/login">
                <span   className='userAuth-span' onClick={showLoginHandler}>Login /</span>
              </Link>
              <Link to="/register">
                <span className='userAuth-span' onClick={showRegisterHandler}>Register</span>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <span className='userAuth-span' onClick={logOutHandler} value="logout">
              Logout
            </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
