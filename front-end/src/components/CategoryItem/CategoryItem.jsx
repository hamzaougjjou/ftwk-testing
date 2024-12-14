import { Link, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Products from "./Products";
import Slider from "./Slider";
import Loading from "./../utils/Loading";
import Error404 from "../errors/Error404";

function CategoryItem() {

    const { id: category_id } = useParams();

    const { data, loading, error } = useAxios(`/categories/${category_id}`, {
        method: 'GET',
    });

    if ( error ) {
        return <Error404 /> 
    }

    return (
        <div>

            {
                loading ?
                    <>
                        <div
                            className="h-[500px]
                            bg-sky-300 rounded
                            animate-pulse">
                            <div className='h-[500px] object-cover'></div>
                        </div>

                        <div className="text-center p-3">
                            <Loading />
                        </div>
                    </>
                    :
                    <>
                        <Slider category={data.data} />
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight
                            md:text-5xl lg:text-6xl dark:text-white py-10 text-blue-600 dark:text-blue-500 text-center">
                            {data.data.name}
                        </h1>

                    </>

            }

            {/* <div className='flex gap-[20px] justify-center flex-wrap'>




                <div className="w-full min-w-[400px] max-w-sm bg-white rounded-lg shadow dark:bg-gray-800">
                    <Link to="#">
                        <img className="p-2 rounded-t-lg
                    h-[300px] object-cover w-full
                    " src="https://i.pinimg.com/564x/f6/2b/dc/f62bdc91ea4afdf319464ec4da7d0f17.jpg" alt="product" />
                    </Link>
                    <div className="px-2 pb-5">
                        <Link to="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                        </Link>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <Link to="#" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none
                         focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-green-600 dark:hover:bg-green-700
                        ">Add to cart</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full min-w-[400px] max-w-sm bg-white rounded-lg shadow dark:bg-gray-800">
                    <Link to="#">
                        <img className="p-2 rounded-t-lg
                    h-[300px] object-cover w-full
                    " src="https://i.pinimg.com/564x/8e/f2/c8/8ef2c876542ad12dc0eb11b4a4f8ef61.jpg" alt="product" />
                    </Link>
                    <div className="px-2 pb-5">
                        <Link to="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <Link to="#" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none
                         focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-green-600 dark:hover:bg-green-700
                        ">Add to cart</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full min-w-[400px] max-w-sm bg-white rounded-lg shadow dark:bg-gray-800">
                    <Link to="#">
                        <img className="p-2 rounded-t-lg
                    h-[300px] object-cover w-full
                    " src="https://i.pinimg.com/564x/f7/20/d4/f720d45566212fb4a1e069bb0cd11e76.jpg" alt="product" />
                    </Link>
                    <div className="px-2 pb-5">
                        <Link to="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <Link to="#" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none
                         focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-green-600 dark:hover:bg-green-700
                        ">Add to cart</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full min-w-[400px] max-w-sm bg-white rounded-lg shadow dark:bg-gray-800">
                    <Link to="#">
                        <img className="p-2 rounded-t-lg
                    h-[300px] object-cover w-full
                    " src="https://i.pinimg.com/564x/c8/b4/55/c8b455500478f802c04224da3ce0fc2e.jpg" alt="product" />
                    </Link>
                    <div className="px-2 pb-5">
                        <Link to="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <Link to="#" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none
                         focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-green-600 dark:hover:bg-green-700
                        ">Add to cart</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full min-w-[400px] max-w-sm bg-white rounded-lg shadow dark:bg-gray-800">
                    <Link to="#">
                        <img className="p-2 rounded-t-lg
                    h-[300px] object-cover w-full
                    " src="https://i.pinimg.com/564x/ff/b3/3b/ffb33b806286679501b13209690d54a9.jpg" alt="product" />
                    </Link>
                    <div className="px-2 pb-5">
                        <Link to="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <Link to="#" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none
                         focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-green-600 dark:hover:bg-green-700
                        ">Add to cart</Link>
                        </div>
                    </div>
                </div>

            </div> */}

            <Products category_id={category_id} />

        </div>
    )
}

export default CategoryItem