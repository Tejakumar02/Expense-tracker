import { Link, useNavigate, useLocation } from "react-router-dom"
import { removeToken } from "../hooks/handleToken";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const location = useLocation();

    const handleLogout = () => {
        removeToken('token');
        navigate('/signup');
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Expense Tracker</h1>
                </Link>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    location.pathname === '/signin' ? (
                        <Link to="/signup"><p>SignUp</p></Link>
                    ) : (
                        <Link to="/signin"><p>SignIn</p></Link>
                    )
                )}
            </div>
        </header>
    )
}

export default Navbar;