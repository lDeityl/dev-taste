import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { ToastContainer } from "react-toastify";
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Action } from './pages/action';
import { Cart } from './pages/cart';
import Catalog from './pages/catalog';
import ScrollToTop from './utils/scrollToTop';
import { Authorization } from './pages/auth';

function App() {

    return (
        <>
            <Header />
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path={"/"} element={<Main />}></Route>
                <Route path={"/auth/*"} element={<Authorization />}></Route>
                <Route path={"/action"} element={<Action />}></Route>
                <Route path={"/cart"} element={<Cart />}></Route>
                <Route path={"/catalog/*"} element={<Catalog />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
