import React from "react";
import "../styles/productItem.css";

const ProductItem = ({
    id,
    title,
    price,
    quantity,
    isLocal,
    onDeleteButtonClick,
    onAddButtonClick
}) => {
    return (
        <>
            <li className="product-item">
                <div className="product-details">
                    <span className="product-id">{`ID: ${id}`}</span>
                    {isLocal ? <strong><span className="product-quantity">{`Quantity: ${quantity}`}</span></strong> : ""}
                    <span className="product-title">{`Title: ${title}`}</span>
                    <span className="product-price">{`Price: $${price.toFixed(2)}`}</span>
                </div>
                <button
                    onClick={() => isLocal ? onDeleteButtonClick(id) : onAddButtonClick(id)}
                >
                    {isLocal ? 'DELETE FROM CART' : 'BUY / ADD TO CART'}
                </button>
            </li>
        </>
    );
};

export default ProductItem;
