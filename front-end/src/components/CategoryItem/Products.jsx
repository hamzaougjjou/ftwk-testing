import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import useAxios from '../hooks/useAxios';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Products({ category_id }) {

    const [products, setProducts] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const query = useQuery();
    const page = query.get('page') || 1; // Default to page 1 if 'p' is not specified

    //+ (searchQuery.length > 0 && '&q=' + searchQuery)
    const { data, loading, error } = useAxios(`/categories/${category_id}/products?page=${page}`, {
        method: 'GET',
    });

    useEffect(() => {
        if (data === null || data.success === false) {
            setProducts([...products]);
        } else {
            if ( loading===false ) {
                setProducts([...products, ...data.data.data]);
            }
        }
    }, [data, loading])


    // console.log(data?.data?.next_page_url);


    if (error) return <p>Error: {error.message}</p>;


    return (
        <div>
            <div className="font-[sans-serif]">
                <div className="p-4 mx-auto lg:max-w-5xl md:max-w-3xl max-w-lg">


                    {
                        (!loading && products.length === 0) ?
                            <main className="flex items-center justify-center
                         text-gray-900 page">
                                <div className="relative flex flex-col items-center w-full gap-8 
                            px-8 md:px-18 xl:px-40 md:gap-16">
                                    <h1 className="text-7xl
                                 md:text-[120px] w-full select-none  text-center font-black  text-gray-400">
                                        404</h1>
                                    <p className="text-3xl font-bold capitalize">
                                        No products found in this category
                                    </p>
                                    {/* <p className="text-2xl font-medium break-words text-dull">U
                                    nfortunately, this is only a 404 page. You may have
                                    mistyped the address, or the page has been moved to another URL.
                                </p> */}
                                    <Link to="/"
                                        className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4
                                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                                            text-center dark:focus:ring-blue-900 my-4">
                                        Back to Home page
                                    </Link>
                                </div>
                            </main>

                            :
                            <div
                                className='flex align-center justify-between w-full my-10 flex-wrap'>
                                <h2 className="text-4xl font-extrabol text-gray-800">Products</h2>
                            </div>

                    }



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            !loading ?
                                products.map(product => (
                                    <Link to={"/products/" + product.id}
                                        key={product.id}
                                        className="bg-white border overflow-hidden rounded-xl cursor-pointer hover:border-blue-600 transition-all relative"
                                    >
                                        <div className="bg-gray-50 w-full h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-600">{product.title}</h3>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="bg-gray-50 w-10 h-10 flex items-center justify-center rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
                                                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="text-xl text-gray-600 font-bold">${product.price}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))

                                :

                                <>
                                    <div
                                        role="status"
                                        className="bg-white border overflow-hidden rounded-xl relative animate-pulse">
                                        <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 "></div>
                                        </div>
                                        <div className="p-6 mt-2">
                                            <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 "></div>
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        role="status"
                                        className="bg-white border overflow-hidden rounded-xl relative animate-pulse">
                                        <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 "></div>
                                        </div>
                                        <div className="p-6 mt-2">
                                            <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 "></div>
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        role="status"
                                        className="bg-white border overflow-hidden rounded-xl relative animate-pulse">
                                        <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 "></div>
                                        </div>
                                        <div className="p-6 mt-2">
                                            <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 "></div>
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        role="status"
                                        className="bg-white border overflow-hidden rounded-xl relative animate-pulse">
                                        <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 "></div>
                                        </div>
                                        <div className="p-6 mt-2">
                                            <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 "></div>
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        role="status"
                                        className="bg-white border overflow-hidden rounded-xl relative animate-pulse">
                                        <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 "></div>
                                        </div>
                                        <div className="p-6 mt-2">
                                            <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 "></div>
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        role="status"
                                        className="bg-white border overflow-hidden rounded-xl relative animate-pulse">
                                        <div className="bg-gray-50 w-full h-[250px] mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 "></div>
                                        </div>
                                        <div className="p-6 mt-2">
                                            <div className="h-5 w-[90%] bg-gray-200 dark:bg-gray-700 "></div>
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 "></div>
                                                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 "></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>

            {
                !loading &&
                (data?.data?.next_page_url) &&
                <nav aria-label="Page navigation example"
                    className='m-5 flex  justify-center'>
                    <Link to={"?page=" + (+page + 1)}
                        className="flex items-center justify-center px-4 h-10 leading-tight
                             text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 
                             hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                             dark:hover:bg-gray-700 dark:hover:text-white"
                    >Next</Link>
                </nav>
            }

        </div>
    );
}

export default Products;
