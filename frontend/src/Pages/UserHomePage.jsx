import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserHomePage = () => {

  
  const [ products, setProducts ] = useState([]);
  
  const navigate = useNavigate();
  const { userId, id } = useParams();

  const handleAdd = () => {
    navigate(`/product/${userId}`);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/all-products');
        setProducts(response.data);
        
        
        
      } catch (error) {
        console.error("Failed fetching products", error)
      }
      
    }
    fetchAllProducts();
  }, [id]);
  
  const handleClickProduct = async (id) => {
    
    try {
      
      const fetchSingleProduct = await axios.get(`http://localhost:8080/products/single-product/${id}`)
      
      if(fetchSingleProduct.data){
        navigate(`/a/product-details/${id}`)
      }
    } catch (error) {
      console.error("Err", error)
    }
  }
    return ( 
        <div>
        <div className="flex justify-start px-4 py-4">
  <button
    onClick={handleAdd}
    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-36 h-12 border-2 border-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
  >
    + Add
  </button>
</div>
        




<div className='h-full grid grid-cols-4 grid-auto-rows gap-4 bg-white object-cover p-5'>
{products.map((product) => (

<div key={product._id} className='border p-4 rounded shadow-lg cursor-pointer transform transition-transform hover:scale-105'
onClick={() => handleClickProduct(product._id)}
>
  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-blue-500 mt-2">${product.price}</p>


</div>
    ))}

        </div>

 
         </div>      
    )
}

export default UserHomePage;