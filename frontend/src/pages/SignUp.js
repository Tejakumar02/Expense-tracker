import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry, validatePassword, isValidPassword } from '../helpers/common';
import BgImage from '../assets/signup.svg';
import Logo from '../assets/logo.svg';
import Show from '../assets/show.svg';
import Hide from '../assets/hide.svg';
import ToastModal from '../components/ToastModal/ToastModal';

const Signup = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!onSubmit()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/overview/signup`, { userName, password });

      if (response.status === 200) {
        setToast(true);
        setToastType('success');
        setToastMessage(response.data.msg);
        const token = await response.data.token;
        setTokenWithExpiry('token', token);
        setTimeout(() => {
          navigate('/home');
      }, 1000);
      } else {
        console.error('Token not received in response');
      }
    } 
    catch (error) {
      if (error.response && error.response.status === 400) {
        setToast(true);
        setToastType('error');
        setToastMessage(error.response.data.msg);
      }
      else {
          setToast(true);
          setToastType('error');
          setToastMessage("Network Error");
      }
    }
  }

  const onSubmit = () => {
    let valid = true;
    const validUserName = isValidUserName(userName);
    const validPassword = isValidPassword(password);
    const paswordMismatch = validatePassword(password, confirmPassword);

    if (validUserName)  {
      setToast(true);
      setToastType('error');
      setToastMessage('Username should have atleast 5 characters');
      valid = false;
      return;
    }
    if (validPassword) {
      setToast(true);
      setToastType('error');
      setToastMessage('Password should have atleast 8 characters');
      setPassword('');
      setConfirmPassword('');
      valid = false;
      return;
    }
    if (paswordMismatch) {
      setToast(true);
      setToastType('error');
      setToastMessage('Password mismatch, enter same passwords in both fields');
      setConfirmPassword('');
      valid = false;
      return;
    }
    return valid;
  }

  const isValidUserName = (userName) => {
    if(userName.length > 4) {
      return false
    }
    return true
  }

  const passwordVisibility = () => {
    setShowPassword(prevState => !prevState);
  }

  return (
    <div className='authentication'>
      <header>
        <img className='logo' src={Logo}/>
        <button onClick={() => navigate('/signin')}>SIGN IN</button>
      </header>
      <div className='content'>
        <img src={BgImage} />
        <form onSubmit={handleSubmit}>
          <h2>Track N Spend</h2>
          <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
          <div className='set-password-container'>
            <input type= {showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={showPassword ? Hide : Show} onClick={passwordVisibility} />
          </div>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {toast && <ToastModal message={toastMessage} hideModal={() => setToast(false)} type={toastType} />}
          <button type="submit">SIGN   UP</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
