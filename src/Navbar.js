import React from 'react';
import './App.css';
import { auth } from './Firebase'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
function NavBar(props) {

    async  function SignOut(){
        console.log("hewre")
        auth.signOut().then(() => {
            props.history.push("/login")
        }).catch((error) => {

        });
    }
    return (
        <div className="App">
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand  ><h6><Link to="/" className="bism">BISM INCUBATORS</Link></h6></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                        <NavDropdown className="depart" title="Department" id="collasible-nav-dropdown">
                            <NavDropdown.Item  className="depart1" ><Link to="/adddepartment" className="decoration">Add Department</Link></NavDropdown.Item>
                            <NavDropdown.Item   className="depart1" ><Link to="/viewdepartment" className="decoration">View Department</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="depart" title="Internee" id="collasible-nav-dropdown">
                            <NavDropdown.Item className="depart1" ><Link to="/addinternee" className="decoration">Add Internee</Link></NavDropdown.Item>
                            <NavDropdown.Item className="depart1" ><Link to="/viewinternee" className="decoration">View Internee</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    
                    <Nav >
                        <Nav.Link  href="#" onClick={SignOut}><h6 >Logout</h6></Nav.Link>
                      
                    </Nav> 
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;



