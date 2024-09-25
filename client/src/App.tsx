import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Main } from './pages/Main';
import { ToastContainer } from "react-toastify";
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Action } from './pages/action';
import { Cart } from './pages/cart';
import Catalog from './pages/catalog';
import ScrollToTop from './utils/scrollToTop';
import { Authorization } from './pages/auth';
import { Delivery } from './pages/delivery';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosJWT } from './services/axiosJWT';
import { Profile } from './pages/profile';
import { RequireAuth } from './utils/requireAuth';
import { RequireRole } from './utils/requireRole';
import AdminPanelRoutes from './admin';
import { Making } from './pages/making';
import { Curtain } from './components/curtain';
import { Simile } from './pages/simile';

function App() {

    const location = useLocation();

    return (
        <>
            <AxiosJWT />
            <ToastContainer />
            <ScrollToTop />
            {location.pathname.startsWith('/admin-panel') ? null : <Header />}
            <Routes>
                <Route path={"/"} element={<Main />}></Route>
                <Route path={"/auth/*"} element={<Authorization />}></Route>
                <Route path={"/action"} element={<Action />}></Route>
                <Route path={"/cart"} element={<Cart />}></Route>
                <Route path={"/delivery"} element={<Delivery />}></Route>
                <Route path={"/catalog/*"} element={<Catalog />}></Route>
                <Route path={"/making"} element={<Making />}></Route>
                <Route path={"/simile"} element={<Simile />}></Route>
                <Route element={<RequireAuth />} >
                    <Route path={"/profile/*"} element={<Profile />}></Route>
                </Route>
                <Route element={<RequireRole />} >
                    <Route path='/admin-panel/*' element={<AdminPanelRoutes />}></Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {location.pathname.startsWith('/admin-panel') ? null : <Footer />}
        </>
    );
}

export default App;
