import React, { useState } from 'react';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';

const PaginatedExpenses = ({ expenses }) => {
    // Number of expenses per page
    const itemsPerPage = 5;
    // Total number of pages
    const totalPages = Math.ceil(expenses.length / itemsPerPage);
    
    // State for the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the expenses to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentExpenses = expenses.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div>
                {currentExpenses.map((expense) => (
                    <ExpenseDetails key={expense._id} expense={expense} />
                ))}
            </div>
            <div className='navigation-controls'>
                {/* Page navigation controls */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    PREVIOUS
                </button>
                {/* {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))} */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
};

export default PaginatedExpenses;