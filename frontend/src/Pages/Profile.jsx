import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProductOffers from '../Components/ProductOffers';

const Profile = () => {
  
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserProductsAndOffers = async () => {
        try {
            // Fetch user details
            const userResponse = await axios.get(`http://localhost:8080/users/profile/${userId}`);
            setUser(userResponse.data);

            // Fetch products for the user
            const productsResponse = await axios.get(`http://localhost:8080/products/user-products/${userId}`);
            const fetchedProducts = productsResponse.data;
            setProducts(fetchedProducts);

            // Fetch offers for each product
            const offersPromises = fetchedProducts.map(product => 
                axios.get(`http://localhost:8080/of/offers/${product._id}`)
            );

            const offersResponses = await Promise.all(offersPromises);
            const allOffers = offersResponses.map(response => response.data).flat(); // Flatten the array of offers
            setOffers(allOffers);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    fetchUserProductsAndOffers();
}, [userId]);


  const handleAdd = () => {
    navigate(`/product/${userId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/delete-user/${userId}`);
      alert("USER DELETED");
      localStorage.clear();
      navigate(-1);
      
    } catch (e) {
      console.error(e?.message);
    }
  };

  const handleOpenDetails = (id) => {
      navigate(`/user-products/${userId}/product-details/${id}`)
    
  }
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end mb-4">
  <button
    onClick={handleAdd}
    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-36 h-12 border-2 border-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
  >
    + Add
  </button>
</div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {user ? (
            <div className='flex flex-col items-start'>
              <h2 className='text-3xl font-bold text-gray-800'>{user.username}</h2>
              <p className='mt-2 text-gray-600'>{user.username}'s profile</p>
            </div>
            
          ) : (
            <p>Loading user data...</p>
          )}
        </div>

        <div className="mt-8">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
      Delete Account
    </button>
          
        </div>

        <div className="mt-8">
        
          {products.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            
            >
              
              {products.map(product => (
              
                <li key={product._id} className="bg-white p-4 rounded-lg shadow-md flex flex-row w-full gap-4 cursor-pointer transform transition-transform hover:scale-105"
                 onClick={() => handleOpenDetails(product._id)}
                 >
                  
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">Brand: {product.brand}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <img src={product.imageUrl} alt='....' className='w-24 h-24 object-cover'/>
                  
                </li>
                
              ))}
             
            </ul>
            
          ) : (
            <p>No Products</p>
          )}
        </div>
        {/* Add the ProductOffers component here */}
<div className="mt-8">
  {products.map(product => (
    <ProductOffers key={product._id} productId={product._id} productName={product.name}/>
  ))}
</div>

      </div>
    </div>
  );
}

export default Profile;
