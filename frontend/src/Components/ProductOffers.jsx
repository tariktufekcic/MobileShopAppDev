import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductOffers = ({ productId, productName }) => {
    const [offers, setOffers] = useState([]);
    const [isSold, setIsSold] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/of/offers/${productId}`);
                const filteredOffers = response.data.filter(offer => !offer.isDeleted); // Filtriraj obrisane ponude
                if (filteredOffers.length > 0) {
                    setOffers(filteredOffers);
                }
    
                const productResponse = await axios.get(`http://localhost:8080/products/${productId}`);
                setIsSold(productResponse.data.isSold);
            } catch (error) {
                console.error('Error fetching offers or product:', error);
            }
        };
    
        fetchOffers();
    }, [productId]);

    const handleAcceptOffer = async (offerId) => {
        try {
            await axios.put(`http://localhost:8080/of/offer/${offerId}`, { status: 'Accepted' });
            alert('Offer accepted');
            setOffers(prevOffers => 
                prevOffers.map(offer => 
                    offer._id === offerId ? { ...offer, status: 'Accepted' } : offer
                )
            );
            await axios.put(`http://localhost:8080/products/${productId}`, { isSold: true });
            setIsSold(true);
        } catch (error) {
            alert('Failed to accept offer');
        }
    };

    const handleRejectOffer = async (offerId) => {
        try {
            await axios.put(`http://localhost:8080/of/offer/${offerId}`, { status: 'Rejected' });
            alert('Offer rejected');
            setOffers(prevOffers => prevOffers.filter(offer => offer._id !== offerId));
        } catch (error) {
            alert('Failed to reject offer');
        }
    };
    const handleDeleteOffer = async (offerId) => {
        try {
            await axios.put(`http://localhost:8080/of/offer-d/${offerId}`, { isDeleted: true });
            alert('Offer removed from view');
            setOffers(prevOffers => prevOffers.filter(offer => offer._id !== offerId));
        } catch (error) {
            alert('Failed to delete offer');
        }
    };
    

    // Proveri da li postoje ponude, ako ne, vrati null (ne prikazuje ništa)
    if (offers.length === 0) {
        return null;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            

            {isSold && <p className="text-red-600 font-bold mb-4">Sold</p>}

            <h3 className="text-lg font-semibold mb-4 text-gray-700">Offers for {productName}</h3>
            <ul className="space-y-4">
                {offers.map((offer) => (
                    <li key={offer._id} className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500 text-xl">{offer.userId.username.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{offer.userId.username}:</p>
                                <p className="mt-1 text-gray-600">{offer.offerText}</p>
                                <p className="mt-2 text-gray-500">Status: {offer.status || 'Pending'}</p>
                            </div>
                        </div>
                        {offer.status === 'Pending' ? (
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => handleAcceptOffer(offer._id)}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-150 ease-in-out"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleRejectOffer(offer._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-150 ease-in-out"
                                >
                                    Reject
                                </button>
                            </div>
                        ) : offer.status === 'Accepted' ? (
                            <div className="mt-4">
                                <button
                                    onClick={() => handleDeleteOffer(offer._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-150 ease-in-out"
                                >
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductOffers;
