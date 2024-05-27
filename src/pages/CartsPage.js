import React from "react";

const CartPage = ({ cart, updateQuantity, totalPrice, emptyCart }) => {

    return (
        <div>
            <h2>Cart</h2>
            <div className="containors">
                <div className="children">
                    {cart.map((item, index) => (
                        <div key={index} className="carts">
                            <img src={item.image} alt={item.title} />
                            <h5>{item.title.slice(0,15)}</h5>
                            <p>{item.description.slice(0, 40)}</p>
                            <p>${item.price}</p>
                            <div className="quantity-control">
                                <b>Quantity:</b> &nbsp; <button onClick={() => updateQuantity(index, 1)}>+</button>
                                <input type="number" value={item.quantity} />
                                <button onClick={() => updateQuantity(index, -1)}>-</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
            <div className="price">
                <h3>Total: ${totalPrice.toFixed()}</h3>
                &nbsp;
                <button className="empbtn" onClick={emptyCart}>Empty Cart</button>
            </div>
        </div>
    )
};

export default CartPage;