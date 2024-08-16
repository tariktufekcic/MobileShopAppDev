import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserSearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [products, setProducts] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/all-products`);
        const filteredProducts = response.data.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [query]);

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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                    products.map(product => (
                        

                            <div key={product._id} className='border p-4 rounded shadow-lg cursor-pointer transform transition-transform hover:scale-105'
                            onClick={() => handleClickProduct(product._id)}
                            >
                              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                              <h2 className="text-lg font-semibold">{product.name}</h2>
                                              <p className="text-gray-600">{product.description}</p>
                                              <p className="text-blue-500 mt-2">${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
    </div>
  );
};

export default UserSearchResults;
