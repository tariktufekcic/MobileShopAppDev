import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Footer from './Footer';

const UserLayout = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
            try {
              const response = await axios.get(`http://localhost:8080/users/profile/${storedUserId}`);
                setUsername(response.data.username);
        }         catch (error) {
                    console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSearchClick = () => {
    if (searchTerm.trim()) { 
      navigate(`/a/${userId}/search-results?query=${searchTerm}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-gray-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Mobile Shop</h1>
          <nav className="flex space-x-4 gap-4 items-center">
            <div className="flex flex-row w-3/6 justify-center relative">
              <input
                className="shadow appearance-none border rounded-2xl text-black h-10 p-4 w-full focus:outline-none pl-9"
                  type="search"
                    placeholder="Search product"
                      value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSearchClick(); 
                  }
                }}
              />
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={handleSearchClick} 
                    />
                       </div>
            {userId && (
              <>
                <Link to={`/a/${userId}`} className="hover:underline">Home</Link>
                <Link to={`/a/profile/${userId}`} className="hover:underline whitespace-nowrap">{username ? `${username}` : ''}'s Profile</Link>
              </>
            )}

            <div className="relative">
              <button
                onClick={toggleDropdown}
                  className="hover:underline focus:outline-none"
              >
                Settings
                  </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to="/settings/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile Settings</Link>
                    <Link to="/settings/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account Settings</Link>
                    <Link to="/settings/billing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Billing</Link>
                  </div>
                </div>
              )}
            </div>
            <p
              className="hover:underline cursor-pointer"
                onClick={handleLogout}
            >
              Logout
            </p>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet /> 
        </main>
      <Footer/>
    </div>
  );
};

export default UserLayout;
