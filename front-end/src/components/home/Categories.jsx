import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios';
import './mainSlider.css';



function Categories() {

    const [result, setResult] = useState({
        data: null,
        loading: true,
        error: false
    });

    const { data, loading, error } = result;

    return (

        <div>

            <div className="text-center  py-10  px-3">
                <h1 className="text-3xl xl:text-4xl 
                            font-semibold leading-7 xl:leading-9
                             text-gray-800 dark:text-black">Shop By Category</h1>
                <SmallCategories setResult={setResult} />
            </div>
            <div className="flex justify-center items-center">

                {
                    (!loading && !error) &&
                    <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                        <div className="flex flex-col jusitfy-center items-center space-y-10">


                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">

                                {
                                    data.data.length >= 0 &&
                                    <Link to={'/categories/' + data.data[0].id} className="relative group flex justify-center items-center h-full w-full">
                                        <img className="object-center object-cover h-full w-full"
                                            src={data.data[0].image} alt="" />
                                        <button className="dark:bg-gray-800 dark:text-white focus:outline-none bottom-4 
                                        z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white
                                        ">
                                            {data.data[0].name}</button>

                                    </Link>
                                }


                                <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">

                                    {
                                        data.data.length >= 1 &&

                                        <Link to={'/categories/' + data.data[1].id} className="relative group flex justify-center items-center h-full w-full">
                                            <img className="object-center object-cover h-full w-full"
                                                src={data.data[1].image} alt={data.data[1].name} />
                                            <button className="dark:bg-gray-800 dark:text-white focus:outline-none bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                                                {data.data[1].name}
                                            </button>

                                        </Link>

                                    }

                                    {
                                        data.data.length >= 2 &&

                                        <Link to={'/categories/' + data.data[2].id} className="relative group flex justify-center items-center h-full w-full">
                                            <img className="object-center object-cover h-full w-full" src={data.data[2].image}
                                                alt={data.data[1].name} />
                                            <button className="dark:bg-gray-800 dark:text-white focus:outline-none 
                                                bottom-4 z-10 absolute text-base font-medium
                                                leading-none text-gray-800 py-3 w-36 bg-white">{data.data[2].name}</button>

                                        </Link>

                                    }
                                </div>

                                {
                                    data.data.length >= 4 &&
                                    <>
                                        <Link to={'/categories/' + data.data[3].id} className="relative group justify-center items-center h-full w-full hidden lg:flex">
                                            <img className="object-center object-cover h-full w-full" src={data.data[3].image} alt={data.data[3].name} />
                                            <button className="dark:bg-gray-800 dark:text-white focus:outline-none bottom-4 z-10 absolute 
                                            text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">{data.data[3].name}</button>

                                        </Link>


                                        <Link to={'/categories/' + data.data[3].id} className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                                            <img className="object-center object-cover h-full w-full hidden md:block" src={data.data[3].image} alt={data.data[3].name} />
                                            <img className="object-center object-cover h-full w-full md:hidden" src={data.data[3].image} alt={data.data[3].name} />
                                            <button className="dark:bg-gray-800 dark:text-white focus:outline-none bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">{data.data[3].name}</button>

                                        </Link>
                                    </>
                                }
                            </div>

                            <Link to={'/categories/' + data.data[3].id} className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
                                <img className="object-center object-cover h-full w-full hidden md:block" src={data.data[3].image} alt={data.data[3].name} />
                                <img className="object-center object-cover h-full w-full sm:hidden" src={data.data[3].image} alt={data.data[3].name} />
                                <button className="dark:bg-gray-800 dark:text-white focus:outline-none bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">{data.data[3].name}</button>
                            </Link>

                        </div>

                    </div>

                }
            </div>
        </div>
    )
}



function SmallCategories({ setResult }) {

    const { data, loading, error } = useAxios('/categories', {
        method: 'GET',
    });

    useEffect(() => {
        setResult(
            {
                data: data,
                loading: loading,
                error: error
            }
        )

    }, [data, loading, error])


    useEffect(() => {

        const carousel = document.querySelector(".carousel"),
            arrowIcons = document.querySelectorAll(".wrapper i");

        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

        const showHideIcons = () => {
            // showing and hiding prev/next icon according to carousel scroll left value
            let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
            arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
            arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
        }

        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = 350 //firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
                // if clicked icon is left, reduce width value from the carousel scroll left else add to it
                carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
                setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
            });
        });

        const autoSlide = () => {
            // if there is no image left to scroll then return from here
            if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

            positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
            let firstImgWidth = 350; //firstImg.clientWidth + 14;
            // getting difference value that needs to add or reduce from carousel left to take middle img center
            let valDifference = firstImgWidth - positionDiff;

            if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
                return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            }
            // if user is scrolling to the left
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }

        const dragStart = (e) => {
            // updatating global variables value on mouse down event
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            // scrolling images/carousel to left according to mouse pointer
            if (!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel.classList.add("dragging");
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        }

        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging");

            if (!isDragging) return;
            isDragging = false;
            autoSlide();
        }

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart);

        document.addEventListener("mousemove", dragging);
        carousel.addEventListener("touchmove", dragging);

        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("touchend", dragStop);

    }, [data]);




    return (

        <div className="wrapper">
            <i id="left" className="fa fa-angle-left"></i>
            <ul className="carousel">

                {

                    (loading && !error) &&
                    <>
                        <secton className="carousel-item animate-pulse" >
                            <div className='w-[200px] h-[200px]  text-center'>
                                <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
                                <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
                            </div>
                        </secton>
                        <secton className="carousel-item animate-pulse" >
                            <div className='w-[200px] h-[200px]  text-center'>
                                <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
                                <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
                            </div>
                        </secton>
                        <secton className="carousel-item animate-pulse" >
                            <div className='w-[200px] h-[200px]  text-center'>
                                <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
                                <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
                            </div>
                        </secton>
                        <secton className="carousel-item animate-pulse" >
                            <div className='w-[200px] h-[200px]  text-center'>
                                <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
                                <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
                            </div>
                        </secton>
                        <secton className="carousel-item animate-pulse" >
                            <div className='w-[200px] h-[200px]  text-center'>
                                <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
                                <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
                            </div>
                        </secton>
                        <secton className="carousel-item animate-pulse" >
                            <div className='w-[200px] h-[200px]  text-center'>
                                <p className='!w-[150px] !h-[150px] rounded-[50%] bg-gray-200 dark:bg-gray-700 '></p>
                                <p className='mt-5 w-[150px] h-[20px]  bg-gray-200 dark:bg-gray-700'></p>
                            </div>
                        </secton>
                    </>

                }

                {
                    (!loading && !error) &&
                    data.data.map(item => (
                        <Link to={"/categories/" + item.id} className="carousel-item" >

                            <div className='w-[200px] h-[200px]  text-center'>
                                <img alt=''
                                    src={item.image}
                                    className='!w-[150px] !h-[150px] rounded-[50%] object-cover'
                                />
                                <p className='bold mt-3 text-3xl !text-sky-600'>{item.name}</p>

                            </div>

                        </Link>
                    ))
                }

            </ul>
            <i id="right" className='fa fa-angle-right'></i>
        </div>
    )
}

export default Categories