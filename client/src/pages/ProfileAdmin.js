import NavbarHome from "../components/Navbar/NavbarHome";
import ProfileImg from "../assets/Profile.png"; 
import Product1 from "../assets/Product1.png";
import Logo from "../assets/Logo.png";
import Albion from "../assets/albion.jpeg"

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
            width: '500px',
            padding: '25px',
            backgroundColor: '#303030',
            borderRadius: '10px'
        },
        logoTransaction: {
            width: '80px',
            height: '90px',
            backgroundColor: '#303030',
            marginLeft: '80px',
            marginTop: '20px'
        }
    }

    document.title = "DumbMerch | Profile";
    return(
        <>
            <NavbarHome />
            <div className="container" style={style.container}>
                <div className="main-left" style={style.mainLeft}>
                    <h3 style={{color: '#F74D4D'}}>My Profile</h3> <br />
                    <img src={Albion} style={{width: '380px', height: '440px'}} alt="Profile" />
                </div>

                <div className="main-center" style={style.mainCenter}> <br />
                    <h4 style={{color: '#F74D4D'}}>Name</h4>
                    <p>Muhammad Amri Nurfai</p>
                    <h4 style={{color: '#F74D4D'}}>Email</h4>
                    <p>muhammadamry151@gmail.com</p>
                    <h4 style={{color: '#F74D4D'}}>Phone</h4>
                    <p>+6282324149577</p>
                    <h4 style={{color: '#F74D4D'}}>Gender</h4>
                    <p>Male</p>
                    <h4 style={{color: '#F74D4D'}}>Adress</h4>
                    <p style={{textAlign: 'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                </div>

                <div className="main-right" style={style.mainRight}>
                    <h3 style={{color: '#F74D4D'}}>My Transaction</h3> <br />
                    <div className="transaction" style={style.transaction}>
                        <img src={Product1} style={{width: '80px'}} alt="Product1" />
                        <div className="text-transaction" style={{margin: '0 20px', backgroundColor: '#303030'}}>
                            <h6 style={{backgroundColor: '#303030'}}>Mouse</h6>
                            <p style={{backgroundColor: '#303030'}}>Saturday 14 Juli 2021</p>
                            <p style={{backgroundColor: '#303030'}}>Price: Rp.500.000</p>
                            <h6 style={{backgroundColor: '#303030'}}>Sub Total: 500.000</h6>
                        </div>
                        <img src={Logo} style={style.logoTransaction} alt="Logo" />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;