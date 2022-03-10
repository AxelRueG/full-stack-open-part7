import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import Button from 'react-bootstrap/Button'

const Logout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logoutUser())

  return <Button variant='warning' onClick={handleLogout}>logout</Button>
}

export default Logout