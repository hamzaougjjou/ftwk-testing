import React, { useEffect, useState } from 'react'

function ProductItemImages({ product, loading }) {


    const [mainImage, setMainImage] = useState(product?.data?.image);

    useEffect(() => {
        setMainImage(product?.data?.image)
    }, [product]);

    if (loading) return <><Loading /></>;


    return (
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">

            <div className="px-4 py-10 rounded-xl 
             relative
            min-h-[450px]
            overflow-y-auto
            "
            >
                <img src={mainImage} alt={product?.data?.title}
                    className="w-4/5 rounded 
                max-h-[380px]
                mx-auto
                object-cover"
                />

                <button type="button" className="absolute top-4 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                    </svg>
                </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                <div className="overflow-hidden h-[150px] rounded-xl p-4 ">
                    <img
                        onClick={() => setMainImage(product?.data?.image)}
                        src={product?.data?.image} alt="Product2" className="w-24 cursor-pointer" />
                </div>


                {
                    product?.data.sub_images.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="overflow-hidden h-[150px] rounded-xl p-4 ">
                                <img
                                    onClick={() => setMainImage(item)}
                                    src={item} alt="Product2"
                                    className="w-24 cursor-pointer" />
                            </div>
                        )
                    }

                    )
                }


            </div>
        </div>
    )
}


const Loading = () => {

    return (
        <div
            className="lg:col-span-3 w-full lg:sticky top-0 text-center 
                animate-pulse">

            <div className="px-4 py-10 rounded-xl  relative">

                <p
                    className="w-4/5 rounded 
                    bg-gray-300 min-h-[300px]
                    mx-auto
                    object-cover"
                ></p>

                <div type="button" className="absolute top-4 right-4">
                    <p className="w-[40px] rounded bg-gray-400 h-[40px]"></p>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                <div className="rounded-xl p-4 ">
                    <p className="w-[100px] rounded bg-gray-300 h-[100px]"></p>
                </div>
                <div className="rounded-xl p-4 ">
                    <p className="w-[100px] rounded bg-gray-300 h-[100px]"></p>
                </div>
                <div className="rounded-xl p-4 ">
                    <p className="w-[100px] rounded bg-gray-300 h-[100px]"></p>
                </div>
                <div className="rounded-xl p-4 ">
                    <p className="w-[100px] rounded bg-gray-300 h-[100px]"></p>
                </div>
            </div>
        </div>
    )
}

export default ProductItemImages 