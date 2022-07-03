import { useContext } from "react";
import {  Nav, Navbar, } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../useContext/userContext";

const NavbarHome = () => {
    
    // condition user
    const [state, dispatch] = useContext(UserContext);

    const logout = () => {
        console.log(state);
        dispatch({
            type: 'logOut'
        });
        Navigate('/login');
    };

    return(
        <>
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{width: '100%', border: '1 px solid red !important'}}>
            <a href="/homepage">
                <img src={Logo} style={{ width: '70px', marginLeft: '50px'}} alt="logo" />
            </a>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" bg="dark">
            <Nav className="me-auto"></Nav>
            <Nav style={{color: 'white !important', marginRight: '80px'}}>
                <Nav.Link href="/complain" style={{color: 'white'}}>Complain</Nav.Link>
                <Nav.Link href="/profile" style={{color: 'white'}}>Profile</Nav.Link>
                <Nav.Link href="/" onClick={logout} style={{color: 'white'}}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
};

export default NavbarHome;