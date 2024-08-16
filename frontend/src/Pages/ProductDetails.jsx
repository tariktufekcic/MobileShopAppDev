import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const ProductDetails = () => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading ] = useState(true)
    const [product, setProduct] = useState(null);
    const { id, userId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUser = async (userId) => {
        console.log(userId)
        try {
          const userResponse = await axios.get(`http://localhost:8080/users/profile/${userId}`);
          
          setUser(userResponse.data);
          
        } catch (error) {
          console.error('There was an error fetching the user or products data!', error);
        }
      };
      if(userId){
      fetchUser(userId);
      }
      
    }, [userId]);

    useEffect(() => {
        const fetchProductDetails = async () => {
          try { 
            const response = await axios.get(`http://localhost:8080/products/single-product/${id}`);
            setProduct(response.data)
            if (response.data.userId) {
              setUser(response.data.userId)
            }
          }
          catch {
            console.log("Error")
          } finally {
            setLoading(false)
          }
        }
        fetchProductDetails();
    },[id, userId]);

    const handleDeleteProduct = async (id) => {
          try {
            await axios.delete(`http://localhost:8080/products/delete-product/${id}`);
            alert("Product has been deleted!");
            if(userId){ 
              navigate(-1);
             }
        } catch (e) {
            console.error("FAIL")
        } 
      }
      const handleUpdateProduct = async (id) => {
        
        try {
          const response = await axios.get(`http://localhost:8080/products/single-product/${id}`)
          console.log(response.data)
          if(response.data) {
            
            navigate(`/user-products/${userId}/update-product/${id}`)
          }
          else {
            console.log("Error")
          }
        } catch (error) {
          console.error("Error Message")
        }
      }

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
  
      
                  <p className="mt-4 text-gray-700 bg-white h-60 shadow-lg rounded-xl px-4 py-4">
                  <p className='font-extrabold' style={{fontSize: '18px'}}>Description:</p> <br /> {product.description}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="w-36 h-10 hover:bg-red-800 text-white border-2 rounded-lg bg-red-600"
                    style={{fontSize: '14px'}}
                  >
                    <DeleteIcon/>Delete Product
                  </button>
                  <button
                  onClick={() => handleUpdateProduct(product._id)}
                  className="bg-green-600 text-white hover:bg-green-800 h-10 w-36 rounded-lg ml-4"
                  style={{fontSize: '14px'}}>
                   <UpdateIcon/>Update Product
                  </button>
                  
                </div>
              </div>
      
              
              <div className="w-1/2 h-1/3 flex justify-center items-center pl-4 bg-white shadow-lg rounded-xl box-border">
                <img
                  src={product.imageUrl}
                  alt="Product"
                  className="w-96 h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="mt-4">
      
    </div>
    {user ? (
        
        <span className="text-lg font-semibold">Posted by: {user.username}</span>
        
      ) : (
        <p className="text-lg font-semibold">User not found.</p>
      )}
            </div>
            
          ) : (
            <p>Product not found.</p>
          )}
        </div>
      );
}
export default ProductDetails;