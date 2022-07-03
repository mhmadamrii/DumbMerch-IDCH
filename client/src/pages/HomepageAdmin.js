import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from '../config/api';
import { useQuery } from "react-query";


const Homepage = () => {
const [product, setProduct] = useState([])

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

    // styling
    const style = {
        h2: {
            // border: '1px solid red',
            position: 'absolute',
            color: 'red',
            margin: '5px 20px'
        },

        container: {
            // border: '1px solid green',
            margin: '10vh auto',
            width: '1450px',
            display: 'flex',
            flexWrap: 'wrap',
        },

        cards: {
            // border: '1px solid blue',
            height: '410px',
            display: 'flex',
            flexWrap: 'wrap',
            margin: '60px 20px'
        },
        
        cardsImg: {
            // margin: '10px',
            backgroundColor: '#212121',
            borderRadius: '5px',
            padding: '10px',
            width: '300px',
            height: '450px',
            // border: '1px solid red'
        },

        cardText: {
            // border: '1px solid',
            padding: '10px',
            backgroundColor: '#212121'
        },

        imageProduct: {
            // border: '1px solid red',
            width: '250px',
            height: '200px',
            marginLeft: '15px',
        }

    };



    document.title = "DumbMerch | Homepage";
    return(
        <>
            <NavbarAdmin />
            <div style={style.container}>
                <h2 style={style.h2}>Products</h2>
                    {/* dataProducts from API */}
                    {
                        isError && (
                                <div className="error">
                                    <h1>Error has ben occured: {error.message}</h1>
                                </div>
                        )
                    }
                    {
                        isLoading && (
                                <div className="loading" style={{margin: '10vh 20vh'}}>
                                    <h1><center>Wait a second! ^_^</center></h1>
                                </div>
                        )
                    }
                    {
                        (!isLoading && !error) && (
                            <>
                                {product.map(item => (
                                    <>
                                        <div style={style.cards}>
                                            <div style={style.cardsImg}>
                                                <a href={`/product-admin/` + item.id} style={{backgroundColor: '#212121'}}>
                                                    <img src={item.image} alt="product image" style={style.imageProduct}/>
                                                </a>
                                                <div style={style.cardText}>
                                                    <h2 style={{color: '#F74D4D', backgroundColor: '#212121'}}>{item.name} </h2>
                                                    <p style={{backgroundColor: '#212121'}}>${item.price}</p>
                                                    <p style={{backgroundColor: '#212121', color: 'salmon'}}>Stock: {item.qty}</p>
                                                    <p style={{backgroundColor: '#212121'}}>{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                        <br /><br /><br /><br /><br /> <br /><br /><br /><br /><br />
                                    </>
                                ))}
                            </>
                        )
                    }
            </div>
        </>
    )
};

export default Homepage;