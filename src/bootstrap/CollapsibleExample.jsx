import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from 'react';


function CollapsibleExample() {
  let navigate = useNavigate();

  let [data, setData] = useState('');

  useEffect(() => {
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((result) => {
      console.log(result.data);
      setData(result.data.name);
    })
    .catch(() => {
      console.log('실패');
    })
  },[])
  

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={ () => { navigate('/') } }>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') } }>Home</Nav.Link>
            <Nav.Link onClick={ () => { navigate('/detail') } }>detail</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={ () => { navigate('/about') } }>about</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              {data}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;