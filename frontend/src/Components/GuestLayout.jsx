import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Footer from './Footer';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const GuestLayout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    useEffect(() => {
        
        const term = localStorage.getItem('searchTerm');
            setSearchTerm(term || '');

        
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products/all-products');
                    setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
                    setFilteredProducts(filtered);
                        setShowDropdown(true);
        } else {
            setFilteredProducts([]);
        setShowDropdown(false);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        
        if (location.pathname === '/') {
            setSearchTerm('');
            localStorage.removeItem('searchTerm');
        }
    }, [location]);

    const handleAdd = () => {
        navigate('/login');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDropdownClick = (product) => {
        
        console.log(`Selected product: ${product.name}`);
        setSearchTerm('');
        setShowDropdown(false);

        
        localStorage.setItem('searchTerm', searchTerm);
        
        navigate('/search-results');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            
            if (filteredProducts.length > 0) {
                handleDropdownClick(filteredProducts[0]); 
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full bg-gray-300 shadow-md fixed top-0 z-50">
                <nav className="flex flex-col h-20">
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-300">
                        <h2 className="text-gray-800 text-2xl font-semibold">Mob Shop</h2>

                        <div className="relative flex-1 mx-4">
                            <input
                                className="w-full h-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
                                    type="search"
                                        placeholder="Search product"
                                            aria-label="Search products"
                                                value={searchTerm}
                                                    onChange={handleSearchChange}
                                                        onFocus={() => setShowDropdown(true)}
                                                            onKeyDown={handleKeyDown}
                                                                />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                            {showDropdown && (
                                <div ref={dropdownRef} className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map(product => (
                                            <div
                                                key={product.id}
                                                    className="p-4 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleDropdownClick(product)}
                                            >
                                                <h4 className="text-sm font-bold">{product.name}</h4>
                                                <p className="text-gray-600 text-sm">Brand: {product.brand}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-gray-600">No products found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Link to="/login">
                                <button className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-lg transition duration-300 shadow-sm">
                                    Login
                                </button>
                            </Link>
                            <Link to="/registration">
                                <button className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-lg transition duration-300 shadow-sm">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-6 bg-gray-200 text-gray-800 h-12">
                        <div className="flex gap-6 text-lg">
                            <Link to="/" className="hover:text-gray-600 transition duration-300">Home</Link>
                            <Link to="/aboutus" className="hover:text-gray-600 transition duration-300">About Us</Link>
                            
                        </div>

                        <button
                            onClick={handleAdd}
                                className="flex items-center text-white px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition duration-300"
                                    aria-label="Add"
                                        >
                            <AddIcon className="text-white mr-2" />
                            <span>Add</span>
                        </button>
                    </div>
                </nav>
            </header>
            <main className="flex-grow bg-gray-100 pt-32">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default GuestLayout;
