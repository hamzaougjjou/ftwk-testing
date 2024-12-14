import { useEffect, useState } from 'react';
import Search from './Search';
import Slider from './Slider';
import { Link, useLocation } from "react-router-dom";
import useAxios from '../hooks/useAxios';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Products() {

    const [products, setProducts] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const query = useQuery();
    const page = query.get('page') || 1; // Default to page 1 if 'p' is not specified

    //+ (searchQuery.length > 0 && '&q=' + searchQuery)
    const { data, loading, error } = useAxios('/products?page=' + page, {
        method: 'GET',
    });

    // useEffect(() => {
    // }, [searchQuery])
    


    useEffect(() => {
        if (!loading) {
            setProducts([...products, ...data.data.data]);
        }
    }, [data])



    if (error) return <p>Error: {error.message}</p>;


    return (
        <div>
            <Slider />
            <div className="font-[sans-serif]">
                <div className="p-4 mx-auto lg:max-w-5xl md:max-w-3xl max-w-lg">

                    <div
                        className='flex align-center justify-between w-full my-10 flex-wrap'>
                        <h2 className="text-4xl font-extrabol text-gray-800">Products</h2>
                        <Search setSearchQuery={setSearchQuery} />
                    </div>


                    {/* 
                    <div
                        className='flex align-center gap-30 w-full my-10 flex-wrap'>
                        <Link to="?category=1" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                        <Link to="?category=2" type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</Link>
                        <Link to="?category=3" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                        <Link to="?category=4" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                        <Link to="?category=5" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                        <Link to="?category=6" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                        <Link to="?category=7" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                        <Link to="?category=8" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</Link>
                    </div> 
                    */}




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
                                        className="bg-white border overflow-hidden rounded-xl relative
                                         animate-pulse">
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
                data.data.next_page_url &&


                <nav aria-label="Page navigation example"
                    className='m-5 flex  justify-center'>
                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li>
                            <Link to={"?page=" + (+page + 1)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                        </li>
                    </ul>
                </nav>
            }

        </div>
    );
}

export default Products;
