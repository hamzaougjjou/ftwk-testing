import React, { useState } from 'react'
import useAxios from '../hooks/useAxios';
import avatar from './../../assets/avatar.jpg';
import AddedReviews from './AddedReviews';
import AddReview from './AddReview';
import Rating from './Rating';

const LoadingItem = () => {
    return (
        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 animate-pulse">
            <h3 className="text-lg font-bold bg-gray-100 w-[200px] h-[20px]"></h3>
            <div className='flex flex-wrap gap-4 w-full justify-between py-4'>
                <div className="flex rounded p-3
                            w-[45%]
                            min-w-[400px] bg-gray-100">
                    <p
                        className="w-12 h-12
                                bg-gray-200
                                 rounded-full border-2 border-white" ></p>
                    <div className="ml-3 w-full">
                        <h4 className="bg-gray-300 w-[200px] h-[20px]"></h4>
                        <div className="flex space-x-1 mt-1">
                            <p className="bg-gray-500 w-[150px] h-[10px]"></p>
                        </div>

                        <br />
                        <div className='flex gap-[10px]'>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-300 w-[20px] h-[20px]"></p>
                        </div>

                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[90%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[30%] h-[10px] mt-3 px-3"></p>

                    </div>
                </div>
                <div className="flex rounded p-3
                            w-[45%]
                            min-w-[400px] bg-gray-100">
                    <p
                        className="w-12 h-12
                                bg-gray-200
                                 rounded-full border-2 border-white" ></p>
                    <div className="ml-3 w-full">
                        <h4 className="bg-gray-300 w-[200px] h-[20px]"></h4>
                        <div className="flex space-x-1 mt-1">
                            <p className="bg-gray-500 w-[150px] h-[10px]"></p>
                        </div>

                        <br />
                        <div className='flex gap-[10px]'>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-300 w-[20px] h-[20px]"></p>
                        </div>

                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[90%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[30%] h-[10px] mt-3 px-3"></p>

                    </div>
                </div>
                <div className="flex rounded p-3
                            w-[45%]
                            min-w-[400px] bg-gray-100">
                    <p
                        className="w-12 h-12
                                bg-gray-200
                                 rounded-full border-2 border-white" ></p>
                    <div className="ml-3 w-full">
                        <h4 className="bg-gray-300 w-[200px] h-[20px]"></h4>
                        <div className="flex space-x-1 mt-1">
                            <p className="bg-gray-500 w-[150px] h-[10px]"></p>
                        </div>

                        <br />
                        <div className='flex gap-[10px]'>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-300 w-[20px] h-[20px]"></p>
                        </div>

                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[90%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[30%] h-[10px] mt-3 px-3"></p>

                    </div>
                </div>
                <div className="flex rounded p-3
                            w-[45%]
                            min-w-[400px] bg-gray-100">
                    <p
                        className="w-12 h-12
                                bg-gray-200
                                 rounded-full border-2 border-white" ></p>
                    <div className="ml-3 w-full">
                        <h4 className="bg-gray-300 w-[200px] h-[20px]"></h4>
                        <div className="flex space-x-1 mt-1">
                            <p className="bg-gray-500 w-[150px] h-[10px]"></p>
                        </div>

                        <br />
                        <div className='flex gap-[10px]'>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-300 w-[20px] h-[20px]"></p>
                        </div>

                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[90%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[30%] h-[10px] mt-3 px-3"></p>

                    </div>
                </div>
                <div className="flex rounded p-3
                            w-[45%]
                            min-w-[400px] bg-gray-100">
                    <p
                        className="w-12 h-12
                                bg-gray-200
                                 rounded-full border-2 border-white" ></p>
                    <div className="ml-3 w-full">
                        <h4 className="bg-gray-300 w-[200px] h-[20px]"></h4>
                        <div className="flex space-x-1 mt-1">
                            <p className="bg-gray-500 w-[150px] h-[10px]"></p>
                        </div>

                        <br />
                        <div className='flex gap-[10px]'>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-400 w-[20px] h-[20px]"></p>
                            <p className="bg-gray-300 w-[20px] h-[20px]"></p>
                        </div>

                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[100%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[90%] h-[10px] mt-3 px-3"></p>
                        <p className="bg-gray-200 w-[30%] h-[10px] mt-3 px-3"></p>

                    </div>
                </div>
            </div>
        </div>
    )
}


function ProductItemReviews({ product, loading }) {






    const [addedReviews, setAddedReviews] = useState([]);

    const { data: reviews, loading: loading_reviews, error } = useAxios(
        `/products/${product.data.id}/reviews`
        , {
            method: 'GET',
        });

    // if (loading) {
    //     return (
    //         <LoadingItem />
    //     );
    // }

    if (error) {
        return (
            <h1>Error ...</h1>
        );
    }


    if (loading_reviews) {
        return (
            <LoadingItem />
        );
    }


    return (
        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">


            <AddReview product={product} loading={loading} addedReviews={addedReviews}
                setAddedReviews={setAddedReviews} />

            <h3 className="text-lg font-bold text-[#333]">Reviews ( {reviews.data.length} )</h3>
            <div className='flex flex-wrap gap-4 w-full justify-between py-4'>

                <AddedReviews addedReviews={addedReviews} />

                {
                    reviews.data.map(review => (
                        <div
                            key={review.id}
                            className="flex rounded p-3
                            w-[100%]
                            max-w-[500px] bg-gray-100">
                            <img src={avatar}
                                alt={review.name}
                                className="w-12 h-12 rounded-full border-2 border-white" />
                            <div className="ml-3">
                                <h4 className="text-sm font-bold text-[#333]">
                                    {review.name}
                                </h4>
                                <div className="flex space-x-1 mt-1">
                                    <p className="text-xs !ml-2 font-semibold text-[#333]">
                                        {review.created_at_formatted}
                                    </p>
                                </div>
                                <br />
                                <Rating rating={review.stars} />
                                <p className="text-sm mt-4 text-[#333]">
                                    {review.message}
                                </p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}


export default ProductItemReviews