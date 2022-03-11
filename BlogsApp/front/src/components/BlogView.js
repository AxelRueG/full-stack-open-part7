import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'
import UserInfoHeader from './UserInfoHeader'
import services from '../services/blogs'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const Comments = ({ blog_id }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    services.getComments(blog_id).then((response) => setComments(response))
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await services.addComment({ id: blog_id, content: newComment })
    setComments(comments.concat(response))
    setNewComment('')
  }

  return (
    <>
      <Form className='d-grid' style={{ maxWidth: '500px' }} onSubmit={handleSubmit} >
        <Form.Group>
          <Form.Label>new comment</Form.Label>
          <Form.Control value={newComment} onChange={e => setNewComment(e.target.value)} type='text'/>
        </Form.Group>
        <Button className='mt-2' type='submit'>add</Button>
      </Form>
      <h3  className='mt-3'>comments</h3>
      <ListGroup variant='flush'>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

const BlogView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((elem) => elem.id === id)
  )

  const like = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <>
      <UserInfoHeader />
      <div className="mt-2">
        <h2>{blog.title}</h2>
        <p>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </p>
        <span>{blog.likes}</span> likes {' '}
        <Button size="sm" onClick={like}>like</Button>
        <p>added by {blog.author}</p>
        <hr/>
        <Comments blog_id={blog.id} />
      </div>
    </>
  )
}

export default BlogView
