import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { addTocart as addTocartRedux } from "./../redux/reducers/CartSlice";
function ProductItem() {

    const { data, loading, error } = useAxios('/product/random', {
        method: 'GET',
    });


    const dispatch = useDispatch();
    let Cart = useSelector(state => state.Cart);
    let addToCart = (product) => {
        dispatch(addTocartRedux({ ...product, quantity: 1 }));
    }

    if (loading ) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-8" >
                <div className="animate-pulse max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <p className="bg-gray-300 w-full h-full object-cover"></p>
                            </div>

                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="bg-gray-400 w-[100px] h-[20px] rounded mb-2"></h2>
                            <h2 className="mb-4 bg-gray-300 w-[200px] h-[20px] rounded"></h2>
                            <div className="flex mb-4">
                                <div className="mr-4 mt-3">
                                    <p className="bg-gray-400 w-[80px] h-[16px] rounded"></p>
                                    <p className="my-2 bg-gray-300 w-[130px] h-[16px] rounded"></p>
                                </div>
                                <div>
                                    <span className="bg-gray-400 w-[120px] h-[13px] rounded"></span>
                                    <span className="bg-gray-300 w-[150px] h-[13px] rounded"></span>
                                </div>
                            </div>

                            <div>
                                <h1 className="mt-5 bg-gray-400 w-[200px] h-[20px] rounded"></h1>
                                <p className="mt-5 bg-gray-300 w-full h-[16px] rounded"></p>
                                <p className="mt-3 bg-gray-300 w-[90%] h-[16px] rounded"></p>
                                <p className="mt-3 bg-gray-300 w-full h-[16px] rounded"></p>
                                <p className="mt-3 bg-gray-300 w-full h-[16px] rounded"></p>
                                <p className="mt-3 bg-gray-300 w-[80%] h-[16px] rounded"></p>
                                <p className="mt-3 bg-gray-300 w-[33%] h-[16px] rounded"></p>
                            </div>

                            <div className="flex -mx-2 mt-5 my-4 ">

                                <div className="w-1/3 px-2">
                                    <h1 className="mt-5 bg-gray-500 w-full h-[50px] rounded"></h1>
                                </div>
                                <div className="w-1/3 px-2">
                                    <h1 className="mt-5 bg-gray-600 w-full h-[50px] rounded"></h1>
                                </div>
                                <div className="w-1/3 px-2">
                                    <h1 className="mt-5 bg-gray-600 w-full h-[50px] rounded"></h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-8" >
            {
                (!error && !loading) &&
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover"
                                    src={data.data.image}
                                    alt={data.data.title} />
                            </div>

                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                            <h2 className="text-gray-600 dark:text-gray-300 mb-4">
                                {data.data.title}
                            </h2>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                    <span className="text-gray-600 dark:text-gray-300">${data.data.price}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                    <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                                </div>
                            </div>

                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 min-h-[150px]">
                                    {data.data.description}

                                </p>
                            </div>

                            <div className="flex -mx-2 my-4 ">

                                <div className="w-1/3 px-2">
                                    <Link
                                        to={"/chckout?source=product&id=" + data.data.id}
                                        className="w-full text-center bg-green-500 block dark:bg-green-700 text-gray-800 dark:text-white
                                         py-2 px-4 rounded-full font-bold hover:bg-green-400 dark:hover:bg-green-600">
                                        Buy Now
                                    </Link>
                                </div>

                                <div className="w-1/3 px-2">

                                    {
                                        Cart.find(item => item.id === data.data.id) ?


                                            <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 
                                    rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                                In Cart
                                            </button>

                                            :
                                            <button
                                                onClick={() => addToCart(data.data)}
                                                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 
                                    rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                                Add to Cart
                                            </button>

                                    }

                                </div>
                                <div className="w-1/3 px-2">
                                    <button className="w-full bg-gray-200 dark:bg-gray-700
                                     text-gray-800 dark:text-white py-2 px-4 rounded-full 
                                     font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                                        Add to Wishlist
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductItem