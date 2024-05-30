import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { ThreeCircles } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Button, Form, InputGroup } from 'react-bootstrap';
import './index.css'

const Register = ({ showLoginHandler }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [image, setImage] = useState("")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState(""); // Initialize confirmpassword state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrMsge, setShowErrMesge] = useState(false);

  const checkPassConfirm = () => {
    // Check if password and its confirmation match
    if (password !== confirmpassword) {
      setShowErrMesge(true); // Show error message if passwords don't match
    } else {
      setShowErrMesge(false); // Hide error message if passwords match
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email ||  !password ) {
      setError("Please fill in all the fields"); // Set error message
      return; // Stop form submission
  }
    checkPassConfirm()
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email,  password, confirmpassword}),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
        // Store username and email in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        

        alert("Vendor registered successfully");
        // localStorage.setItem()
        navigate("/login"); // Redirect to login page using navigate
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-section">
       
      {loading && (
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Hi, Your Registration under process</p>
        </div>
      )}
      {!loading && (
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          <h3>Vendor Register</h3>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter your name"
          />
          
          <br />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
          />
          <br />
          

          <label>Password:</label>
          <div className="passBox">
            <InputGroup >
              <Form.Control className='show-password' type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password*' />
              <Button className='eyeBtn' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </div>         
          <br />
          <label>Confirm Password:</label>
          <div className="passBox">
            <InputGroup >
              <Form.Control className='show-password' type={showPassword ? "text" : "password"} value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} placeholder='Password*' />
              <Button className='eyeBtn' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </div>         
          <br />
          {error && <p style={{color:'red'}}>{error}</p>}
          <div className="btnSubmit">
            <button className="button" type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
