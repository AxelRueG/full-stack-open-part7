import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteBlog, likeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

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
    <Card className='mt-3'>
      <Card.Body className='d-grid gap-2'>
        <div>
          <Link to={`/blogs/${blog.id}`}>
            <p>{blog.title} - {blog.author}</p>
          </Link>
          {showMore && (
            <div className="d-grid gap-2">
              <div>
                <em>URL:</em> { blog.url }<br/>
                <em>author:</em> { blog.user.name } <br/>
                <em>likes:</em> {blog.likes} {' '}
                <Button varinat='secondary' onClick={handleLike}>like</Button>
              </div>
              { user.id === blog.user.id &&
              <Button variant="outline-danger" onClick={handleDelete}>delete</Button>
              }
            </div>
          )}
        </div>
        <Button variant="outline-primary" onClick={handleShow}> {showMore ? 'hide' : 'view'} </Button>
      </Card.Body>
    </Card>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
}

export default Blog
