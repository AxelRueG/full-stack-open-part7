import React from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'

const UserInfoHeader = () => {
  const user = useSelector(state => state.user)

  if (user)
    return <>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      <Logout />
    </>

  return null
}

export default UserInfoHeader