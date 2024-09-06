import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [ products, setProducts ] = useState([]);
  
  const navigate = useNavigate();
  const { id } = useParams();
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
        navigate(`/product-details/${id}`)
      }
    } catch (error) {
      console.error("Err", error)
    }
  }

return (
  <>
<div>
<div className='h-full grid grid-cols-5 grid-auto-rows gap-4 bg-gray-100 object-cover p-5'>
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

</>
)
};
                                        
export default Home;