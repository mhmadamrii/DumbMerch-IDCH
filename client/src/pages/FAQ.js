import NavbarHome from "../components/Navbar/NavbarHome";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Logo from "../assets/Logo.png";

const FAQ = () => {
    document.title = "DumbMerch | FAQ";
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const style = {
        container: {
            // border: '1px solid green',
            textAlign: 'center'
        },
        main: {
            borderBottom: '1px solid red',
            width: '1500px',
            margin: '10vh auto',
            padding: '0 80px 40px 80px',
            display: 'flex',
            justifyContent: 'space-between'
        }
    }

    return(
        <>
            <NavbarHome />
                <h1><center>Frequently Asked Question (F.A.Q)</center></h1>
            <div className="main" style={style.main}>
                <div className="mainLeft" style={{ width: '700px', textAlign: 'center',}}>
                    {/* question1 */}
                    <Button variant="secondary" style={{padding: '10px 30px'}}
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                    What is DumbMerch?
                    </Button> <br /><br />
                    <Collapse in={open}>
                        <div id="example-collapse-text" style={{color: '#73777B'}}>
                        DumbMerch is an e-commerce web application service to make people easy to sell and buy their products. DumbMerch is based on simplicity, efficient, and fast proccess. Our motto is "satisfied users, make us happy "
                        </div> 
                    </Collapse>

                    {/* question2 */}
                    <Button variant="secondary" style={{padding: '10px 10px'}}
                    onClick={() => setOpen2(!open2)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open2}>
                How can I buy the product?
                </Button> <br /><br />
                <Collapse in={open2}>
                    <div id="example-collapse-text" style={{color: '#73777B'}}>
                    You can visit product page and choose which one you prefer. After, you will redirected to an administration. Soon we will provide the guideliness and requiremennts to sell products
                    </div>
                </Collapse>

                {/* quwstion3 */}
                    <Button variant="secondary" style={{padding: '10px 30px'}}
                    onClick={() => setOpen3(!open3)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open3}>
                Can I track my order?
                </Button> <br /><br />
                <Collapse in={open3}>
                    <div id="example-collapse-text" style={{color: '#73777B'}}>
                    You can also track your shipment and monitor each product that you buy or sell. 
                    We will always stand by to allow an access multi-continent transaction especially in Asia and Europe
                    </div>
                </Collapse>

                {/* quwstion4 */}
                    <Button variant="secondary" style={{padding: '10px 10px'}}
                    onClick={() => setOpen4(!open4)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open4}>
                Contact Developer & Customer service
                </Button> <br /><br />
                <Collapse in={open4}>
                    <div id="example-collapse-text" style={{color: '#73777B'}}>
                        Please contact us through dummerch.admin@gmail.com or sending us a text in our social platform
                    </div>
                </Collapse>
                </div>
                <div className="mainRight">
                    <img src={Logo} style={{marginRight: '10vh'}} alt="logo DM" />
                </div>
            </div>
        </>
    )
};

export default FAQ;