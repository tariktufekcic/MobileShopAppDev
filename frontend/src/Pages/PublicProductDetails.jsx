import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const PublicProductDetails = () => {
    const [loading, setLoading ] = useState(true)
    const [product, setProduct] = useState(null);
    const [ user, setUser ] = useState({});
    const { userId, id} = useParams();
    
    useEffect(() => {
        const fetchProductDetails = async () => {
          try { 
            const response = await axios.get(`http://localhost:8080/products/single-product/${id}`);
            setProduct(response.data)
          }
          catch {
            console.log("Error")
          } finally {
            setLoading(false)
          }
        }
        fetchProductDetails();
    },[id, userId]);

    useEffect(() => {
      const fetchUser = async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8080/users/profile/${userId}`);
          setUser(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      };
      
      if (product?.userId) {
        fetchUser(product.userId);
        
      }
    }, [product]);
    

    return (
        <div className="p-6 rounded-lg shadow-md h-full w-full flex flex-row bg-gray-100">
          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <CircularProgress />
            </div>
          ) : product ? (
            <div className="flex flex-row w-full h-full gap-4">
              
              <div className="w-1/2 flex flex-col justify-between">
                <div>
      <div className='bg-white shadow-lg px-8 py-8 rounded-xl'>
                  <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                  <p className="mt-2 text-gray-600">Brand: {product.brand}</p>
      
                  <table className="mt-4 table-auto w-full text-left text-gray-700">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Price:</td>
                        <td className="py-2">${product.price}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Ram:</td>
                        <td className="py-2">{product.ram}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Storage:</td>
                        <td className="py-2">{product.storage}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Battery:</td>
                        <td className="py-2">{product.battery}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Screen Size:</td>
                        <td className="py-2">{product.screenSize}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Camera:</td>
                        <td className="py-2">{product.camera}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">Processor:</td>
                        <td className="py-2">{product.processor}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-semibold">OS:</td>
                        <td className="py-2">{product.os}</td>
                      </tr>
                    </tbody>
                  </table>
      </div>
      
                  <div className="mt-4 text-gray-700 bg-white h-60 shadow-lg rounded-xl px-4 py-4">
                    <p className='font-extrabold' style={{fontSize: '18px'}}>Description:</p> <br/> {product.description}</div>
                </div>
                <div className="mt-6">
                  
                  
                  
                </div>
              </div>
      
              
              <div className="w-1/2 h-1/3 flex justify-center items-center pl-4 bg-white shadow-lg rounded-xl">
                <img
                  src={product.imageUrl}
                  alt="Product"
                  className="w-96 h-96 object-cover rounded-lg"
                />
              </div>
              

            </div>
          ) : (
            <p>Product not found.</p>
          )}

          {user ? (
            <span>Posted by: {user.username}</span>
            

          ) : (
            <p>User not found.</p>
            
          )
          
        }
        </div>
        
      );
}
export default PublicProductDetails;