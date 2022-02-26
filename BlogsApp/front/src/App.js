import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Message from './components/Message'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import { loadBlogs } from './reducers/blogsReducer'
import { logoutUser, userLoged } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const message = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const togglableRef = useRef()

  useEffect(() => dispatch(loadBlogs()), [])
  useEffect(() => dispatch(userLoged()), [])

  const handleLogout = () => dispatch(logoutUser())

  return (
    <div>
      <h2>blogs</h2>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <p>{user.username}</p>
          {message && <Message message={message} />}
          <Togglable ref={togglableRef} buttonLabel="add new blog">
            <NewBlogForm toRef={togglableRef} />
          </Togglable>
          <Blogs />
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default App
