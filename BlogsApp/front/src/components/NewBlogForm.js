import React from 'react'
import { useDispatch } from 'react-redux'
import { handleAddBlog } from '../reducers/blogsReducer'
import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NewBlogForm = (props) => {
  const title = useInput()
  const author = useInput()
  const url = useInput()

  const dispatch = useDispatch()

  const addBlog = (blog) => {
    const rCurrent = props.toRef.current
    dispatch(handleAddBlog(blog, rCurrent))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addBlog({ title: title.value, author: author.value, url: url.value })

    title.resetValue()
    author.resetValue()
    url.resetValue()
  }

  return (
    <div>
      <h3>create new</h3>
      <Form className='d-grid'>
        <Form.Group>
          <Form.Label>title: </Form.Label>
          <Form.Control id='title' type="text" value={title.value} onChange={title.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author: </Form.Label>
          <Form.Control id='author' type="text" value={author.value} onChange={author.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url: </Form.Label>
          <Form.Control id='url' type="text" value={url.value} onChange={url.handleChange} />
        </Form.Group>
        <Button className='mt-2' id='submit' onClick={handleSubmit}>create</Button>
      </Form>
    </div>
  )
}

export default NewBlogForm
