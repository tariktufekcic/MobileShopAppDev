import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      try {
        
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/users/create", {username, email, password});
        const { id: token } = response.data;
        const userId = response.data.id;
        localStorage.setItem('token', token);
       localStorage.setItem('userId', userId)
        if (userId) {
          navigate(`/profile/${userId}`);
        }
        else {
          console.error("FAIL")
        }
      } catch (error) {
        console.error("Error", error)
      }
  }
  const onBack = () => {
    navigate('/')
  }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <button 
      
      className="absolute top-10 left-10 text-gray-500 hover:text-gray-700"
      onClick={onBack}
      >{<ArrowBackIcon/>} Back</button>
  
      <div className="p-8 w-full max-w-md shadow-2xl rounded-lg bg-white border-2">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            className="border-2 border-gray-300 w-full h-12 px-4 py-2 rounded-2xl focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
  
          <input 
            className="border-2 border-gray-300 w-full h-12 px-4 py-2 rounded-2xl focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <input 
            className="border-2 border-gray-300 w-full h-12 px-4 py-2 rounded-2xl focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default Register;
