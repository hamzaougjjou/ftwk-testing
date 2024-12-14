import Slider from './Slider';
import { Link } from "react-router-dom";

function Offers() {

    const products  =
        [
            {
                "id": 1,
                "title": "iPhone 9",
                "description": "An apple mobile which is nothing like apple",
                "price": 549,
                "discountPercentage": 12.96,
                "rating": 4.69,
                "stock": 94,
                "brand": "Apple",
                "category": "smartphones",
                "thumbnail": "https://i.pinimg.com/564x/2f/4c/74/2f4c74abd7b8e46d6ec6a81e8b71d2e0.jpg",
                "images": [
                    "https://cdn.dummyjson.com/product-images/1/1.jpg",
                    "https://cdn.dummyjson.com/product-images/1/2.jpg",
                    "https://cdn.dummyjson.com/product-images/1/3.jpg",
                    "https://cdn.dummyjson.com/product-images/1/4.jpg",
                    "https://i.pinimg.com/564x/2f/4c/74/2f4c74abd7b8e46d6ec6a81e8b71d2e0.jpg"
                ]
            },
            {
                "id": 2,
                "title": "iPhone X",
                "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                "price": 899,
                "discountPercentage": 17.94,
                "rating": 4.44,
                "stock": 34,
                "brand": "Apple",
                "category": "smartphones",
                "thumbnail": "https://i.pinimg.com/564x/e9/bb/41/e9bb419b26ae11851a157c06f8a2b284.jpg",
                "images": [
                    "https://cdn.dummyjson.com/product-images/2/1.jpg",
                    "https://cdn.dummyjson.com/product-images/2/2.jpg",
                    "https://cdn.dummyjson.com/product-images/2/3.jpg",
                    "https://i.pinimg.com/564x/e9/bb/41/e9bb419b26ae11851a157c06f8a2b284.jpg"
                ]
            },
            {
                "id": 3,
                "title": "Samsung Universe 9",
                "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
                "price": 1249,
                "discountPercentage": 15.46,
                "rating": 4.09,
                "stock": 36,
                "brand": "Samsung",
                "category": "smartphones",
                "thumbnail": "https://i.pinimg.com/564x/ce/46/ac/ce46acb741941a92cf2984cef13cdcb9.jpg",
                "images": [
                    "https://cdn.dummyjson.com/product-images/3/1.jpg"
                ]
            },
            {
                "id": 4,
                "title": "OPPOF19",
                "description": "OPPO F19 is officially announced on April 2021.",
                "price": 280,
                "discountPercentage": 17.91,
                "rating": 4.3,
                "stock": 123,
                "brand": "OPPO",
                "category": "smartphones",
                "thumbnail": "https://img.freepik.com/free-vector/realistic-luxury-perfume-ad-template_52683-8484.jpg?t=st=1715309157~exp=1715312757~hmac=7c00640290c4cac55bff462259a5046aa6d5b2175ead823644033002895801a9&w=740",
                "images": [
                    "https://cdn.dummyjson.com/product-images/4/1.jpg",
                    "https://cdn.dummyjson.com/product-images/4/2.jpg",
                    "https://cdn.dummyjson.com/product-images/4/3.jpg",
                    "https://cdn.dummyjson.com/product-images/4/4.jpg",
                    "https://img.freepik.com/free-vector/realistic-luxury-perfume-ad-template_52683-8484.jpg?t=st=1715309157~exp=1715312757~hmac=7c00640290c4cac55bff462259a5046aa6d5b2175ead823644033002895801a9&w=740"
                ]
            },
            {
                "id": 5,
                "title": "Huawei P30",
                "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
                "price": 499,
                "discountPercentage": 10.58,
                "rating": 4.09,
                "stock": 32,
                "brand": "Huawei",
                "category": "smartphones",
                "thumbnail": "https://i.pinimg.com/564x/2f/4c/74/2f4c74abd7b8e46d6ec6a81e8b71d2e0.jpg",
                "images": [
                    "https://cdn.dummyjson.com/product-images/5/1.jpg",
                    "https://cdn.dummyjson.com/product-images/5/2.jpg",
                    "https://cdn.dummyjson.com/product-images/5/3.jpg"
                ]
            }
        ]

    return (

        <div>

       <Slider />
        <div className="flex justify-center items-center">
            <div className="2xl:mx-auto 2xl:container py-12 w-full">
                <div className="flex flex-col jusitfy-center items-center space-y-10">
                    <div className="flex flex-col justify-center items-center ">
                        <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-black">
                            Best Selling
                        </h1>
                    </div>
                    <div className="flex flex-wrap
                    justify-center
                    ">


                        {
                            products.map(product => (


                                <div key={product.id}
                                    className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                    <Link to="/products/89" className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                                        <img className="object-cover w-full"
                                            src={product.thumbnail}
                                            alt="product" />
                                        <span
                                            className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center
                                             text-sm font-medium text-white">
                                            {product.discountPercentage}%
                                            OFF</span>
                                    </Link>
                                    <div className="mt-4 px-5 pb-5">
                                        <Link to="/products/98">
                                            <h5 className="text-xl tracking-tight text-slate-900">{product.title}</h5>
                                        </Link>
                                        <div className="mt-2 mb-5 flex items-center justify-between">
                                            <p>
                                                <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                                                <span className="text-sm text-slate-900 line-through">${product.price + (product.price * product.discountPercentage) / 100}</span>
                                            </p>
                                            <div className="flex items-center">
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
                                            </div>
                                        </div>
                                        <Link tp="./"
                                            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add to cart</Link>
                                    </div>
                                </div>

                            ))
                        }



                    </div>
                </div>
            </div>
        </div>
        
         </div>
    )
}

export default Offers