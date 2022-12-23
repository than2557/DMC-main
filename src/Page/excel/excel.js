import React from 'react'
import {Button,Card,Row,Col,Container,Navbar,Nav,Jumbotron,InputGroup,Form,NavDropdown} from 'react-bootstrap';  
import logo from '../../img/icon.png';
import jwt_decode  from "jwt-decode";
function Excels() {

    const Logout = ()=>{
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }

      let token = localStorage.getItem("accessToken");
      let decodeJwt = jwt_decode(token);
  return (
    <div style={{"height":937}}>
        <Navbar bg="light"  expand="lg">
      <Container fluid>
        <Navbar.Brand><img  className="Nav" src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
          
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
             
          <NavDropdown   title="รายงาน" id="basic-nav-dropdown" style={{'margin-right':80}}>
              <NavDropdown.Item>
              <a>หนังสือรับรองการแจ้ง/ใบอนุญาต</a>
          
              </NavDropdown.Item>
              <NavDropdown.Item>
              <a>บัญชีผู้ใช้งานระบบบูรณาการ</a>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="#action/3.4">
             <a>บัญชีผู้ใช้งานระบบสนับสนุน</a>  
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown   title={decodeJwt.uname} id="basic-nav-dropdown" style={{'margin-right':140}}>
              <NavDropdown.Item>
              <Button variant="outline-danger" onClick={Logout}>ออกจากระบบ</Button>
              </NavDropdown.Item>
            </NavDropdown>
       
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    </div>
  )
}

export default Excels