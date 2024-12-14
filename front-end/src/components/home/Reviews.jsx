import React from 'react'
import useAxios from '../hooks/useAxios';
import avatar from "./../../assets/avatar.jpg";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// const element = <FontAwesomeIcon icon="fa-solid fa-house" />;
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Reviews() {

    const { data, loading, error } = useAxios('/home/reviews', {
        method: 'GET',
    });



    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (



        <div>




            <h1 className='py-10 px-5 bold text-3xl text-yellow-500 underline' >Our customers
            </h1>

            {/* <div className='f'> */}

                {
                    (!error && !loading) &&

                    <Carousel
                        responsive={responsive}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px cursor-pointer flex flex-wrap justify-center"
                    >
                        {
                            data.data.map(review => (
                                <article className='m-3 p-2 bg-gray-100
                                rounded !w-[400px]'>
                                    <div class="flex items-center mb-4">
                                        <img class="w-10 h-10 me-4 rounded-full" src={avatar} alt="" />
                                        <div class="font-medium">

                                            <p>{review.name}</p>
                                        </div>
                                    </div>

                                    <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">

                                        {
                                            gererateRateStars(3.4)
                                        }
                                        {/* <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg> */}

                                    </div>

                                    <section class="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>
                                        <time dateTime="2017-03-03 19:00">
                                            {review.created_at_formatted}
                                        </time></p></section>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">
                                        {review.message}
                                        {/* <br />
                                { element } */}
                                    </p>
                                </article>
                            ))
                        }
                    </Carousel>

                }
            {/* </div> */}
        </div>
    )
}



const gererateRateStars = (stars) => {

    const starElements = [];
    for (let i = 0; i < Math.floor(stars); i++) {
        starElements.push(
            <svg key={i + 5} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        );
    }

    for (let i = 0; i < 5; i++) {
        starElements.push(
            <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        );
    }

    return starElements;
}
export default Reviews