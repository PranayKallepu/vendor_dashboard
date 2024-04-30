import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async(e)=>{
      e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/vendor/login`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        })

        const data = await response.json();
        if(response.ok){
          alert("Login Success")
          setEmail("");
          setPassword("");
          localStorage.setItem('loginToken', data.token)
          showWelcomeHandler()
        }
        const vendorId = data.vendorId
        console.log("vendorID",vendorId)
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
        const vendorData = await vendorResponse.json();
        console.log("vendorFirmID", vendorData.vendorFirmId)
        if(vendorResponse.ok){
            const vendorFirmId = vendorData.vendorFirmId;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            // console.log("My Firm name is", vendorFirmName)
            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorFirmName)
            window.location.reload()
        }
      } catch (error) {
        alert("Login Fail")

      }
  }

  return (
    <div className="loginSection">
        <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3> 
            <label>Email</label> 
            <input type='text' name='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='enter email' /> <br/>
            <label>Password</label> 
            <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='enter Password' /> <br/>
            <div >
          <button type="submit" className="btnSubmit">Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Login
