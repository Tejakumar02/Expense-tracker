export function setTokenWithExpiry(key, token) {
    const now = new Date();
    const expiryTime = now.getTime() +  60 * 60 * 1000;

    const item = {
      token: token,
      expiry: expiryTime
    };

    sessionStorage.setItem(key, JSON.stringify(item));
};

export function removeToken() {
	sessionStorage.clear();
};

export function formatDate(value) {
	const date = new Date(value);
	const ISODate = date.toISOString();

	const [year, month, day] = ISODate.split('T')[0].split('-');
	return `${day}/${month}/${year}`
}

export function checkTokenExpiry () {
    const token = sessionStorage.getItem('token');
    if (!token) {
        return false;
    }

    const tokenData = JSON.parse(token);
    const now = new Date().getTime();
    if (now > tokenData.expiry) {
        sessionStorage.clear();
        return true;
    }

    return false;
};

export function filterExpenses(expenses, condition) {
    const { fromDate, toDate } = condition

    return expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= new Date(fromDate) && expenseDate <= new Date(toDate);;
    });
}

export function totalExpenses(expenses) {
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return 0;
    }

    const total = expenses.reduce((accumulator, expense) => {
        return accumulator + (expense.amount || 0);
    }, 0);

    return total
}

export function validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return true;
    }
    return false; 
}

export function isValidPassword(password) {
    if(password.length > 7) {
      return false
    }
    return true
}

export function isNotNull(value) {
    if(value === '' || value === undefined) {
        return true
    }
    return false
}

export function findCurrentMonth() {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const currentMonth = month[date.getMonth()];
    return currentMonth;
}

export function findCurrentMonthExpenses(expenses) {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const currentMonthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date.split('/').reverse().join('-')); // Convert DD/MM/YYYY to YYYY-MM-DD
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const total = totalExpenses(currentMonthExpenses);
    return total;
}