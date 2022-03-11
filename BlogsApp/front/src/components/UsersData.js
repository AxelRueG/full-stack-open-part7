import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserInfoHeader from './UserInfoHeader'

import Table from 'react-bootstrap/Table'

const UsersData = () => {
  const users = useSelector((state) => state.users)

  return (
    <>
      <UserInfoHeader />
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UsersData
