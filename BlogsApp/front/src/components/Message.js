import React, { useEffect, useState } from 'react'

const Message = ({ message }) => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    setStatus(message[0] === 'a' ? true : false)
  },[])

  const meStyle = {
    border: status ? '2px solid green' : '2px solid red',
    borderRadius: '10px',
    padding: '5px',
    backgroundColor: '#aaa',
  }

  return <p style={meStyle}>{message}</p>
}

export default Message
