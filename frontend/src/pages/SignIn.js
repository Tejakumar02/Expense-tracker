import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry } from '../helpers/common';
import BgImage from '../assets/signin.svg';
import Logo from '../assets/logo.svg'
import Show from '../assets/show.svg'
import Hide from '../assets/hide.svg'
import ToastModal from '../components/ToastModal/ToastModal';

const SignIn = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/overview/signin`, { userName, password });

            if (response.status === 200) {
                setToast(true);
                setToastType('success');
                setToastMessage(response.data.msg);
                const token = response.data.token;
                const name = response.data.userName;
                sessionStorage.setItem('name', name);
                setTokenWithExpiry('token', token); 
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
        }
        catch(error) {
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

    const passwordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    return(
        <div className='authentication'>
            <header>
                <img className='logo' src={Logo}/>
                <button onClick={() => navigate('/signup')}>SIGN UP</button>
            </header>
            <div className='content'>
                <img src={BgImage} />
                <form onSubmit={handleSubmit}>
                    <h2>Track N Spend</h2>
                    <input type='text' placeholder='Username' value={userName} onChange={(e) => setUsername(e.target.value)} />
                    <div className='password-container'>
                        <input type={ showPassword ? 'text' : 'password' } placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <img src={ showPassword ? Hide : Show } onClick={passwordVisibility}/>
                    </div>
                    {toast && <ToastModal message={toastMessage} hideModal={() => setToast(false)} type={toastType} />}
                    <button type='submit'>SIGN IN</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn