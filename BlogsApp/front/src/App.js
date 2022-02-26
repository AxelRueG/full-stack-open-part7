import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Message from './components/Message'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import { loadBlogs } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const togglableRef = useRef()

  useEffect(() => {
    dispatch(loadBlogs())
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      const User = JSON.parse(userData)
      setUser(User)
      blogService.setToken(User.token)
    }
  }, [])

  const handleUser = (User) => {
    setUser(User)
    window.localStorage.setItem('userData', JSON.stringify(User))
    blogService.setToken(User.token)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload(false)
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user ? (
        <LoginForm handleUser={handleUser} />
      ) : (
        <div>
          <p>{user.username}</p>
          {message && <Message message={message} />}
          <Togglable ref={togglableRef} buttonLabel="add new blog">
            <NewBlogForm toRef={togglableRef} />
          </Togglable>
          <Blogs uId={ user.id } />
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

    </div>
  )
}

export default App
