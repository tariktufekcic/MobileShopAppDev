import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        
        const term = localStorage.getItem('searchTerm') || '';
        setSearchTerm(term);

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products/all-products');
                const allProducts = response.data;
                // Filtriraj proizvode prema searchTerm
                const filteredProducts = allProducts.filter(product =>
                    product.name.toLowerCase().includes(term.toLowerCase())
                );
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

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
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Search Results for "{searchTerm}"</h2>
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

export default SearchResults;
