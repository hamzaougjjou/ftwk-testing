import logo from './../../assets/logo.png'
import { Link } from "react-router-dom";
import "./header.css";
import { useSelector } from 'react-redux';

import contact_us from "./../../assets/icons/contact_us.png"
import home_1 from "./../../assets/icons/home_1.png"
import products from "./../../assets/icons/products.png"

function Header() {

    let cart = useSelector(state => state.Cart);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-12 w-12" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PARFUMY</span>
                    </Link>
                    <div className="flex items-center lg:order-2">


                        {/* <Link to="/login"
                            className="text-gray-800 dark:text-white 
                        hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 
                        font-medium rounded-lg text-sm px-4 lg:px-5 py-2 
                        lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none
                          dark:focus:ring-gray-800">Log in</Link> */}

                        <Link to="/cart" className="flex justify-center items-center">
                            <div className="relative py-2">
                                {
                                    (cart && cart.length > 0) &&

                                    <div className="absolute">
                                        <p className="flex h-2 w-2 items-center justify-center 
                                    rounded-full bg-red-500 p-3 text-xs text-white">
                                            {cart.length}
                                        </p>
                                    </div>
                                }
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5" stroke="currentColor"
                                    className="file: mt-4 h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5
                                      14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>

                        </Link>

                    </div>

                    <div className="justify-between items-center w-full flex lg:w-auto" id="large-screen-menu">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
                            </li>
                            {/* <li>
                                <Link to="/collections" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Collections</Link>
                            </li>
                            <li>
                                <Link to="/offers" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Offers</Link>
                            </li> */}
                            <li>
                                <Link to="/contact" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div className="justify-center
            hidden
            gap-5
            items-center
            flex
            fixed
            w-[100vw]
            h-[70px]
            bottom-0
            left-0
            bg-white
            z-[999]
            text-black
            "

                id="mobile-menu"
            >
                <ul className="flex
                        justify-evenly
                        gap-[20px]
                        py-2
                        pt-4
                        w-full">
                    <li>
                        <Link to="/" className="
                        text-sm
                        font-bold
                        text-center
                        block text-black 
                        dark:text-gray-400 dark:border-gray-700">
                            <img
                                className='w-10 h-10 m-auto'
                                src={home_1} alt='HOME ICON' />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="
                        text-sm
                        font-bold
                        text-center
                        block text-black dark:text-gray-400 dark:border-gray-700">
                            <img
                                className='w-10 h-10 m-auto'
                                src={products} alt='PRODUCTS ICON' />
                            <span>Products</span>
                        </Link>
                    </li>
                    {/* 
                    <li>
                        <Link to="/collections" className="block text-black dark:text-gray-400 dark:border-gray-700">
                            Collections
                        </Link>
                    </li>
                    <li>
                        <Link to="/offers" className="block text-black dark:text-gray-400 dark:border-gray-700">
                            Offers
                        </Link>
                    </li> 
                    */}
                    <li>
                        <Link to="/contact" className="
                        text-sm
                        font-bold	
                        block text-black dark:text-gray-400 dark:border-gray-700">
                            <img
                                className='w-10 h-10 m-auto'
                                src={contact_us} alt='CONTACT US ICON' />
                            <span>Contact</span>
                        </Link>
                    </li>
                </ul>
            </div>


        </header>
    )
}

export default Header