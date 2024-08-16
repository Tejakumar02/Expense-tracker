import React, { useState } from 'react';
import { filterExpenses } from '../../helpers/common'
import { useExpenseContext } from '../../hooks/useExpenseContext';

const ExpenseViewForm = ({ expense }) => {
    const {dispatch} = useExpenseContext(); 
    const [fromDate, setFromDate] = useState('')
    const [toDate, SetToDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const condition = { fromDate, toDate };
        const filtered = filterExpenses(expense, condition);
        dispatch({type:'SET_EXPENSES', payload: filtered}) 
    };

    const handleReset = () => {
        setFromDate('');
        SetToDate('');
        window.location.reload();
    };

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
            </form>
        </>
    )
}

export default ExpenseViewForm