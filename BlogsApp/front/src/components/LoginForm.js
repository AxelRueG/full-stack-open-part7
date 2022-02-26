import React, { useState } from 'react'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { logUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const messageError = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form>
        {messageError && <Message message={messageError} />}
        <div>
					username:
          <input id='u_username' type="text" value={username} onChange={handleUsername} />
        </div>
        <div>
					password:
          <input id='u_password' type="password" value={password} onChange={handlePassword} />
        </div>
        <button onClick={handleSubmit}>login</button>
      </form>
    </div>
  )
}

export default LoginForm
