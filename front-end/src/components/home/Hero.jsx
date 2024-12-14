import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import "./hero.css";
import hero_product_1 from "./../../assets/hero_product_1.png";
import hero_product_2 from "./../../assets/hero_product_2.png";
import hero_product_3 from "./../../assets/hero_product_3.png";

function Hero() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

    const navigateSlide = (slideIndex) => {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            setCurrentSlide(slideIndex);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (

        <>

            <div className="relative w-full h-[50vh] min-h-[700px] mx-auto overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    <div className="min-w-full h-screen bg-cover bg-center">
                        <div className="bg-neutral-50 px-6 py-12 dark:bg-neutral-900 md:px-12 lg:text-left dark:text-white">
                            <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                                <div className="grid items-center gap-12 lg:grid-cols-2">
                                    <div className="mt-12 lg:mt-0">

                                        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl leading-snug">

                                            Smell is a
                                            <br />
                                            word Perfume is
                                            <br />
                                            <span className="text-green-500">literature</span>
                                        </h1>

                                        <p className='text-gray-500'>
                                            Discover the beauty of fragrance with
                                            our collection of premium perfumes
                                            to enrich your everyday smell
                                        </p>

                                        <Link
                                            to="/products"
                                            className="bg-green-500
                            inline-block
                            hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full mt-5">
                                            Shop Now
                                        </Link>


                                    </div>
                                    <div className="mb-12 lg:mb-0">

                                        <img src={hero_product_1}
                                            className="w-full rounded-lg w-[500px] max-w-[100%]" alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-full h-screen bg-cover bg-center">
                        <div className="bg-neutral-50 px-6 py-12 dark:bg-neutral-900 md:px-12 lg:text-left dark:text-white">
                            <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                                <div className="grid items-center gap-12 lg:grid-cols-2">
                                    <div className="mt-12 lg:mt-0">

                                        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl leading-snug">

                                            Smell is a
                                            <br />
                                            word Perfume is
                                            <br />
                                            <span className="text-green-500">literature</span>
                                        </h1>

                                        <p className='text-gray-500'>
                                            Discover the beauty of fragrance with
                                            our collection of premium perfumes
                                            to enrich your everyday smell
                                        </p>

                                        <Link
                                            to="/products"
                                            className="bg-green-500
                            inline-block
                            hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full mt-5">
                                            Shop Now
                                        </Link>


                                    </div>
                                    <div className="mb-12 lg:mb-0">

                                        <img src={hero_product_2}
                                            className="w-full rounded-lg w-[500px] max-w-[100%]" alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-full h-screen bg-cover bg-center">
                        <div className="bg-neutral-50 px-6 py-12 dark:bg-neutral-900 md:px-12 lg:text-left dark:text-white">
                            <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                                <div className="grid items-center gap-12 lg:grid-cols-2">
                                    <div className="mt-12 lg:mt-0">

                                        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl leading-snug">

                                            Smell is a
                                            <br />
                                            word Perfume is
                                            <br />
                                            <span className="text-green-500">literature</span>
                                        </h1>

                                        <p className='text-gray-500'>
                                            Discover the beauty of fragrance with
                                            our collection of premium perfumes
                                            to enrich your everyday smell
                                        </p>

                                        <Link
                                            to="/products"
                                            className="bg-green-500
                            inline-block
                            hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full mt-5">
                                            Shop Now
                                        </Link>


                                    </div>
                                    <div className="mb-12 lg:mb-0">

                                        <img src={hero_product_3}
                                            className="w-full rounded-lg w-[500px] max-w-[100%]" alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={() => navigateSlide(0)}></div>
                    <div className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={() => navigateSlide(1)}></div>
                    <div className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={() => navigateSlide(2)}></div>
                </div>
            </div>
        </>

    )
}

export default Hero

