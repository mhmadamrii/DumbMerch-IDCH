import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from '../config/api';
import { useQuery } from 'react-query';
import { useState, useContext } from "react";
import { UserContext } from "../useContext/userContext";

const Products = () => {
    const [product, setProduct ] = useState([])

    const {
        isLoading,
        isError,
        error,
    } = useQuery('products', async () => {
        const response = await API.get('/products');
        setProduct(response.data.data)
        return response.data.data
    });
    console.log(product)

    const navigate = useNavigate();
    const style = {
        main: {
            // border: '1px solid red',
            width: '1500px',
            margin: '10vh auto',
            padding: '10px',
        },
        imageProductLink: {
            backgroundColor: '#423F3E',
            color: 'white',
            textDecoration: 'none',
            margin: 'auto'
        }
    }

    const [state] = useContext(UserContext);
    const checkAuth = () => {
        if (state.isLogin === true) {
            if(state.user.status === "user"){
            navigate('/')
            }
        }
    }

    const handleOnUpdate = (id) => {
        navigate('/update-product/' + id);
    }

    checkAuth()
    document.title = "DumbMerch | Product";
    return(
        <>
            <NavbarAdmin />
            <div className="main" style={style.main}>
            <Button variant="success" style={{margin: '20px 90%', width: '150px'}} 
            onClick={()=> {navigate("/add-product")}} >Add Product</Button>{' '}
            <Table striped bordered hover variant="dark">
                {
                    isError && (
                        <div className="error">
                            <h1>Error has been occured: {error.message} </h1>
                        </div>
                    )
                }
                {
                    isLoading && (
                        <div className="loading">
                            <h1><center>Wait a second ^_^</center></h1>
                        </div>
                    )
                }
                {
                    (!isLoading && !error) && (
                        <>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Photo</th>
                                    <th>Product Name</th>
                                    <th>Product Desc</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {product.map(item => (
                                <>
                                    
                                    <tbody>
                                        <tr>
                                            <td class="col-1">{item.id} </td>
                                            <td class="col-2"><a href={item.image} style={style.imageProductLink}>Click to see</a></td>
                                            <td class="col-2">{item.name} </td>
                                            <td class="col-3">{item.desc}</td>
                                            <td class="col-1">{item.price} </td>
                                            <td class="col-1">{item.qty}</td>
                                            <td class="col-5"> 
                                            <Button variant="success" style={{padding: '5px 30px'}} onClick={()=> handleOnUpdate(item.id)} >Edit</Button>{' '}
                                            <Button variant="danger" style={{padding: '5px 30px'}}>Delete</Button>{' '}</td>
                                        </tr>
                                    </tbody>
                                </>
                            ))}
                        </>
                    )
                }
            </Table>
            </div>
        </>
    )
};

export default Products;