import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'
import UserInfoHeader from './UserInfoHeader'

const BlogView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(elem => elem.id === id))

  const like = () => {
    dispatch(likeBlog(blog))
  }

  return (<>
    <UserInfoHeader />
    <h2>{blog.title}</h2>
    <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
    <p>
      <span>{blog.likes}</span> likes
      <button onClick={like}>like</button>
    </p>
    <p>added by {blog.author}</p>
  </>)
}

export default BlogView