import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DetailProduct = () => {
    let history = useNavigate();
    let { id } = useParams();
  
    let { data: product } = useQuery('productCache', async () => {
      const response = await API.get('/product/' + id);
      console.log(response.data.data)
      return response.data.data;
    });
  
    
    useEffect(()=>{
      
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      const myMidtransClientKey = "SB-Mid-client-ERPkEClmV6sIWWsB";
      let scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
      document.body.appendChild(scriptTag);
      return () => {
        document.body.removeChild(scriptTag);
      };
    },[])
  
    const handleBuy = useMutation(async (e) => {
      try {
        e.preventDefault()
  
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        const data = {
          idProduct: product.id,
          // idSeller: product.seller.id,
          price: product.price,
        };
  
        const body = JSON.stringify(data);
        const response = await API.post('/transaction', body, config);
        console.log(response.data)

        // get payment token
        const token = response.data.payment.token
        console.log(token)
  
        // handling each error and transactions
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log(result);
            history("/profile");
          },

          onPending: function (result) {
            console.log(result);
            history("/profile");
          },

          onError: function (result) {
            console.log(result);
          },
          onClose: function () {
            alert("you closed the popup without finishing the payment");
          },
        })
      } catch (error) {
        console.log(error);
      }
    });

    const style = {
        container: {
            // border: '1px solid red',
            display: 'flex',
            width: '1200px',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            padding: '20px',
            margin: '10vh auto'
        },
        mainRight: {
            width: '550px',
            overflow: 'auto',
            // border: '1px solid',
            padding: '10px'
        }
    };

    const imgLink = "http://localhost:5000/uploads/"
    document.title = "DumbMerch | Detail-product"
    return(
        <>
            <NavbarAdmin />
            <div className="container" style={style.container}>
                <div className="main-left">
                    <img src={imgLink + product?.image} style={{width: '440px', height: '550px'}} />
                </div>
                <div className="main-right" style={style.mainRight}>
                    <h1 style={{color: '#F74D4D'}}>{product?.name}</h1>
                    <p>Stock: {product?.qty} </p>
                    <ul>
                        <li>Wireless Mouse</li>
                        <li>Konektivitas wireless 2.4 GHz</li>
                        <li>Jarak wireless hingga 10m</li>
                        <li>Plug and Play</li>
                        <li>Baterai tahan hingga 12 bulan</li>
                    </ul>
                    <p>{product?.desc} </p>
                    <span style={{color: '#F74D4D', float: 'right'}}>${product?.price} </span>
                    <div className="d-grid gap-2" style={{marginTop: '50px'}}>
                        <Button variant="danger" size="lg" onClick={(e) => handleBuy.mutate(e)}>Buy</Button> 
                    </div>
                </div>
            </div>
        </>
    )
};

export default DetailProduct;