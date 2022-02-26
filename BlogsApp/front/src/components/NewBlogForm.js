import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleAddBlog } from '../reducers/blogsReducer'
import { setNewNotification } from '../reducers/notificationReducer'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (blog) => {
    try {
      dispatch(handleAddBlog(blog))
      props.toRef.current.toggleVisibility()
      dispatch(setNewNotification(`a new blog ${blog.title} by ${blog.author} added`))
    }
    catch (e) {
      dispatch(setNewNotification(`the blog ${blog.title} by ${blog.author} can't be added`))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitle = (e) => setTitle(e.target.value)
  const handleAuthor = (e) => setAuthor(e.target.value)
  const handleUrl = (e) => setUrl(e.target.value)

  return (
    <div>
      <h3>create new</h3>
      <form>
        <div>
					title: <input id='title' type="text" value={title} onChange={handleTitle} />
        </div>
        <div>
					author: <input id='author' type="text" value={author} onChange={handleAuthor} />
        </div>
        <div>
					url: <input id='url' type="text" value={url} onChange={handleUrl} />
        </div>
        <button id='submit' onClick={handleSubmit}>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
