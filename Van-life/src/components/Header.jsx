import { Link, NavLink, useNavigate } from 'react-router-dom';
import Profile from "../assets/user.png"

export default function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        navigate("/login");
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="/host"
                    className={({isActive}) => isActive ? "active-link" : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="/about"
                    className={({isActive}) => isActive ? "active-link" : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="/vans"
                    className={({isActive}) => isActive ? "active-link" : null}
                >
                    Vans
                </NavLink>
                {
                    localStorage.getItem("loggedIn") ? 
                    <button 
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>
                    :
                    <Link to="/login" className="login-link">
                        <img src={ Profile } alt='user-icon' className="login-icon" />
                    </Link>
                }
            </nav>
        </header>
    )
}