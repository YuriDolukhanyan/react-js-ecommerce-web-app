import React from 'react'
import './App.css';
import ContentContainer from "./components/ContentContainer";
import { ProductProvider } from './contexts/ProductContext';

function App() {
    return (
        <div className='App'>
            <h1>E-Commerce SYSTEM - React WEB APP</h1>
            <ProductProvider>
                <ContentContainer />
            </ProductProvider>
        </div>
    );
}

export default App;
