import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {
  const blogs = useSelector(state => state.blogs)

  return blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      userId={props.uId}
    />
  ))
}

export default Blogs