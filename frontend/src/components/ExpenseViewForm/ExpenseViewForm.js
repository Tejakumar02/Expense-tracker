import React, { useState, useEffect } from 'react';
import { filterExpenses } from '../../helpers/common'
import { useExpenseContext } from '../../hooks/useExpenseContext';
import ToastModal from '../ToastModal/ToastModal';

const ExpenseViewForm = ({ expense }) => {
    const {dispatch} = useExpenseContext(); 
    const [fromDate, setFromDate] = useState('')
    const [toDate, SetToDate] = useState('');
    const [originalExpenses] = useState(expense);
    const [toast, setToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateInputFields(fromDate, toDate)) {
            return;
        }

        const condition = { fromDate, toDate };
        const filtered = filterExpenses(expense, condition);
        dispatch({type:'SET_EXPENSES', payload: filtered}) 
    };

    const handleReset = () => {
        setFromDate('');
        SetToDate('');
        dispatch({ type: 'SET_EXPENSES', payload: originalExpenses });
    };

    const validateInputFields = (fromDate, toDate) => {
        let valid = true;
        if (!fromDate || !toDate) {
            setToast(true);
            setToastType('error');
            setToastMessage('Please enter the dates');
            valid = false;
            return;
        }
        return valid;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='FROM' value={fromDate} onChange={(e) => setFromDate(e.target.value)} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    <input type='text' placeholder='TO' value={toDate} onChange={(e) => SetToDate(e.target.value)} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                </div>
                <div>
                    <button type="submit">View</button>
                    <button type="button" onClick={handleReset}>Clear</button>
                </div>
                {toast && <ToastModal message={toastMessage} hideModal={() => setToast(false)} type={toastType} />}
            </form>
        </>
    )
}

export default ExpenseViewForm