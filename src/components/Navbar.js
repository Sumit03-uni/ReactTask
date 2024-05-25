
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
    const handleProduct = () => {
        navigate('/products');
    }

    const handleCart = () => {
        navigate('/cart');
    }

    return (
        <div>
            <nav>
                <h2>ShopPing</h2>
                <ul>
                    {!auth ? <li>Welcome To ShopPing Clone App</li>: null }
                    {auth && <li>Welcome, {email}</li>}
                    {auth ? <li onClick={handleProduct}>Products</li> : null}
                    {auth ? <li onClick={handleCart}>Cart ({cartCount})</li> : null} 
                    {auth ? <li onClick={handleLogout}>Logout</li> : null}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
