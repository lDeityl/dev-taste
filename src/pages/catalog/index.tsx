import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { AllProducts } from './pages/all';
import { Product } from './pages/product';
import ScrollToTop from '../../utils/scrollToTop';

function Catalog() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={"/"} element={<AllProducts />}></Route>
                <Route path={"/:id"} element={<Product />}></Route>
            </Routes>
        </>
    );
}

export default Catalog;
