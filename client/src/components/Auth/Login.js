import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../useContext/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Logo from '../../assets/Logo.png';


const Login = () => {
    const navigate = useNavigate();


    // store data user when login
    const [state, dispatch ] = useContext(UserContext);
    console.log(state);


    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleOnChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
        console.log(e.target.value)
    };


    const handleOnSubmit = useMutation (async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            };

            const body = JSON.stringify(form);
            const response = await API.post('/login', body, config);
            const userStatus = response.data.data.status;
            console.log(response.data);
            console.log("successfully logged in as an " + userStatus);


            dispatch ({
                type: 'loginSuccess',
                payload: response.data.data
            });


            if(userStatus === "user") {
                navigate('/homepage')
            } else if (userStatus === 'admin') {
                navigate('/complain-admin')
            }

            const alert =(
                <Alert variant="success" className="py-1">
                    Login Success
                </Alert>
            )
            setMessage(alert)
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Login failed
                </Alert>
            )
            setMessage(alert);
            console.log(error.response.data.message)
        }
    });


    document.title = "DumbMerch | Login";
    return(
        <>
                <>
                    <div className="main" style={{width: '1100px', margin: '20vh auto'}}>
                    <Container>
                        <Row>
                            <Col>
                                <img src={Logo} style={{width: '280px'}} alt="logo" />
                                <h1 style={{marginTop: '20px'}}>Easy, Fast and Reliable</h1>
                                <p style={{color: '#6A6A6A'}}>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in Indonesia</p>
                                <div className="btn">
                                
                                <Button variant="danger" style={{
                                padding: '10px 50px',
                                fontSize: '20px', 
                                marginRight: '30px', 
                                marginTop: '20px'}} 
                                onClick={()=> {navigate("/")}}>Login</Button>{' '}
                                
                                <Button variant="dark" style={{padding: '10px 50px', 
                                fontSize: '20px', 
                                marginTop: '20px'}} 
                                onClick={()=> {navigate("/register")}}>Register</Button>{' '}
                                </div>
                            </Col>
                            <Col>
                                <div className="login" 
                                style={{
                                    // border: '1px solid red',
                                    padding: '30px',
                                    margin: '30px 0',
                                    height: '340px',
                                    fontWeight: '900px',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(18, 15, 15)'}}>
                                    <h2 style={{backgroundColor: 'rgba(18, 15, 15)'}}>Login</h2>
                                    
                                <form style={{ backgroundColor: 'rgba(18, 15, 15)'}} onSubmit={(e) => handleOnSubmit.mutate(e)}>
                                    {message && message}
                                    <div class="mb-3">
                                        <input type="email" class="form-control" id="email" placeholder="Email" 
                                            style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', 
                                            color: 'white'}}
                                            onChange={handleOnChange}
                                            value={form.email}
                                        name="email" />
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control" id="password" placeholder="Password" 
                                            style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', color: 'white'}}
                                            onChange={handleOnChange}
                                            value={form.password}
                                            name="password" />
                                    </div>
                                    <Button variant="danger" 
                                    style={{
                                    padding: '10px 50px', 
                                    fontSize: '20px', 
                                    width: '100%', 
                                    marginTop: '30px'}} type="submit" 
                                    // onChange={handleOnChange}
                                    >Login</Button>{' '}
                                </form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                </>
            {/* )} */}
        </>
    )
};

export default Login;