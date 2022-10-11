import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{textAlign:"center"}}>
        <div>NotFound</div>
        <Link to='/login'>Login</Link>
    </div>
  )
}

export default NotFound