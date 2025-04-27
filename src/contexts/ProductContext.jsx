import React, { createContext, useReducer } from "react";
import { ACTIONS } from "../constants/reducerActions";
import { StorageService } from "../services/StorageService";
import { PRODUCT_STORAGE_KEY } from "../constants/storageKeys";

// const generateId = () => Math.floor(Math.random() * Date.now());

const productsReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_PRODUCTS:
            // StorageService.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(action.payload));
            return action.payload;
        case ACTIONS.ADD_PRODUCT: {
            const existingProduct = state.find(item => item.id === action.payload.id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = state.map(item => 
                    item.id === action.payload.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                updatedCart = [...state, { ...action.payload, quantity: 1, isLocal: true }];
            }
            StorageService.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updatedCart));
            return updatedCart;
        }
        case ACTIONS.DELETE_PRODUCT: {
            const existingProduct = state.find(item => item.id === action.payload.id);
            let updatedCart;
            if (existingProduct) {
                if ((existingProduct.quantity || 1) > 1) {
                    updatedCart = state.map(item => 
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    updatedCart = state.filter(item => item.id !== action.payload.id);
                }
            } else {
                updatedCart = state;
            }
            StorageService.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updatedCart));
            return updatedCart;
        }
        default:
            return state;
    }
};

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cartProducts, dispatch] = useReducer(productsReducer, []);
    
    const totalPrice = cartProducts.reduce(
        (sum, product) => sum + (product.price || 0) * (product.quantity || 1),
        0
    );

    return (
        <ProductContext.Provider value={{ cartProducts, dispatch, price: totalPrice }}>
            {children}
        </ProductContext.Provider>
    );
};
