import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CartItem from './CartItem';

function Cart() {

    let cart = useSelector(state => state.Cart);
    const [subTotal, setSubTotal] = useState(0)

    const [shipping, setShipping] = useState(35);

    useEffect(() => {
        setSubTotal(cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0))
    }, [cart])

    return (
        <div className="font-[sans-serif]">
            <div className="p-6">
                <div className="lg:col-span-2 bg-white divide-y">

                    {

                        cart.map(item => (
                            <CartItem item={item} key={item.id} />
                        ))

                    }

                </div>

            </div>


            <div className='flex justify-end'>


                <div className="shadow-md p-6  max-w-[500px]">
                    <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">Order Summary</h3>
                    <ul className="text-[#333] divide-y mt-6">
                        <li className="flex flex-wrap gap-4 text-md py-4">Subtotal <span className="ml-auto font-bold">
                            ${
                                subTotal
                            }
                        </span></li>
                        <li className="flex flex-wrap gap-4 text-md py-4">Shipping
                            <span className="ml-auto font-bold">${shipping}</span></li>
                        <li className="flex flex-wrap gap-4 text-md py-4">Tax
                            <span className="ml-auto font-bold">$00.00</span></li>
                        <li className="flex flex-wrap gap-4 text-md py-4 font-bold">Total
                            <span className="ml-auto">
                                ${
                                    subTotal + shipping
                                }
                            </span></li>
                    </ul>
                    <Link to="/checkout" className="mt-6 text-md px-6 py-2.5 w-full bg-green-600 hover:bg-green-700 text-white rounded">Check
                        out</Link>

                    {/* <div className="mt-10">
                        <h3 className="text-xl font-extrabold text-[#333] mb-6">Apply promo code</h3>
                        <div className="flex border border-blue-600 overflow-hidden max-w-md rounded">
                            <input type="email" placeholder="Promo code"
                                className="w-full outline-none bg-white text-gray-600 text-md px-4 py-2.5" />
                            <button type='button' className="flex items-center justify-center bg-green-600 hover:bg-green-700 px-6 text-md text-white">
                                Apply
                            </button>
                        </div>
                    </div> */}
                </div>

            </div>

        </div>
    )
}

export default Cart