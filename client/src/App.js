// bootstrap & react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./useContext/userContext";
import { API, setAuthToken} from './config/api';

// import components
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import DetailProduct from "./pages/DetailProduct";
import DetailProductAdmin from "./pages/DetailProductAdmin";
import Homepage from "./pages/Homepage";
import HomepageAdmin from "./pages/HomepageAdmin";
import Profile from "./pages/Profile";
import ProfileAdmin from "./pages/ProfileAdmin";
import ErrorPage from "./pages/ErrorPage";
import Category from "./pages/Category";
import Product from "./pages/Product";
import ComplainAdmin from "./pages/ComplainAdmin";
import Complain from "./pages/Complain";
import FAQ from "./pages/FAQ";
import UpdateProduct from "./pages/UpdateProduct"
import AddProduct from "./pages/AddProduct";



if (localStorage.token) {
  setAuthToken(localStorage.token)
};



const App = () => {
  
  // store data user when login
  const [ state, dispatch ] = useContext(UserContext);
  console.log(state);
  


  // check token exist
  const checkAuth = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch ({
          type: 'authError'
        })
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: 'userSuccess',
        payload
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth();
  },[]);


  // useEffect(() => {
  //   if(state.isLogin == false) {
  //     Navigate('/')
  //   }
  // },[state])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/admin" element={<HomepageAdmin />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/product-admin/:id" element={<DetailProductAdmin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-admin" element={<ProfileAdmin />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/complain-admin" element={<ComplainAdmin />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        {/* unidentified routing */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;