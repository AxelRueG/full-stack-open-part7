import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteBlog, likeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'


const blogStyle = {
  border: '1px solid black',
  borderRadius: '10px',
  margin: '5px',
  paddingLeft: '10px',
  paddingBottom: '10px'
}

const buttonStyle = {
  backgroundColor: '#4d4dff',
}

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleShow = () => setShowMore(!showMore)

  const handleLike = () => dispatch(likeBlog(blog))

  const handleDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      dispatch(handleDeleteBlog(blog))
    }
  }

  return (
    <div style={blogStyle} className="Blog">
      <Link to={`/blogs/${blog.id}`}>
        <p>{blog.title} - {blog.author}</p>
      </Link>
      <button onClick={handleShow}> {showMore ? 'hide' : 'view'} </button>
      {showMore && (
        <>
          <p>{blog.url}</p>
          <div>
            likes: <span className='likesNum'>{blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <p>{blog.user.name}</p>
          { user.id === blog.user.id &&
            <button style={buttonStyle} onClick={handleDelete}>delete</button>
          }
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
}

export default Blog
