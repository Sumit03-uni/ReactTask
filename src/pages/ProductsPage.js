import React from "react";

const ProductPage = ({ products, addToCart, totalPrice }) => {

    return (
        <div className="product-containor">
            <h1>Products</h1>
            <div className="maincontainor">
                <div className="chlidren">
                    {products.map((product) => (
                        <div key={product.id} className="product">
                            <img src={product.image} alt={product.name} />
                            <h5>{product.title.slice(0, 20)}</h5>
                            <p>{product.description.slice(0, 39)}</p>
                            <p>${product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))};
                </div>
            </div>
            <h3>Total: ${totalPrice.toFixed()}</h3>
        </div>
    );
};

export default ProductPage;