import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import UserInfoHeader from './UserInfoHeader'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import Message from './Message'
import Blogs from './Blogs'

const HomePage = () => {
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.notification)
  const togglableRef = useRef()

  // controlamos que este iniciado
  if (!user) return null

  return (
    <div>
      <UserInfoHeader />
      {message && <Message message={message} />}
      <Togglable ref={togglableRef} buttonLabel="add new blog">
        <NewBlogForm toRef={togglableRef} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default HomePage