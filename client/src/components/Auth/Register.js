import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.png';
// useMutation and API configuration
import { useMutation } from 'react-query';
import { API } from '../../config/api';


const Register = () => {
    
    
    
    const navigate = useNavigate();
    const [ message, setMessage ] = useState(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });


    const handleOnChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value 
        });
        console.log(e.target.value)
    };




    const handleSubmit = useMutation (async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            };

            const body = JSON.stringify(form);
            const response = await API.post('/register', body, config);
            console.log(response.data)

        } catch (error) {
            console.log(error);
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed 
                </Alert>
            );
            setMessage(alert);
        }
    })







    document.title = "DumbMerch | Register"
    return(
        <>
        <div className="main" style={{width: '1100px', margin: '20vh auto'}}>
        <Container>
            <Row>
                <Col>
                    <img src={Logo} style={{width: '280px'}} alt="logo" />
                    <h1 style={{marginTop: '20px'}}>Easy, Fast and Reliable</h1>
                    <p style={{color: '#6A6A6A'}}>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in Indonesia</p>
                    <div className="btn" style={{}}>
                    <Button variant="danger" style={{padding: '10px 50px',
                    fontSize: '20px', marginRight: '30px', marginTop: '20px'}} onClick={()=> {navigate("/")}}>Login</Button>{' '}
                    <Button variant="dark" style={{padding: '10px 50px', fontSize: '20px', marginTop: '20px'}}>Register</Button>{' '}
                    </div>
                </Col>
                <Col>
                    <div className="Register" style={{
                        // border: '1px solid red',
                        padding: '30px',
                        margin: '30px 0',
                        height: '340px',
                        fontWeight: '900px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(18, 15, 15)'}}>
                        <h2 style={{backgroundColor: 'rgba(18, 15, 15)'}}>Register</h2>

                    <form style={{ backgroundColor: 'rgba(18, 15, 15)'}} onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Name" style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', color: 'white'}}
                                onChange={handleOnChange}
                                value={form.name}
                                name='name' />
                        </div>
                        <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email" style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', color: 'white'}}
                                onChange={handleOnChange}
                                value={form.email}
                                name='email' />
                        </div>
                        <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password" style={{backgroundColor: 'rgba(210, 210, 210, 0.25)', color: 'white'}}
                                onChange={handleOnChange}
                                value={form.password}
                                name='password' />
                        </div>
                        <Button variant="danger" style={{padding: '10px 50px', fontSize: '20px', width: '100%', marginTop: '30px'}} type="submit">Register</Button>{' '}
                    </form>
                    
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
        </>
    )
};

export default Register;