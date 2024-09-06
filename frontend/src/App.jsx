import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import AddProduct from './Pages/AddProduct';
import ProductDetails from './Pages/ProductDetails';
import UpdatePage from './Pages/UpdatePage';
import UserLayout from './Components/UserLayout'
import UserHomePage from "./Pages/UserHomePage";
import PublicProductDetails from "./Pages/PublicProductDetails";
import GuestLayout from "./Components/GuestLayout";
import SearchResults from './Pages/SearchResults';
import UserSearchResults from "./Pages/UserSearchResults";
import AdminPage from './Pages/AdminPage';
import AdminLoginPage from "./Pages/AdminLoginPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Category from './Pages/Category';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';

const App = () => {
  

  return (


        <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Register/>}/>
        <Route path="*" element={<h2>404 Page Not Found</h2>}/>
        
        {/*Public Routes*/}
          <Route path="/" element={<GuestLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/login" element={<AdminLoginPage/>}/>
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/search-results" element={<SearchResults/>}/>
        <Route path='/product-details/:id' element={<PublicProductDetails/>}/>
        <Route path="/category" element={<Category />} />
        <Route path="aboutus" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        </Route>

        {/*Routes for logged user */}
            <Route path="/" element={<UserLayout/>}>
            
        <Route path='/a/:userId' element={<ProtectedRoute><UserHomePage/></ProtectedRoute>}/>
        <Route path="/profile/:userId" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/user-products/:userId" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/product/:userId" element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
        <Route path='/user-products/:userId/product-details/:id' element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
        <Route path='/user-products/:userId/update-product/:id' element={<ProtectedRoute><UpdatePage/></ProtectedRoute>}/>
        <Route path='/a/profile/:userId' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/a/product-details/:id' element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
        <Route path="/a/:userId/search-results" element={<ProtectedRoute><UserSearchResults/></ProtectedRoute>}/>

        
            </Route>
            
        </Routes>
        
        </BrowserRouter>
   
    
  )  
  
}

export default App;
