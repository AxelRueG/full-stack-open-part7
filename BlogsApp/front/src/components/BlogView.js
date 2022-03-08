import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogsReducer'
import UserInfoHeader from './UserInfoHeader'
import services from '../services/blogs'

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
      <h3>comments</h3>
      <form onSubmit={handleSubmit} >
        <input value={newComment} onChange={e => setNewComment(e.target.value)} type='text'/>
        <input type='submit' value='add comment' />
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
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
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p>
        <span>{blog.likes}</span> likes
        <button onClick={like}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <Comments blog_id={blog.id} />
    </>
  )
}

export default BlogView
