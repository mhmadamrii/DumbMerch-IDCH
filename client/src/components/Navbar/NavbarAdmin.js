import {  Nav, Navbar, } from "react-bootstrap";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../useContext/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

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
            <a href="/admin">
                <img src={Logo} style={{ width: '70px', marginLeft: '50px'}} alt="logo" />
            </a>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" bg="dark">
            <Nav className="me-auto"></Nav>
            <Nav style={{color: 'white', marginRight: '50px'}}>
                <Nav.Link href="/complain-admin">Complain</Nav.Link>
                <Nav.Link href="/category">Category</Nav.Link>
                {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
                <Nav.Link href="/product">Product</Nav.Link>
                <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
};

export default NavbarHome;