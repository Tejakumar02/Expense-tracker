import { useExpenseContext } from "../hooks/useExpenseContext";

const ExpenseDetails = ({expense}) => {

    const { dispatch } = useExpenseContext();

    const handleClick = async () => {
        const response = await fetch('api/overview/' + expense._id, {
            method: 'DELETE'
        })

        if(response.ok) {
            const result = await response.json()
            dispatch({type:'DELETE_EXPENSE', payload: result})
        }
        
    }

    return(
        <div className="expense-details">
            <h4>{expense.place}</h4>
            <p><strong>Date: </strong>{expense.date}</p>
            <p><strong>Amount(Rs.): </strong>{expense.amount}</p>
            <span onClick={handleClick}> Delete</span>
        </div>
    )
}

export default ExpenseDetails;