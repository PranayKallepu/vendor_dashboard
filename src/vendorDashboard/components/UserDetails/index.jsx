import React from 'react'
import { Navigate } from 'react-router-dom';

import './style.css'

export const UserDetails = () => {
  const userImage = localStorage.getItem('userImage');
  const username = localStorage.getItem('username');
  const firmName = localStorage.getItem('firmName');
  const gmail = localStorage.getItem('email');
  const mobile = localStorage.getItem('mobile');
  const address = localStorage.getItem('address')
  const password = localStorage.getItem('password');

  const jwtToken = localStorage.getItem('loginToken');

  if (!jwtToken) {
    return <Navigate to='/login' />
  }

  return (
    <div className="user-details-section">
      <div className="user-image">
        {userImage ?<> <img src={userImage} className='user-image' alt='user' /> 
        <h2>Name</h2>
        </>:
        <>
          <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png' className='user-image' alt='user' />
         <h2 style={{textAlign:'center'}}>{username}</h2> 
         </>}
      </div>
      <ul>
        <li>Restaurant Name: {firmName}</li>
        <li>Gmail: {gmail}</li>
        <li>Address: {address}</li>
      </ul>
    </div>
  )
}
