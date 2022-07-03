import NavbarHome from "../components/Navbar/NavbarHome";
import ProfileImg from "../assets/Profile.png"; 
import Product1 from "../assets/Product1.png";
import Logo from "../assets/Logo.png";
import { useQuery } from "react-query";
import { useState, useContext } from "react";
import { API } from "../config/api";
import { UserContext } from "../useContext/userContext";
import dateFormat from 'dateformat';


const Profile = () => {
    const style = {
        container: {
            // border: '1px solid red',
            margin: '10vh auto',
            padding: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            width: '5000px'
        },
        mainLeft: {
            // border: '1px solid'
        },
        mainCenter: {
            // border: '1px solid red',
            height: '440px',
            width: '380px', 
            margin: '40px 50px'
        },
        mainRight: {
            // border: '1px solid red',
            width: '400px'
        },
        transaction: {
            // border: '1px solid red',
            display: 'flex',
            flexWrap: 'wrap',
            width: '550px',
            padding: '20px',
            backgroundColor: '#303030',
            borderRadius: '10px',
            margin: '10px'
        },
        logoTransaction: {
            width: '60px',
            height: '90px',
            backgroundColor: '#303030',
            marginLeft: '20px',
            marginTop: '20px',
            float: 'right'
        }
    }

    const [state] = useContext(UserContext);
    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get(`/profile/` + state.user.id);
        console.log(response.data)
        return response.data.data;
    });

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions');
        console.log(response.data)
        return response.data.data;
    });
    
    document.title = "DumbMerch | Profile";
    return(
        <>
            <NavbarHome />
            <div className="container" style={style.container}>
                <div className="main-left" style={style.mainLeft}>
                    <h3 style={{color: '#F74D4D'}}>My Profile</h3> <br />
                    <img src={ProfileImg} style={{width: '380px', height: '440px'}} alt="Profile" />
                </div>

                <div className="main-center" style={style.mainCenter}> <br />
                    <h4 style={{color: '#F74D4D'}}>Name</h4>
                    <p>{state.user.name} </p>
                    <h4 style={{color: '#F74D4D'}}>Email</h4>
                    <p>{state.user.email} </p>
                    <h4 style={{color: '#F74D4D'}}>Phone</h4>
                    <p>083896833122</p>
                    <h4 style={{color: '#F74D4D'}}>Gender</h4>
                    <p>Male</p>
                    <h4 style={{color: '#F74D4D'}}>Adress</h4>
                    <p style={{textAlign: 'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>

                <div className="main-right" style={style.mainRight}>
                    <h3 style={{color: '#F74D4D'}}>My Transaction</h3> <br />

                    {transactions?.map((item, index) => (
                    <div className="transaction" style={style.transaction}>
                        <img src={Product1} style={{width: '80px'}} alt="Product1" />
                        <div className="text-transaction" style={{margin: '0 20px', backgroundColor: '#303030', width: '300px'}}>
                            <h4 style={{backgroundColor: '#303030', color: 'red'}}>{item.product.name} </h4>
                            <p style={{backgroundColor: '#303030'}}>{dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}</p>
                            <p style={{backgroundColor: '#303030'}}>Price: {item.price}</p>
                            <h6 style={{backgroundColor: '#303030'}}>Sub Total: 500.000</h6>
                        </div>
                        <img src={Logo} style={style.logoTransaction} alt="Logo" />
                        <div className={`status-transaction-${item.status} rounded h-100 w-100 d-flex align-items-center justify-content-center`}>
                            status: {item.status}
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </>
    )
};

export default Profile;