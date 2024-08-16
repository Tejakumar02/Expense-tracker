import { useState } from "react"
import { useExpenseContext } from "../../hooks/useExpenseContext";
import axios from "axios";
import Date from '../../assets/date.svg';
import Place from '../../assets/place.svg';
import Amount from '../../assets/amount.svg';
import ToastModal from "../ToastModal/ToastModal";

const ExpenseForm = () => {
    const { dispatch } = useExpenseContext()

    const [date, setDate] = useState('')
    const [place, setPlace] = useState('')
    const [amount, setAmount] = useState('')
    const [emptyFields, setEmptyFields] = useState([]);
    const [toast, setToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expense = { date, place, amount }

        try {
            const response = await axios.post(`${process.env.REACT_APP_APPLICATION_URL}/api/overview`, expense, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                const result = await response.data
                setDate('');
                setPlace('');
                setAmount('');
                setEmptyFields([]);
                setToast(true);
                setToastType('success');
                setToastMessage('Expense added successfully');
                dispatch({type: 'CREATE_EXPENSES', payload: result})
            }
        } catch (err) {
            console.log(err)
            if (err.response) {
                const { status, data } = err.response;
                if (status === 400) {
                    setToast(true);
                    setToastType('error');
                    setToastMessage('Please Fill all the fields');
                    setEmptyFields(data.emptyFields);
                } else {
                    setToast(true);
                    setToastType('error');
                    setToastMessage('An Unexpected error occured');
                }
            }
            else {
                setToast(true);
                setToastType('error');
                setToastMessage('Network error');
            }
        }       
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="label">
                    <img src={Date} />
                    <label>Date: </label>
                </div>
                <input type="text" onChange={(e) => setDate(e.target.value)} value={date} placeholder="Date"
                    className={emptyFields.includes('Date') ? 'error' : ''} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}  />
            </div>
            <div>
                <div className="label">
                    <img src={Place} />
                    <label>Place: </label>
                </div>
                <input type="text" onChange={(e) => setPlace(e.target.value)} value={place} placeholder="Place"
                    className={emptyFields.includes('Place') ? 'error' : ''} />
            </div>
            <div>
                <div className="label">
                    <img src={Amount} />
                    <label>Amount: </label>
                </div>
                <input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Amount"
                    min="0" className={emptyFields.includes('Amount') ? 'error' : ''} />
            </div>
            {toast && <ToastModal message={toastMessage} hideModal={() => setToast(false)} type={toastType} />}
            <button>Add Expense</button>
        </form>
    )
}

export default ExpenseForm;