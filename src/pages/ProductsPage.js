import React from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = ({ products, handleAddToCartClick, cart, totalPrice }) => {
    const navigate = useNavigate();

    const handleAddToCartAndNavigate = (product) => {
        handleAddToCartClick(product);
        navigate('/cart');
      };

    return (
        <div>
            <h1>Products</h1>
            <div className="containors">
                <div className="children">
                    {products.map((product) => (
                        <div key={product.id} className="product">
                            <img src={product.image} alt={product.name} />
                            <h5>{product.title.slice(0, 15)}</h5>
                            <p>{product.description.slice(0, 30)}</p>
                            <p>${product.price}</p>
                            <button onClick={() => handleAddToCartAndNavigate(product)}>
                                {cart.find(item => item.id === product.id) ? 'Go to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))};
                </div>
            </div>
            <h3>Total: ${totalPrice.toFixed()}</h3>
        </div>
    );
};

export default ProductPage;