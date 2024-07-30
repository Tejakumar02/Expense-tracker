import { useEffect, useState } from "react";
import ExpenseViewForm from "../components/ExpenseViewForm/ExpenseViewForm";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import ExpenseDetails from "../components/ExpenseDetails/ExpenseDetails";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hide from '../assets/collapse.svg';
import Show from '../assets/expand.svg';
import { checkTokenExpiry } from "../helpers/common";
import PaginatedExpenses from "../components/PaginatedExpenses/PaginatedExpenses";

const Home = () => {
    const {expenses, dispatch} = useExpenseContext();
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showViewForm, setShowViewForm] = useState(false);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExpired = checkTokenExpiry();
        if (tokenExpired) { 
            navigate('/signin');
        }

        const fetchExpenses = async () => {
            try {
                const response = await axios.get("/api/overview/expenses", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200) {
                    const result = await response.data
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

    const expenseForm = () => {
        setShowExpenseForm(prevState => !prevState);
    }

    const viewForm = () => {
        setShowViewForm(prevState => !prevState)
    }
    return(
        <>
            <div className='home'>
                <div className="container">
                    <div className="expenses-container">
                        <div className="header">
                            <h4>FILTER EXPENSES</h4>
                            <img onClick={viewForm} src={showViewForm ? Hide : Show}/>
                        </div>
                        <div className="content">
                            {showViewForm && <ExpenseViewForm expense={expenses}/>}
                        </div>
                    </div>
                    <div className="expenseform-container">
                        <div className="header">
                            <h4>CREATE NEW EXPENSE</h4>
                            <img onClick={expenseForm} src={showExpenseForm ? Hide : Show}/>
                        </div>
                        <div className="content">
                            {showExpenseForm && <ExpenseForm />}
                        </div>
                    </div>
                </div>
                {/* {expenses && <div className="list-expenses">
                    {expenses.map((expense) => (
                        <ExpenseDetails key={expense._id} expense={expense} />
                    ))}
                </div>} */}
                {expenses && <div className="list-expenses">
                    <PaginatedExpenses expenses={expenses}/>
                </div>}
            </div>
        </>

    )
}

export default Home;