import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserInfoHeader from './UserInfoHeader'

const UserBlogsList = () => {
  const { id } = useParams()

  const user = useSelector((state) =>
    state.users.find((elem) => elem.id === id)
  )

  if (user) {
    return (
      <>
        <UserInfoHeader />
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <ul>
          { user.blogs.map( blog => (
            <li key={blog.id}>
              {blog.title}
            </li>
          )) }
        </ul>
      </>
    )}

  return null
}

export default UserBlogsList
