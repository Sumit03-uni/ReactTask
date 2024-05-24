
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
    const navigate = useNavigate();
    const auth = sessionStorage.getItem('auth');
    const email = sessionStorage.getItem('email');

    const handleLogout = () => {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('email');
        navigate('/login');
    };

    return (
        <div>
            <nav>
                <ul>
                    {auth && <li>Welcome, {email}</li>}
                    <li>Cart ({cartCount})</li>
                    {auth ? <li onClick={handleLogout}>Logout</li> : null}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
