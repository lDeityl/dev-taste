import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { AllProducts } from './pages/all';
import { Product } from './pages/product';


function Catalog() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<AllProducts />}></Route>
                <Route path={"/product/:id"} element={<Product />}></Route>
            </Routes>
        </>
    );
}

export default Catalog;
