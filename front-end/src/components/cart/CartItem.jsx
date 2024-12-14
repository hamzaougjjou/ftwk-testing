import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart as removeFromCartRedux } from "../redux/reducers/CartSlice";
import TextTruncator from "./../utils/TextTruncator ";

function CartItem({ item }) {



    const dispatch = useDispatch();
    const [cartItemQuantity, setCartItemQuantity] = useState(item.quantity);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        dispatch(updateQuantity({ id: item.id, quantity: cartItemQuantity }));
    }, [cartItemQuantity])

    const removeFromCart = (item) => {
        dispatch( removeFromCartRedux( item ) );
        setShowDeletePopup( false );
    }

    return (

        <>
            {/* =================================================== */}
            {
                showDeletePopup &&

                <div
                    class="flex overflow-y-auto overflow-x-hidden fixed top-0
                            right-0 z-50 justify-center items-center
                            w-full
                            h-[100vh] bg-[#121212bb]">

                    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
                            onClick={() => setShowDeletePopup(false)}
                        >
                            <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close</span>
                            </button>
                            <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                aria-hidden="true" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            <p class="mb-4 text-gray-500 dark:text-gray-300">
                                Are you sure you want to delete this item?</p>
                            <div class="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => setShowDeletePopup(false)}
                                    type="button"
                                    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white
                              rounded-lg border border-gray-200
                               hover:bg-gray-100 focus:outline-none
                                hover:text-gray-900 focus:z-10 dark:bg-gray-700 
                                dark:text-gray-300 dark:border-gray-500 dark:hover:text-white 
                                dark:hover:bg-gray-600">
                                    No, cancel
                                </button>
                                <button
                                onClick={ ()=>removeFromCart(item) }
                                 class="py-2 px-3 text-sm font-medium
                             text-center text-white bg-red-600 rounded-lg hover:bg-red-700 
                             focus:outline-none 
                             dark:bg-red-500 dark:hover:bg-red-600">
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            }
            {/* =================================================== */}
            <div
                className="flex items-start max-sm:flex-col gap-8 py-6">
                <div className="h-52 shrink-0 w-[120px] h-[200px] bg-sky-300">
                    <img
                        alt=""
                        src= {item.image}
                        className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex items-start gap-6 max-md:flex-col w-full">
                    <div>
                        <h3 className="text-xl font-extrabold text-[#333] mb-6">
                            {item.title}
                        </h3>
                        <div>
                            {/* <h6 className="text-md text-gray-500">Size: <strong className="ml-2">7.5</strong></h6>
                                            <h6 className="text-md text-gray-500 mt-2">Color: <strong className="ml-2">Black</strong></h6> */}
                          

                            <TextTruncator
                                        text={item.description}
                                        len={150}
                                        styleClass='text-gray-500 text-sm' />

                        </div>
                        <div className="mt-6 flex flex-wrap gap-6">
                            <button type="button"
                                onClick={() => setShowDeletePopup(true)}
                                className="font-semibold text-gray-500 text-sm flex items-center gap-2 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-current inline" viewBox="0 0 24 24">
                                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                                </svg>
                                Remove
                            </button>
                            {/* <button type="button" className="font-semibold text-gray-500 text-sm flex items-center gap-2 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" className="fill-current inline text-red-900" viewBox="0 0 64 64">
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                </svg>
                                Add to wish list
                            </button> */}
                        </div>
                    </div>
                    <div className="md:ml-auto md:text-right">
                        <div className="flex">
                            <button type="button" className="bg-transparent py-2 font-semibold text-[#333]"
                                onClick={() => setCartItemQuantity(cartItemQuantity - 1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                </svg>
                            </button>
                            <button type="button"

                                className="bg-transparent mx-4 px-4 py-2 font-semibold text-[#333] text-md border">
                                {item.quantity}
                            </button>
                            <button type="button" className="bg-transparent py-2 font-semibold text-[#333]"
                                onClick={() => setCartItemQuantity(cartItemQuantity + 1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-bold text-[#333]">
                                <strike className="text-gray-500 mr-2 font-medium">
                                    $ {item.old_price}
                                </strike></h4>
                            <h4 className="text-lg font-bold text-[#333] mt-2">
                                {item.price}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem