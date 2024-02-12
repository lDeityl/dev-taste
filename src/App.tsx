import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { ToastContainer } from "react-toastify";
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Action } from './pages/action';
import { Cart } from './pages/cart';
import Catalog from './pages/catalog';

function App() {

    return (
        <>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path={"/"} element={<Main />}></Route>
                <Route path={"/action"} element={<Action />}></Route>
                <Route path={"/cart"} element={<Cart />}></Route>
                <Route path={"/catalog/*"} element={<Catalog />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
