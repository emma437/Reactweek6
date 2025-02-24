import { createHashRouter } from "react-router-dom";
import NavBarLayout from "../layout/NavBarLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";

const router = createHashRouter( [
    {
        path: '/',
        element: <NavBarLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'products',
                element: <ProductsPage/>
            },
            {
                path: 'products/:id',
                element: <ProductDetail/>
            },
            {
                path: 'cart',
                element: <CartPage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },

])

export default router;