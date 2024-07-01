import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiry } from '../hooks/handleToken';

const SignIn = () => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/overview/signin', { userName, password });

            if (response.status === 200) {
                const token = response.data.token;
                setTokenWithExpiry('token', token); 
                navigate('/home'); 
              } else {
                console.error('Token not received in response');
              }
        }
        catch(error) {
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Username' value={userName} onChange={(e) => setUsername(e.target.value)} required/>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type='submit'>SignIn</button>
        </form>
    )
}

export default SignIn