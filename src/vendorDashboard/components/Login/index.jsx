import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';
import './index.css';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Form, InputGroup } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('vendorId', data.vendorId);

        // Fetch vendor details to get the firmId
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${data.vendorId}`);
        const vendorData = await vendorResponse.json();

        console.log("Vendor Data:", vendorData); // Logging vendorData

        if (vendorResponse.ok) {
          const vendorFirmId = vendorData.vendorFirmId;
          if (vendorFirmId === null) {
            navigate('/add-firm')
            window.location.reload();
          }
          const vendorFirmName = vendorData.vendor.firm[0].firmName;
          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('firmName', vendorFirmName)
          navigate('/')
          window.location.reload();

        } else {
          setErrorMessage(vendorData.error || "Failed to retrieve vendor details");
        }
      } else {
        setErrorMessage(data.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div className="login-section">
      {loading ? (
        <div className="loader-section">
          <ThreeCircles visible={loading} height={100} width={100} color="#4fa94d" />
          <p>Login in process... Please wait</p>
        </div>
      ) : (
        <form className='auth-form' onSubmit={loginHandler} autoComplete='off'>
          <h3>Vendor Login</h3>
          <label>Email:</label>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email*' /><br />
          <label>Password:</label>
          <div className="passBox">
            <InputGroup className='show-password'>
              <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password*' />
              <Button className='eye-btn' onClick={handleShowPassword}>
                <div className='eye-btn'>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </Button>
            </InputGroup>
          </div>
          {errorMessage && <p className="errMsg">{errorMessage}</p>}
          <div className="btnSubmit">
            <button className='button' type='submit'>Submit</button>
          </div>
          <div className="advise">
            <p>If you are not registered?</p>
            <button type="button" onClick={registerHandler}>Register</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
