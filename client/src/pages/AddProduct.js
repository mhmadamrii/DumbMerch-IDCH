import { Button, Container } from "react-bootstrap";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { useState } from "react";
import { API } from "../config/api";


const AddProduct = () => {

    // styling
    const style = {
        container: {
            // border: '1px solid red',
            margin: '10vh auto',
            padding: '20px'
        },

        uploadFile: {
            backgroundColor: 'red',
            padding: '10px 40px',
            borderRadius: '10px',
            cursor: 'pointer'
        },

        detailAddProduct: {
            // border: '1px solid green',
            margin: '10px 0'
        },

        inputStyle: {
            width: '100%',
            backgroundColor: '#303030',
            height: '40px',
            borderRadius: '5px',
            margin: '10px 0'
        },

        descStyle: {
            width: '100%',
            backgroundColor: '#303030',
            height: '100px',
            borderRadius: '5px',
            margin: '10px 0'
        }
    };

    const navigate = useNavigate();
    // store all data
    const [categories, setCategories] = useState([]); 
    const [categoryId, setCategoryId] = useState([]); 
    const [form, setForm] = useState({
        image: '',
        name: '',
        desc: '',
        price: '',
        qty: '',
    });

    // preview file chosen
    const [preview, setPreview] = useState(null);


    // handle change input from form
    const handleOnChange = (e) => {
        setForm({
        ...form,
        [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });
    
        // preview configuration
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        }
    };
    


    // onSubmit
    const handleOnSubmit = useMutation(async (e) => {
        try {
        e.preventDefault();
    
        // API configuration
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };
    
        // store all data from user
        const formData = new FormData();
        formData.set('image', form.image[0], form.image[0].name);
        formData.set('name', form.name);
        formData.set('desc', form.desc);
        formData.set('price', form.price);
        formData.set('qty', form.qty);
        formData.set('categoryId', categoryId);
    
        console.log(form);
    
        // Insert product data
        const response = await API.post('/product', formData, config);
        console.log(response);
    
        navigate('/product');
        } catch (error) {
        console.log(error);
        }
    });
    document.title = "DumbMerch | Add Product";
    return (
        <>
            <NavbarAdmin />
            <Container style={style.container}>
                <h2 style={{color: 'white'}}>Add Product</h2>
                <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                {preview && (
                    <div>
                        <img src={preview} style={{width: '200px', maxHeight: '150px', objectFit: 'cover',}} alt={preview} />
                    </div>
                )} <br />
                    <input type="file" name="image" id="upload" style={{display: 'none'}} onChange={handleOnChange} />
                    <label for="upload" style={style.uploadFile}>Upload file</label> <br />
                    <div className="detailAddProduct" style={style.detailAddProduct}>
                        <input type="text" placeholder="Product Name" name="name" style={style.inputStyle} onChange={handleOnChange} /><br/>
                        <input type="text" placeholder="Description" name="desc" style={style.descStyle} onChange={handleOnChange} /><br/>
                        <input type="number" placeholder="Price" name="price" style={style.inputStyle} onChange={handleOnChange} /><br/>
                        <input type="number" placeholder="Quantity" name="qty" style={style.inputStyle} onChange={handleOnChange} /><br/>
                        <input type="text" placeholder="Category" name="category" style={style.inputStyle} onChange={handleOnChange} /><br/>
                        <Button variant="success" style={{width: '100%'}} type="submit" >Add Product</Button>{' '}
                    </div>
                </form>
            </Container>
        </>
    )
};

export default AddProduct;