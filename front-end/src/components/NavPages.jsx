import React from 'react';

import { Routes, Route } from "react-router-dom";
import Error404 from './errors/Error404';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Home from './home/Home';
import Products from './products/Products';
import Cart from './cart/Cart';
import ProductItem from './productIem/ProductItem';
import Contact from './contact/Contact';
import Collections from './collections/Collections';
import Offers from './offers/Offers';
import CheckOut from './checkOut/CheckOut';
import CategoryItem from './CategoryItem/CategoryItem';

function NavPages() {



    return (
        <>
            <Routes>

                <Route path="/*" element={<Error404 />} />

                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/collections" element={<Collections />} />
                <Route exact path="/products/:id" element={<ProductItem />} />
                <Route exact path="/offers" element={<Offers />} />

                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/checkout" element={<CheckOut />} />
                <Route exact path="/categories/:id" element={<CategoryItem />} />


                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />

            </Routes>
        </>
    )
}

export default NavPages