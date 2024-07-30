export const setTokenWithExpiry = (key, token) => {
    const now = new Date();
    const expiryTime = now.getTime() +  60 * 60 * 1000;

    const item = {
      token: token,
      expiry: expiryTime
    };

    sessionStorage.setItem(key, JSON.stringify(item));
};

export const removeToken = () => {
	sessionStorage.clear();
};

export const formatDate = (value) => {
	const date = new Date(value);
	const ISODate = date.toISOString();

	const [year, month, day] = ISODate.split('T')[0].split('-');
	return `${day}/${month}/${year}`
}

export const checkTokenExpiry = () => {
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
