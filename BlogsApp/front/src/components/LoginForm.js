import React from 'react'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { logUser } from '../reducers/userReducer'
import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const LoginForm = () => {
  const username = useInput('')
  const password = useInput('')

  const messageError = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logUser({ username: username.value, password: password.value }))
    username.resetValue()
    username.resetValue()
  }

  return (
    <>
      <h1>Blogs</h1>
      <Card className='sm m-auto mt-3' style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h4>LOGIN</h4>
          <Form className="d-grid gap-2">
            {messageError && <Message message={messageError} />}
            <Form.Group>
              <Form.Label>username:</Form.Label>
              <Form.Control id='u_username' type="text" value={username.value} onChange={username.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>password:</Form.Label>
              <Form.Control id='u_password' type="password" value={password.value} onChange={password.handleChange} />
            </Form.Group>
            <Button onClick={handleSubmit}>login</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default LoginForm
