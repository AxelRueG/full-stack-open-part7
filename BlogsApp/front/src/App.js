import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import UsersData from './components/UsersData'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadBlogs } from './reducers/blogsReducer'
import { userLoged } from './reducers/userReducer'
import { loadAllUsers } from './reducers/usersReducer'
import UserBlogsList from './components/UserBlogsList'
import BlogView from './components/BlogView'
import HomePage from './components/HomePage'
import Container from 'react-bootstrap/Container'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBlogs())
    dispatch(loadAllUsers())
  }, [])
  useEffect(() => dispatch(userLoged()), [])

  return (<Container>
    <h1>blogs</h1>
    <Router>
      <Routes>
        <Route
          path="/blogs/:id"
          element={user ? <BlogView /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/:id"
          element={user ? <UserBlogsList /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <UsersData /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  </Container>)
}
export default App
