import React, { useState, useEffect, useRef } from 'react';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';

const PaginatedExpenses = ({ expenses }) => {
    const itemsPerPage = 10; // Number of expenses to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedExpenses, setDisplayedExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    // Load initial expenses
    useEffect(() => {
        const initialExpenses = expenses.slice(0, itemsPerPage);
        setDisplayedExpenses(initialExpenses);
    }, [expenses]);

    // Function to load more expenses
    const loadMoreExpenses = () => {
        if (loading || currentPage * itemsPerPage >= expenses.length) return;
        
        setLoading(true);
        const nextPage = currentPage + 1;
        const newExpenses = expenses.slice(0, nextPage * itemsPerPage);
        setDisplayedExpenses(newExpenses);
        setCurrentPage(nextPage);
        setLoading(false);
    };

    // Set up Intersection Observer for infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreExpenses();
                }
            },
            {
                rootMargin: '100px',
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading, currentPage, expenses]);

    return (
        <div>
            <div>
                {displayedExpenses.map((expense) => (
                    <ExpenseDetails key={expense._id} expense={expense} />
                ))}
            </div>
            <div
                ref={observerRef}
                style={{ height: '20px', backgroundColor: 'transparent' }} // Invisible but necessary for observer
            >
                {loading && <p>Loading more expenses...</p>}
            </div>
        </div>
    );
};

export default PaginatedExpenses;
