import React from "react";
import "./index.css";

const Home = () => {
  const userName = localStorage.getItem('firmName');
  const jwtToken = localStorage.getItem('loginToken');

  return (
    <div className="welcome-section">
      {jwtToken ?
        <>
          <h3>Welcome to {userName}</h3>
          <div className="landing-image">
            <img
              src="https://img.freepik.com/premium-vector/smiling-chef-cartoon-character_8250-10.jpg?w=740"
              alt="welcome"
            />
          </div>
          <div className="suggest-sec">
            <h4 className="message">Add your Restaurant Details & Products </h4> <br />      
          </div>
        </> :
        <>
          <h3>Welcome To Vendor Dashboard</h3>
          <div className="landing-image">
            <img
              src="https://img.freepik.com/premium-vector/smiling-chef-cartoon-character_8250-10.jpg?w=740"
              alt="welcome"
            />
          </div>
          <div className="suggest-sec">
            <h4 className="message">If you want to Add Restauarnt in MealMOB Food Delivery Website</h4>
            
          </div>
        </>}


    </div>
  );
}

export default Home;
