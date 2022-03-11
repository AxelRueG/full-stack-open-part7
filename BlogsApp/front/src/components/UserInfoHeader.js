import React from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/esm/Nav'

const UserInfoHeader = () => {
  const user = useSelector((state) => state.user)

  if (!user) return null

  return (
    <Navbar bg="dark" variant='dark' expand="md">
      <Container>
        <Navbar.Brand as={Link} to='/'>Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">blogs</Nav.Link>
            <Nav.Link as={Link} to="/users">users</Nav.Link>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-8 d-flex align-items-center text-light'>{user.name} is logged in</div>
                <div className='col-sm-4'><Logout /></div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

/*
<Navbar bg="light" expand="md">
  <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Item>
          <Link to="/">blogs</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/users">users</Link>
        </Nav.Item>
        <Nav.Item>
          {user.name} is logged in
          <Logout />
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
*/

export default UserInfoHeader
