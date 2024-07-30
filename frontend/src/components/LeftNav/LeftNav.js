import React from "react";
import { Link } from "react-router-dom"

const LeftNav = () => {
    return (
        <nav>
            <div className="container">
                <Link to="/home">
                    <p>Expense</p>
                </Link>
                <Link to="/goal">
                    <p>Goal</p>
                </Link>
                <Link to="/budget">
                    <p>Budget</p>
                </Link>
            </div>
        </nav>
    )
}

export default LeftNav;