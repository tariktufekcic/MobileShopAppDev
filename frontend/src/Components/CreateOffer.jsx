import React, { useState } from 'react';
import axios from 'axios';

const CreateOffer = ({ productId }) => {
    const [offerText, setOfferText] = useState('');

    const handleSendOffer = async () => {
        const userId = localStorage.getItem('userId');
    
        try {
            await axios.post('http://localhost:8080/of/create-offer', { productId, userId, offerText });
            alert('Offer sent successfully');
            setOfferText('');
        } catch (error) {
            alert('Failed to send offer');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create Offer</h2>
            <textarea
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                placeholder="Write your offer..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
                onClick={handleSendOffer}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
                Send Offer
            </button>
        </div>
    );
};

export default CreateOffer;
