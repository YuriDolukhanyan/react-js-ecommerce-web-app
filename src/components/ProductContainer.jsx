import React, { useContext, useEffect, useState } from "react";
import ProductModeSection from "./ProductModeSection";
import ProductList from "./ProductList";
import { ProductContext } from "../contexts/ProductContext";
import { ACTIONS } from "../constants/reducerActions";
import { REQUESTS } from "../constants/apiRequests";
import { fetchProducts } from "../api/Productapi";
import { StorageService } from "../services/StorageService";
import { PRODUCT_STORAGE_KEY } from "../constants/storageKeys";
import Toast from "./Toast";

const getInitialState = () => {
    return JSON.parse(StorageService.getItem(PRODUCT_STORAGE_KEY)) ?? [];
};

const ProductContainer = () => {
    const { cartProducts, dispatch } = useContext(ProductContext);
    const [allProducts, setAllProducts] = useState([]);
    const [showCartProducts, setShowCartProducts] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const storedProducts = getInitialState();
        if (storedProducts && storedProducts.length > 0) {
            dispatch({ type: ACTIONS.SET_PRODUCTS, payload: storedProducts });
            setShowCartProducts(true);
        }
        fetchProducts(REQUESTS.PRODUCTS)
            .then(data => {
                setAllProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleAdd = (id) => {
        const product = allProducts.find(item => item.id === id);
        if (!product) return;
        dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product });
        showToast(`The product "${product.title}" was added to the cart!`);
    };

    const handleDelete = (id) => {
        dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: { id } });
        showToast(`The product "${id}" was deleted from the cart!`);
    };

    const toggleMode = () => {
        setShowCartProducts(!showCartProducts);
    };

    const showToast = (message) => {
        setToastMessage(message);
    };

    return (
        <div className="products">
            {toastMessage && (
                <Toast 
                    key={toastMessage}
                    message={toastMessage} 
                    onClose={() => setToastMessage("")} 
                />
            )}
            <ProductModeSection 
                onToggleModeButtonClick={toggleMode}
                showCartProducts={showCartProducts}
            />
            <br />
            <ProductList
                products={showCartProducts ? cartProducts : allProducts}
                showCartProducts={showCartProducts}
                onProductItemAddButtonClick={handleAdd}
                onProductItemDeleteButtonClick={handleDelete}
            />
        </div>
    );
};

export default ProductContainer;
