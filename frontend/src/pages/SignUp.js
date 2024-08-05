import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry } from '../helpers/common';
import BgImage from '../assets/background-img.jpg';
import Logo from '../assets/dark-logo.jpg';

const Signup = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/overview/signup`, { userName, password });

      if (response.status === 200) {
        const token = await response.data.token;
        setTokenWithExpiry('token', token);
        navigate('/home');
      } else {
        console.error('Token not received in response');
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response.data.msg)
      navigate('/signup');
    }
  }

  const onClick = () => {
    const paswordMismatch = validatePassword(password, confirmPassword)
    if (paswordMismatch) {
      setError(true);
      setErrorMessage('Password mismatch, enter same passwords in both fields')
      setPassword('');
      setConfirmPassword('');
    }
  }

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return true;
    }
    return false; 
}

const handlePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value, confirmPassword);
}

const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(password, e.target.value);
}

  return (
    <div className='authentication'>
      <img src={BgImage} />
      <header>
        <img className='logo' src={Logo}/>
        <button onClick={() => navigate('/signin')}>SIGN IN</button>
      </header>
      <form onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} required/>
        <input type="password" placeholder="Enter Password" value={password} onChange={handlePassword} required/>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword} required/>
        {error && <div className='error'>{errorMessage}</div>}
        <button onClick={onClick} type="submit">CREATE AN ACCOUNT</button>
      </form>
    </div>
  );
};

export default Signup;
