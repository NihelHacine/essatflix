import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Navbarr({settext}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");
  const user = useSelector((state) => state.user?.user);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark" variant='dark' >
    <Container >
      <Navbar.Brand href=""><Link to={'/home'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}><img src="essat-flix.png" width={'200px'}/></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href=""><Link to={'/home'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>Accueil</Link></Nav.Link>
          <Nav.Link href=""><Link to={'/about'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>A propos </Link></Nav.Link>
          <NavDropdown title="Films" id="collapsible-nav-dropdown">
            <NavDropdown.Item href=""><Link to={'/films'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>Films</Link></NavDropdown.Item>
            <NavDropdown.Item href="">
            <Link to={'/films/action'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>Films actions</Link>
            </NavDropdown.Item>
            <NavDropdown.Item href=""><Link to={'/films/horreur'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>Films d'horreur</Link></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="">
            <Link to={'/films/romantique'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>Films romantiques</Link>
            </NavDropdown.Item>
          </NavDropdown>          
          <Nav.Link href="" ><Link to={'/favoris'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>
           Mes favoris
           </Link></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="">
          <Form className="d-flex">
            <Button variant="outline-danger"><Link to={'/chatroom'} style={{textDecoration:'none', color:'#9b9d9e', fontWeight:'bold'}}>ChatRoom</Link></Button>
          </Form></Nav.Link>
          {isAuth&&user?.email === 'admin@gmail.com'?
          (<Nav.Link eventKey={2} href="/">
          <Link to={'/dashboard'}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={'20'} style={{margin:'10'}}><path fill="#ffffff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>          
          </Link>
          </Nav.Link>):null }
          <Nav.Link eventKey={2} href="/" onClick={()=>{
              dispatch(logout()); 
              navigate("/")}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={'20'} style={{margin:'10'}}><path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}

export default Navbarr