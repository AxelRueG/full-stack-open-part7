import React, { useImperativeHandle, useState } from 'react'
import Button from 'react-bootstrap/Button'

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className='mt-2' id='tButton' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <div className='d-grid gap-2'>
          {props.children}
          <Button variant='secondary' id='tButton' onClick={toggleVisibility}>cancel</Button>
        </div>
      </div>
    </div>
  )
})

export default Togglable