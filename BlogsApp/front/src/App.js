import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Message from './components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { setNewNotification } from './reducers/notificationReducer'
import { handleAddBlog, handleDeleteBlog, likeBlog, loadBlogs } from './reducers/blogsReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(true)

  const blogs = useSelector(state => state.blogs)
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

  const addBlog = (blog) => {
    try {
      dispatch(handleAddBlog(blog))
      togglableRef.current.toggleVisibility()
      dispatch(setNewNotification(`a new blog ${blog.title} by ${blog.author} added`))
      setStatus(true)
    }
    catch (e) {
      dispatch(setNewNotification(`the blog ${blog.title} by ${blog.author} can't be added`))
      setStatus(false)
    }
  }

  const updateBlog = (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = (blog) => {
    dispatch(handleDeleteBlog(blog))
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user ? (
        <LoginForm handleUser={handleUser} />
      ) : (
        <div>
          <p>{user.username}</p>
          {message && <Message message={message} status={status} />}
          <Togglable ref={togglableRef} buttonLabel="add new blog">
            <NewBlogForm setBlogs={addBlog}/>
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              userId={user.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

    </div>
  )
}

export default App
