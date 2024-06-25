import { useState } from "react"
import { useExpenseContext } from "../hooks/useExpenseContext";

const ExpenseForm = () => {
    const { dispatch } = useExpenseContext()

    const [date, setDate] = useState('')
    const [place, setPlace] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expense = { date, place, amount }
        const response = await fetch('api/overview', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()

        if(response.ok) {
            setDate('');
            setPlace('');
            setAmount('');
            setError(null);
            setEmptyFields([]);
            console.log("Added a new expense", result)
            dispatch({type: 'CREATE_EXPENSES', payload: result})
        } 
        else {
            setError(result.error);
            setEmptyFields(result.emptyFields);
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Expense</h3>

            <label>Date: </label>
            <input 
                type="text"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyFields.includes('Date') ? 'error' : ''}
            />

            <label>Place: </label>
            <input 
                type="text"
                onChange={(e) => setPlace(e.target.value)}
                value={place}
                className={emptyFields.includes('Place') ? 'error' : ''}
            />

            <label>Amount: </label>
            <input 
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes('Amount') ? 'error' : ''}
            />

            <button>Add Expense</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ExpenseForm;