import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry } from '../hooks/handleToken';

const Signup = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/overview/signup', { userName, password });
      if (response.status === 200) {
        const token = response.data.token;
        setTokenWithExpiry('token', token);
        navigate('/home');
      } else {
        console.error('Token not received in response');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
