import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry } from '../helpers/common';
import BgImage from '../assets/background-image.jpg';
import Logo from '../assets/dark-logo.jpg'
import ShowPWD from '../assets/show.svg'
import HidePWD from '../assets/hide.svg'


const SignIn = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/overview/signin`, { userName, password });

            if (response.status === 200) {
                const token = response.data.token;
                const name = response.data.userName;
                sessionStorage.setItem('name', name);
                setTokenWithExpiry('token', token); 
                navigate('/home'); 
              }
        }
        catch(error) {
            console.log(error)
            if (error.response.status === 400) {
                setError(true);
                setErrorMessage(error.response.data.msg)
            }
        }
    }

    const passwordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    return(
        <div className='authentication'>
            <img src={BgImage} />
            <header>
                <img className='logo' src={Logo}/>
                <button onClick={() => navigate('/signup')}>SIGN UP</button>
            </header>
            <form onSubmit={handleSubmit}>
                <h2>SIGN IN TO EXGO</h2>
                <input type='text' placeholder='Username' value={userName} onChange={(e) => setUsername(e.target.value)} required/>
                <div className='password-container'>
                    <input type={ showPassword ? 'text' : 'password' } placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <img src={ showPassword ? ShowPWD : HidePWD } onClick={passwordVisibility}/>
                </div>
                {error && <div className='error'>{errorMessage}</div>}
                <button type='submit'>SIGN IN</button>
            </form>
        </div>
    )
}

export default SignIn