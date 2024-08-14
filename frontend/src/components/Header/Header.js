import { Link, useNavigate } from "react-router-dom"
import { removeToken } from "../../helpers/common";

const Header = () => {
    const navigate = useNavigate();
    const name = sessionStorage.getItem('name');

    const handleLogout = () => {
        removeToken();
        navigate('/signin');
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>Welcome {name}!</h2>
                </Link>
                <button onClick={handleLogout}>LOGOUT</button>
            </div>
        </header>
    )
}

export default Header;