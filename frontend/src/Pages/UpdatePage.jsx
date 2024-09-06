import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        ram: '',
        storage: '',
        battery: '',
        screenSize: '',
        camera: '',
        processor: '',
        os: '',
        imageUrl: ''
    });

    useEffect(() => {
        
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/single-product/${id}`);
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/products/update-product/${id}`, productData);
            if (response.status === 200) {
                alert('Product updated successfully!');
                navigate(-1);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    return (
        <div className="flex flex-row p-6 max-w-screen-lg mx-auto h-full bg-white shadow w-full">
            <div className="flex-1 overflow-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Update Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={productData.name} 
                                onChange={handleChange} 
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
        
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Price:</label>
                            <input 
                                type="text" 
                                name="price" 
                                value={productData.price} 
                                onChange={handleChange} 
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
    
                   
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Picture URL:</label>
                        <input 
                            type="text" 
                            name="imageUrl" 
                            value={productData.imageUrl} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
    
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                        <table className="w-full table-auto border-collapse">
                            <tbody>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">Ram:</td>
                                    <td className="border p-2">
                                        <input
                                            name="ram" 
                                            value={productData.ram} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">Storage:</td>
                                    <td className="border p-2">
                                        <input
                                            name="storage" 
                                            value={productData.storage} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">Battery:</td>
                                    <td className="border p-2">
                                        <input
                                            name="battery" 
                                            value={productData.battery} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">Screen Size:</td>
                                    <td className="border p-2">
                                        <input
                                            name="screenSize" 
                                            value={productData.screenSize} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">Camera:</td>
                                    <td className="border p-2">
                                        <input
                                            name="camera" 
                                            value={productData.camera} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">Processor:</td>
                                    <td className="border p-2">
                                        <input
                                            name="processor" 
                                            value={productData.processor} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-medium text-gray-700">OS:</td>
                                    <td className="border p-2">
                                        <input
                                            name="os" 
                                            value={productData.os} 
                                            onChange={handleChange} 
                                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description:</label>
                        <textarea
                            name="description" 
                            value={productData.description} 
                            onChange={handleChange} 
                            className="w-full h-32 p-2 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
    
                    
                    <div className="flex justify-center mt-6">
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
    

    
    
    
};

export default UpdatePage;
