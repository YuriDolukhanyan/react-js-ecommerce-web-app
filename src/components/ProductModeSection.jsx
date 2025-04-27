import React from "react";

const ProductModeSection = ({ onToggleModeButtonClick, showCartProducts }) => {
    return (
        <div>
            {/* <button onClick={onToggleModeButtonClick}>{`Toggle "product-list" / "cart-list"...`}</button> */}
            <button onClick={onToggleModeButtonClick}>{showCartProducts ? 'Go to the SHOP...' : 'Go to your CART...'}</button>
            <br />
        </div>
    );
};

export default ProductModeSection;
