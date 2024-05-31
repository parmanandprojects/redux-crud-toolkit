import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserList from '../pages/user/UserList'
import AddUser from '../pages/user/AddUser'

const PublicRoutes = () => {

  return (<>
  <Routes>
    <Route  path="/" element={<UserList/>}     />
    <Route  path="/add" element={<AddUser/>}     />
  </Routes>
  
  </>
  )
}

export default PublicRoutes