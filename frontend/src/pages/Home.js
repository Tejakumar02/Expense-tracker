import { useEffect, useState } from "react";
import ExpenseViewForm from "../components/ExpenseViewForm/ExpenseViewForm";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Collapse from '../assets/dropup.svg';
import Expand from '../assets/dropdown.svg';
import Filter from '../assets/filter.svg';
import Create from '../assets/create.svg';
import Setting from '../assets/settings.svg'
import Year from '../assets/total-money.svg';
import Month from '../assets/total-month.svg';
import { checkTokenExpiry, totalExpenses, findCurrentMonth, findCurrentMonthExpenses } from "../helpers/common";
import PaginatedExpenses from "../components/PaginatedExpenses/PaginatedExpenses";
import Settings from "./Settings";

const Home = () => {
    const {expenses, dispatch} = useExpenseContext();
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showViewForm, setShowViewForm] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }

        const tokenExpired = checkTokenExpiry();

        if (tokenExpired) { 
            navigate('/signin');
        }

        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_APPLICATION_URL}/api/overview/expenses`, {
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
        fetchExpenses();
    }, [dispatch])

    const expenseForm = () => {
        setShowExpenseForm(prevState => !prevState);
    }

    const viewForm = () => {
        setShowViewForm(prevState => !prevState)
    }
    
    const settingsForm = () => {
        setShowSettings(prevState => !prevState)
    }

    return(
        <>
            <div className='home'>
                <div className="container">
                    {expenses && <div className="list-expenses">
                        <PaginatedExpenses expenses={expenses}/>
                    </div>}
                    <div className="widgets">
                        <div className="total-expenses-widget">
                            {expenses && <div className="total-expenses">
                                <img src={Year}/>
                                <div>                                    
                                    <h3>₹{totalExpenses(expenses)}</h3>
                                    <p>Total Expenses</p>
                                </div>
                            </div>}
                            {expenses && <div className="current-month-expenses">
                                <img src={Month}/>
                                <div>
                                    <h3>₹{findCurrentMonthExpenses(expenses)}</h3>
                                    <p>{findCurrentMonth()} Expenses </p>
                                </div>
                            </div>}
                        </div>
                        <div className="expenses-container">
                            <div className="header">
                                <div>
                                    <img src={Filter} />
                                    {!showViewForm ? <h4>Filter Expenses</h4> : <h4>Filter By Date</h4>}
                                </div>
                                <img onClick={viewForm} src={showViewForm ? Collapse : Expand}/>
                            </div>
                            <div className="content">
                                {showViewForm && <ExpenseViewForm expense={expenses}/>}
                            </div>
                        </div>
                        <div className="expenseform-container">
                            <div className="header">
                                <div>
                                    <img src={Create} />
                                    {!showExpenseForm ? <h4>Create a Expense</h4> : <h4>Add Your Expense</h4>}
                                </div>
                                <img onClick={expenseForm} src={showExpenseForm ? Collapse : Expand}/>
                            </div>
                            <div className="content">
                                {showExpenseForm && <ExpenseForm />}
                            </div>
                        </div>
                        <div className="settings-container">
                            <div className="header">
                                <div>
                                    <img src={Setting} />
                                    {!showSettings ? <h4>Account Settings</h4> : <h4>Change Password</h4> }
                                </div>
                                <img onClick={settingsForm} src={showSettings ? Collapse : Expand}/>
                            </div>
                            <div className="content">
                                {showSettings && <Settings />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home;