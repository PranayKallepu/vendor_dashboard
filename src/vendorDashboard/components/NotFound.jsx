import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <>
        <div className='errorSection'> 
            <Link to="/" style={{fontSize:"20px",color:"darkblue"}}>Go Back</Link>
            <h1>404</h1>
            <div>Page Not Found</div>
        </div>
    </>
  )
}

export default NotFound
