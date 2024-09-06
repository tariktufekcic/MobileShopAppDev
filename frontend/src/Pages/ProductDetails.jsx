import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import CreateOffer from '../Components/CreateOffer';

const ProductDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [sold, setSold] = useState(false); // Dodaj status 'sold'
  const [isOwner, setIsOwner] = useState(false); // Dodaj status za provjeru vlasništva

  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentUserId = localStorage.getItem('userId'); // Preuzmi userId iz localStorage

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Preuzmi detalje proizvoda zajedno s korisničkim informacijama
        const response = await axios.get(`http://localhost:8080/products/single-product/${id}`);
        const productData = response.data;
        setProduct(productData);
        setUser(productData.userId); // Postavi korisnika iz podataka proizvoda

        // Provjeri da li je neka ponuda prihvaćena
        const offersResponse = await axios.get(`http://localhost:8080/of/offers/${id}`);
        const acceptedOffer = offersResponse.data.find(offer => offer.status === 'Accepted');
        if (acceptedOffer) {
          setSold(true);
        }

        // Provjeri da li trenutni korisnik posjeduje proizvod
        if (productData.userId._id === currentUserId) {
          setIsOwner(true); // Postavi isOwner na true ako je trenutni korisnik vlasnik proizvoda
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, currentUserId]);

  const handleDeleteProduct = async (id) => {
    if (!isOwner) {
      alert("You cannot delete this product");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8080/products/delete-product/${id}`);
      alert("Product has been deleted!");
      navigate(-1);
    } catch (e) {
      console.error("Failed to delete product", e);
    }
  };
  
  const handleUpdateProduct = async (id) => {
    if (!isOwner) {
      alert("You cannot edit this product");
      return;
    }
  
    try {
      navigate(`/user-products/${currentUserId}/update-product/${id}`);
    } catch (error) {
      console.error("Failed to navigate to update page", error);
    }
  };

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
                <h2 className="text-3xl font-bold text-gray-800">
                  {product.name} {sold && <span className="text-red-600">(Sold)</span>}
                </h2>
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
                <span className='font-extrabold' style={{fontSize: '18px'}}>Description:</span> <br /> {product.description}
              </p>

              <div className="mt-6 bg-white shadow-lg rounded-xl px-8 py-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Submit an Offer</h3>
                <CreateOffer productId={product._id} />
              </div>
            </div>
            <div className="mt-6">
              {isOwner && (
                <>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="w-36 h-10 hover:bg-red-800 text-white border-2 rounded-lg bg-red-600"
                    style={{fontSize: '14px'}}
                  >
                    <DeleteIcon /> Delete Product
                  </button>
                  <button
                    onClick={() => handleUpdateProduct(product._id)}
                    className="bg-green-600 text-white hover:bg-green-800 h-10 w-36 rounded-lg ml-4"
                    style={{fontSize: '14px'}}
                  >
                    <UpdateIcon /> Update Product
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-1/2 h-1/3 flex justify-center items-center pl-4 bg-white shadow-lg rounded-xl box-border">
            <img
              src={product.imageUrl}
              alt="Product"
              className="w-96 h-96 object-cover rounded-lg"
            />
          </div>

          {user ? (
            <div>
              <div className="w-12 h-12 rounded-full bg-gray-300 text-white flex items-center justify-center text-xl font-bold">
                {user.username.charAt(0)}
              </div>
              <span className="text-lg font-thin">{user.username}</span>
            </div>
          ) : (
            <p className="text-lg font-semibold">User not found.</p>
          )}
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
