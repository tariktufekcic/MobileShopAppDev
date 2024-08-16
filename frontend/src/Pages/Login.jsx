import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 


  const handleLogin = async (e) => {
  e.preventDefault();
    


    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: name,
        password,
      } );
      
      

      const { token, userId } = response.data;

      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId)
      
      navigate(`/user-products/${userId}`);
      
      
    } catch (error) {


        setError(error.response?.data?.message || 'Username or password incorrect');
    }
  
  };

  const onBack = () => {
    navigate('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <button 
      
      className="absolute top-10 left-10 text-gray-500 hover:text-gray-700"
      onClick={onBack}
      >{<ArrowBackIcon/>} Back</button>
      
      <div className="p-8 w-full max-w-md shadow-2xl rounded-2xl bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input className="border-2 border-gray-300 w-full h-12 px-4 py-2 rounded-2xl focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
          <input
            className="border-2 border-gray-300 w-full h-12 px-4 py-2 rounded-2xl focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
  className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
          >
            Login
          </button>
          <div
          className='flex justify-between'
          style={{color: 'gray', fontWeight: 'lighter'}}
          >
          <p>Don't have an account?</p>
          <a 
          
          href='/registration'>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
