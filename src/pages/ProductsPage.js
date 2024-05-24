import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = ({ updateCartCount }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(
        () => JSON.parse(localStorage.getItem("cart")) || []
    );

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    const addToCart = (product) => {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartCount(updatedCart.length);
    };

    const updateQuantity = (index, quantity) => {
        const updatedCart = cart
            .map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + quantity } : item
            )
            .filter((item) => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartCount(updatedCart.length);
    };

    const emptyCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        updateCartCount(0);
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div>
            <h1>Products</h1>
            <div className="maincontainor">
                <div className="chlidren">
                    {products.map((product) => (
                        <div key={product.id} className="product">
                            <img src={product.image} alt={product.name} />
                            <h6>{product.title.slice(0, 20)}</h6>
                            <p>{product.description.slice(0, 39)}</p>
                            <p>${product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart-conatainer">
                <h2>Cart</h2>
                <div className="cart-page">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-info">
                            <p>{item.title.slice(0, 15)}</p>
                            <p>${item.price}</p>
                            Quantity:&nbsp; <button onClick={() => updateQuantity(index, 1)}>+</button>
                            {item.quantity}
                            <button onClick={() => updateQuantity(index, -1)}>-</button>
                        </div>
                    ))}
                </div>
                <h3>Total: ${totalPrice.toFixed()}</h3>
                &nbsp;
                <button onClick={emptyCart}>Empty Cart</button>
            </div>
        </div>
    );
};

export default ProductPage;