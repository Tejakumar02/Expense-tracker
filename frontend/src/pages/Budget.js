import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Budget = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, [])

    return (
        <>
           Budget Tracker
        </>
    )
}

export default Budget