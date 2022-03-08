import React from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { NavLink } from 'react-router-dom'

const ss = {
  borderRadius: '10px',
  backgroundColor: '#bbb',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '16px',
  marginBottom: '16px',
}

const links = {
  marginRight: '10px'
}

const UserInfoHeader = () => {
  const user = useSelector(state => state.user)

  if (!user) return null

  return (
    <div style={ss}>
      <NavLink style={links} to="/">blogs</NavLink><br/>
      <NavLink style={links} to="/users">users</NavLink>
      <p style={links}>{user.name} is logged in</p>
      <Logout />
    </div>
  )

}

export default UserInfoHeader