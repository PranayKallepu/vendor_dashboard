import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/forms/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllproducts] = useState(false);
  const [showLogout, setshowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setshowLogout(true);
    }
  }, []);

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])

  const logoutHandler =()=>{
    confirm('Are you sure to Logout?')
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setshowLogout(false)
    setShowAllproducts(false)
    setShowFirmTitle(true)
  }

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllproducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllproducts(false);
  };

  const showFirmHandler = () => {
    if(showLogout){
      setShowFirm(true);
      setShowProduct(false);
      setShowLogin(false);
      setShowRegister(false);
      setShowWelcome(false);
      setShowAllproducts(false);
    }else{
      alert('Please Login!')
      setShowLogin(true)
    }
    
  };

  const showProductHandler = () => {
    if(showLogout){
      setShowProduct(true);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(false);
    setShowAllproducts(false);
    }else{
      alert('Please Login!')
      setShowLogin(true)
    }
    
  };

  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAllproducts(false);
  };

  const showAllProductsHandler = () => {
    if(showLogout){
      setShowWelcome(false);
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAllproducts(true);
    }else{
      alert('Please Login!')
      setShowLogin(true)
    }
    
  };

  return (
    <>
      <section className="landingSection">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}

          {showFirm && showLogout &&  <AddFirm />}
          {showProduct && showLogout &&  <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout &&  <AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
