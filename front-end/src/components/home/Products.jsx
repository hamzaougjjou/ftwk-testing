import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { addTocart as addTocartRedux } from "../redux/reducers/CartSlice";

function Products() {

    const { data, loading, error } = useAxios('/products/best-selling?limit=5', {
        method: 'GET',
    });

    const dispatch = useDispatch();
    let Cart = useSelector(state => state.Cart);
    let addToCart = (product) => {
        dispatch(addTocartRedux({...product , quantity:1}));
    }

    return (
        <div className="flex justify-center items-center">
            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                <div className="flex flex-col jusitfy-center items-center space-y-10">
                    <div className="flex flex-col justify-center items-center ">
                        <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-black">
                            Best Selling
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">


                        {
                            (!loading && !error) &&
                            data.data.data.map(product => (

                                <div key={product.id}
                                    className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                    <Link to={"products/" + product.id} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                                        <img className="object-cover w-full"
                                            src={product.image}
                                            alt={product.title} />


                                        {
                                            product.discountPercentage &&

                                            <span
                                                className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center
                                             text-sm font-medium text-white">
                                                {product.discountPercentage}%
                                                OFF
                                            </span>
                                        }

                                    </Link>
                                    <div className="mt-4 px-5 pb-5">
                                        <Link to={"products/" + product.id}>
                                            <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
                                        </Link>
                                        <div className="mt-2 mb-5 flex items-center justify-between">
                                            <p>
                                                <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                                                {
                                                    product.old_price &&
                                                    <span className="text-sm text-slate-900 line-through">${product.price + (product.price * product.old_price) / 100}</span>
                                                }
                                            </p>
                                            {/* <div className="flex items-center">
                                                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                    </path>
                                                </svg>
                                                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                    </path>
                                                </svg>
                                                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                    </path>
                                                </svg>
                                                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                    </path>
                                                </svg>
                                                <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                    </path>
                                                </svg>
                                                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.rating}</span>
                                            </div> */}
                                        </div>

                                        {
                                            Cart.find(item => item.id === product.id) ?
                                                <button
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

                        {
                            (loading && !error) &&
                            <>
                                <LoadingProductItem />
                                <LoadingProductItem />
                                <LoadingProductItem />
                                <LoadingProductItem />
                            </>
                        }



                    </div>
                </div>
            </div>
        </div>
    )

}


function LoadingProductItem() {

    return (
        <div className="animate-pulse relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                <div className="h-full w-full bg-gray-200 dark:bg-gray-700 h-60 rounded-xl"></div>
            </div>
            <div className="p-6 mt-2">
                <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                <div className="flex items-center justify-between mt-5">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 "></div>
                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                </div>
            </div>
            <div className="h-10 mx-auto max-w-[90%] w-full bg-gray-200 dark:bg-gray-700 "></div>
        </div>
    )
}


export default Products