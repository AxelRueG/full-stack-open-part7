import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import services from '../services/blogs'
import Logout from './Logout'

const Header = () => {
  const user = useSelector(state => state.user)

  if (user)
    return <>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      <Logout />
    </>
  else return null
}

const UsersData = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    services
      .getAllUsers()
      .then((response) => setUsers(response))
      .catch((e) => console.log(e))
  }, [])

  return <div>
    <Header />
    <h2>Users</h2>
    { users.map(user => <p key={user.id}>{user.name} {user.blogs.length}</p>) }
  </div>
}

export default UsersData
