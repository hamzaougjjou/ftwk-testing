import { Link } from 'react-router-dom';
import Rating from './Rating';
import Text from './../utils/TextDirection';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart as addTocartRedux } from "../redux/reducers/CartSlice";


function ProductItemInfo({ product, loading }) {


    const dispatch = useDispatch();

    let Cart = useSelector(state => state.Cart);

    let addToCart = () => {
        dispatch(addTocartRedux({ ...product.data, quantity: 1 }));
    }

    if (loading) {
        return (
            <h1>LOADING ...</h1>
        );
    }




    return (
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333]">
                {
                    product.data.title
                }
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-[#333] text-3xl font-bold">$
                    {
                        product.data.price
                    }
                </p>
                <p className="text-gray-400 text-lg"><strike>

                    ${
                        product.data.old_price
                    }

                </strike></p>
            </div>

            <div className="flex space-x-2 mt-4">


                <Rating rating={product.data.reviews.rate_avg} />


                <h4 className="text-[#333] text-base">
                    ({product.data.reviews.rate_count})
                    Reviews</h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
                <Link
                    to={"/checkout?source=product&id=" + product.data.id}
                >
                    <button type="button" className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-semibold rounded">Buy now</button>
                </Link>

                {
                    Cart.find(item => item.id === product.data.id) ?
                        <button
                            className="flex items-center justify-center 
                                            rounded-md bg-slate-900 px-5 py-2.5 text-center
                                            text-sm font-medium text-white hover:bg-gray-700 
                                            focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            In Cart
                        </button>


                        :
                        <button
                            onClick={() => addToCart(product)}
                            className="flex items-center justify-center 
                                            rounded-md bg-slate-900 px-5 py-2.5 text-center
                                            text-sm font-medium text-white hover:bg-gray-700 
                                            focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to cart
                        </button>
                }

            </div>



            <div className='py-4'>
                <Text text="Description ." styleClass="py-2 font-bold text-blue-500 text-2xl" />
                <Text text={product.data.description} />
            </div>

        </div>
    )
}




export default ProductItemInfo