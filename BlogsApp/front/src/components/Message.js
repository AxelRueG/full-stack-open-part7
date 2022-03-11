import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'

const Message = ({ message }) => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    setStatus(message.startsWith('a new')? true : false)
  },[])

  return <Alert className="mt-2" variant={status? 'success':'danger'}>{message}</Alert>
}

export default Message
