import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ram, setRam] = useState('');
    const [storage, setStorage] = useState('');
    const [battery, setBattery] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [camera, setCamera] = useState('');
    const [processor, setProcessor] = useState('');
    const [os, setOs] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/products/create-product`, {
                name, brand, price, description, imageUrl, ram, storage, battery, screenSize, camera, processor, os, userId
            });
            const productId = response.data._id;

            if (productId) {
                navigate(`/user-products/${userId}`);
            }
        } catch (e) {
            console.error("ERROR");
        }
    };

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        setBrand(selectedBrand);
    };

    return (
        <div className='flex w-full h-screen bg-gray-100 p-6'>
            <div className='w-full max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Product Details</h1>
                <form onSubmit={handleSave} className='flex flex-col space-y-6'>
                    <div className='flex flex-wrap gap-4 mb-6'>
                        <TextField
                            label='Name'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label='Brand'
                            select
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={brand}
                            onChange={handleBrandChange}
                        >
                            <MenuItem value='iPhone'>iPhone</MenuItem>
                            <MenuItem value='Samsung'>Samsung</MenuItem>
                            <MenuItem value='Huawei'>Huawei</MenuItem>
                            <MenuItem value='Xiaomi'>Xiaomi</MenuItem>
                            <MenuItem value='Nokia'>Nokia</MenuItem>
                            <MenuItem value='Sony'>Sony</MenuItem>
                            <MenuItem value='Google'>Google</MenuItem>
                        </TextField>
                        <TextField
                            label='Price'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='flex-1 min-w-[250px]'>
                        <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>
                            Description
                        </label>
                        <textarea
                            id='description'
                            className='w-full p-2 h-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Enter the description here...'
                        ></textarea>
                        <TextField
                            label='Image URL'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <TextField
                            label='Ram'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={ram}
                            onChange={(e) => setRam(e.target.value)}
                        />
                        <TextField
                            label='Storage'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={storage}
                            onChange={(e) => setStorage(e.target.value)}
                        />
                        <TextField
                            label='Battery'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={battery}
                            onChange={(e) => setBattery(e.target.value)}
                        />
                        <TextField
                            label='Screen Size'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={screenSize}
                            onChange={(e) => setScreenSize(e.target.value)}
                        />
                        <TextField
                            label='Camera'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={camera}
                            onChange={(e) => setCamera(e.target.value)}
                        />
                        <TextField
                            label='Processor'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={processor}
                            onChange={(e) => setProcessor(e.target.value)}
                        />
                        <TextField
                            label='OS'
                            type='text'
                            className='flex-1 min-w-[250px]'
                            variant='outlined'
                            value={os}
                            onChange={(e) => setOs(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-gray-800 hover:bg-gray-700 py-2 px-6 text-white font-semibold shadow-md hover:shadow-lg rounded-lg'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
