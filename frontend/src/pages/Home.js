import { useEffect } from "react";
import ExpenseDetails from '../components/ExpenseDetails';
import ExpenseForm from "../components/ExpenseForm";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {expenses, dispatch} = useExpenseContext();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("/api/overview/expenses")

                if(response.ok) {
                    const result = await response.json()
                    dispatch({type:'SET_EXPENSES', payload: result}) 
                }
            }
            catch(error) {
                console.error("Error while fetching the data", error);
            }
        };
        if (!token) {
            navigate('/signin');
        }
        fetchExpenses();
    }, [dispatch])

    return(
        <div className='home'>
            <div className="expenses">
                {expenses && expenses.map((expense) => (
                    <ExpenseDetails key={expense._id} expense={expense}/>
                ))}
            </div>
            <ExpenseForm />
        </div>
    )
}

export default Home;