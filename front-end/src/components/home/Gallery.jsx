import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";


function Gallery() {

    const { data, loading, error } = useAxios('/products/best-selling?limit=4', {
        method: 'GET',
    });

    return (
        <>

            {
                (!error || error === null) &&
                <div className="bg-white dark:bg-gray-800 py-6">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                            <div className="flex items-center gap-12">
                                <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">For you</h2>
                            </div>

                            <Link to="/products"
                                className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 pb-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">
                                More
                            </Link>
                        </div>

                        {
                            loading ?

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3
                                    md:gap-6 xl:gap-8">

                                    <div
                                        className="animate-pulse group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                        <div
                                            className="bg-gray-500 absolute h-full w-full" ></div>
                                        <button class="relative m-2 bg-gray-100 text-white font-bold 
                                        py-5 px-12 rounded-full mt-5">
                                        </button>

                                    </div>
                                    <div
                                        className="animate-pulse group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                        <div
                                            className="bg-gray-500 absolute inset-0 h-full w-full
                                         object-cover object-center transition duration-200 
                                         group-hover:scale-110" ></div>
                                        <button class="relative m-2 bg-gray-100 text-white font-bold 
                                        py-5 px-12 rounded-full mt-5">
                                        </button>
                                    </div>
                                    <div
                                        className="animate-pulse group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                        <div
                                            className="bg-gray-500 absolute inset-0 h-full w-full
                                         object-cover object-center transition duration-200 
                                         group-hover:scale-110" ></div>
                                        <button class="relative m-2 bg-gray-100 text-white font-bold 
                                        py-5 px-12 rounded-full mt-5">
                                        </button>
                                    </div>

                                    <div
                                        className="animate-pulse group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                        <div
                                            className="bg-gray-500 absolute h-full w-full" ></div>
                                        <button class="relative m-2 bg-gray-100 text-white font-bold 
                                        py-5 px-12 rounded-full mt-5">
                                        </button>

                                    </div>

                                </div>

                                :

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">


                                    {
                                        data.data.data.length > 0 &&
                                        <Link to={"/products/" + data.data.data[0].id}
                                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                            <img
                                                src={data.data.data[0].image}
                                                loading="lazy" alt={data.data.data[0].title}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                            <div
                                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                            </div>
                                            <button class="relative m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 pb-2 px-4 rounded-full mt-5">
                                                Shop Now
                                            </button>

                                        </Link>
                                    }

                                    {
                                        data.data.data.length > 1 &&
                                        <Link to={"/products/" + data.data.data[1].id}
                                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                            <img src={data.data.data[1].image}
                                                loading="lazy" alt={data.data.data[1].title}
                                                className="absolute inset-0 h-full w-full object-cover 
                                         object-center transition duration-200 
                                         group-hover:scale-110" />

                                            <div
                                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                            </div>
                                            <button class="relative m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 pb-2 px-4 rounded-full mt-5">
                                                Shop Now
                                            </button>

                                        </Link>
                                    }

                                    {
                                        data.data.data.length > 2 &&
                                        <Link to={"/products/" + data.data.data[2].id}
                                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                                            <img
                                                src={data.data.data[2].image}
                                                loading="lazy" alt={data.data.data[2].title}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                            <div
                                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                            </div>
                                            <button class="relative m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 pb-2 px-4 rounded-full mt-5">
                                                Shop Now
                                            </button>

                                        </Link>
                                    }

                                    {
                                        data.data.data.length > 3 &&
                                        <Link to={"/products/" + data.data.data[3].id}
                                            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                                            <img
                                                src={data.data.data[3].image}
                                                loading="lazy" alt={data.data.data[3].title}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                            <div
                                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                                            </div>

                                            <button class="relative m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 pb-2 px-4 rounded-full mt-5">
                                                Shop Now
                                            </button>

                                        </Link>
                                    }

                                </div>

                        }
                    </div>
                </div>

            }

        </>
    )
}

export default Gallery