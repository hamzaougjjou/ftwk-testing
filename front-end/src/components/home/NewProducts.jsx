import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { addTocart as addTocartRedux } from "../redux/reducers/CartSlice";
import TextTruncator from "../utils/TextTruncator ";

function NewProducts() {


    const { data, loading, error } = useAxios('/products?filter=latest&limit=5', {
        method: 'GET',
    });


    // <secton className="carousel-item animate-pulse" >
    //     <div className='w-[200px] h-[200px]  text-center'>
    //         <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
    //         <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
    //     </div>
    // </secton>


    const dispatch = useDispatch();

    let Cart = useSelector(state => state.Cart);

    let addToCart = (product) => {
        dispatch(addTocartRedux({ ...product, quantity: 1 }));
    }


    if (error) {
        return (
            <h1 className="text-center">Something went wrong</h1>
        )
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                <secton className="carousel-item animate-pulse rounded overflow-hidden shadow-lg" >
                    <div className='w-full h-[250px] bg-gray-200 dark:bg-gray-700'></div>
                    <p className='w-[150px] h-[20px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-full h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-[150px] h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <div className="px-1 py-4 flex justify-between items-center mt-5">
                        <p className='w-[150px] h-[15px] bg-gray-200 dark:bg-gray-700'></p>
                        <p className='w-[120px] h-[45px] bg-gray-200 dark:bg-gray-700'></p>
                    </div>
                </secton>
                <secton className="carousel-item animate-pulse rounded overflow-hidden shadow-lg" >
                    <div className='w-full h-[250px] bg-gray-200 dark:bg-gray-700'></div>
                    <p className='w-[150px] h-[20px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-full h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-[150px] h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <div className="px-1 py-4 flex justify-between items-center mt-5">
                        <p className='w-[150px] h-[15px] bg-gray-200 dark:bg-gray-700'></p>
                        <p className='w-[120px] h-[45px] bg-gray-200 dark:bg-gray-700'></p>
                    </div>
                </secton>
                <secton className="carousel-item animate-pulse rounded overflow-hidden shadow-lg" >
                    <div className='w-full h-[250px] bg-gray-200 dark:bg-gray-700'></div>
                    <p className='w-[150px] h-[20px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-full h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-[150px] h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <div className="px-1 py-4 flex justify-between items-center mt-5">
                        <p className='w-[150px] h-[15px] bg-gray-200 dark:bg-gray-700'></p>
                        <p className='w-[120px] h-[45px] bg-gray-200 dark:bg-gray-700'></p>
                    </div>
                </secton>
                <secton className="carousel-item animate-pulse rounded overflow-hidden shadow-lg" >
                    <div className='w-full h-[250px] bg-gray-200 dark:bg-gray-700'></div>
                    <p className='w-[150px] h-[20px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-full h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-[150px] h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <div className="px-1 py-4 flex justify-between items-center mt-5">
                        <p className='w-[150px] h-[15px] bg-gray-200 dark:bg-gray-700'></p>
                        <p className='w-[120px] h-[45px] bg-gray-200 dark:bg-gray-700'></p>
                    </div>
                </secton>
                <secton className="carousel-item animate-pulse rounded overflow-hidden shadow-lg" >
                    <div className='w-full h-[250px] bg-gray-200 dark:bg-gray-700'></div>
                    <p className='w-[150px] h-[20px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-full h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <p className='w-[150px] h-[10px] bg-gray-200 dark:bg-gray-700 mt-3'></p>
                    <div className="px-1 py-4 flex justify-between items-center mt-5">
                        <p className='w-[150px] h-[15px] bg-gray-200 dark:bg-gray-700'></p>
                        <p className='w-[120px] h-[45px] bg-gray-200 dark:bg-gray-700'></p>
                    </div>
                </secton>
            </div>
        )
    }

    return (

        <div className="max-w-screen-xl mx-auto p-2">
            <h1 className='text-4xl text-center bold text-blue-400 py-5'>
                New Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">

                {
                    data.data.data.map(product => (


                        <div
                            key={product.id}
                            className="rounded overflow-hidden shadow-lg">

                            <div className="relative">
                                <Link to={"/products/" + product.id}>
                                    <img className="w-full object-cover h-[250px]"
                                        src={product.image}
                                        alt={product.title} />
                                    <div
                                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                    </div>
                                </Link>


                                {/* <div
                                    className="text-sm absolute top-0 left-0 px-4 text-black bg-white
                                    h-9 w-16 flex flex-col items-center justify-center mt-3 mr-3  transition duration-500 ease-in-out">
                                    <span className="font-bold">
                                        {product.price}$
                                    </span>
                                </div> */}
                                <div
                                    className="text-sm absolute top-0 right-0 bg-red-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-red-700 transition duration-500 ease-in-out">
                                    <span className="font-bold">NEW</span>
                                </div>
                            </div>
                            <div className="px-6 py-4">

                                <Link to={ "/products/"+ product.id }
                                    className="font-semibold block text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                                    {product.title}
                                    <TextTruncator
                                        text={product.description}
                                        len={150}
                                        styleClass='text-gray-500 text-sm' />

                                </Link>
                            </div>
                            <div className="px-6 py-4 flex justify-between items-center">

                                <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">

                                    <b className="ml-1 text-[20px]">
                                        {product.price} $
                                    </b>
                                </span>

                                {
                                    Cart.find(item => item.id === product.id) ?
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex items-center justify-center 
                                            rounded-md bg-slate-900 px-5 py-2.5 text-center
                                             text-sm font-medium text-white hover:bg-gray-700 
                                             focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            In Cart
                                        </button>


                                        :
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex items-center justify-center 
                                            rounded-md bg-slate-900 px-5 py-2.5 text-center
                                             text-sm font-medium text-white hover:bg-gray-700 
                                             focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add to cart
                                        </button>
                                }
                            </div>
                        </div>
                    ))

                }


            </div>
        </div>
    )
}

export default NewProducts