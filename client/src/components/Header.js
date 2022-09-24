import React from 'react'
import useData from '../hooks/useData'

const Header = () => {
  const {auth}=useData();
  //show Manage Interview,Candidate,Panel,Logout to admin and surrender and Logout button to tech or hr panel(use canditional rendering)
  //create state for storing user profile for that make backend api call which will return profile depend on accessToken
  return (
    <div>Header</div>
  )
}

export default Header