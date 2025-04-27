import React, {useContext} from "react";
import ProductItem from "./ProductItem";
import { ProductContext } from "../contexts/ProductContext";

const ProductList = ({
    products,
    showCartProducts,
    onProductItemAddButtonClick,
    onProductItemDeleteButtonClick
}) => {
    if (!products.length) {
        return (
            <div>
                <h2>{showCartProducts ? 'Cart Products List:' : ''}</h2>
                <span>There are no products! Loading...</span>
            </div>
        );
    }
    const { price } = useContext(ProductContext);
    console.log(products);
    return (
        <>
            {showCartProducts ? 
                <div><h2>{`Cart Overall price: $${price.toFixed(2)}`}</h2></div> :
                <div><h2>All Products List:</h2></div>
            }
            <ul>
                {products.map((item) => (
                    <div key={item.id}>
                        <ProductItem
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            isLocal={item.isLocal}
                            onAddButtonClick={onProductItemAddButtonClick}
                            onDeleteButtonClick={onProductItemDeleteButtonClick}
                        />
                    </div>
                ))}
            </ul>
        </>
    );
};

export default ProductList;
