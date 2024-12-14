import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextTruncator from "./../utils/TextTruncator ";
import "./style.css";
import IsValidEmail from '../utils/IsValidEmail';
import Loading from './../utils/Loading';


const CheckOut = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] = useState(false);
    const [myCart, setMyCart] = useState([]);
    let [productItem, setProductItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [redirectSeconds, setRedirectSeconds] = useState(100);
    let percentage = (redirectSeconds / 100) * 100;

    const [error, setError] = useState('');


    let cart = useSelector(state => state.Cart);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const source = params.get('source');
    const id = params.get('id');


    const fetchData = async () => {
        await axios(
            `${process.env.REACT_APP_API_URL}/products/${id}`
            , {})
            .then(response => {
                setProductItem(response.data.data);
            }).
            catch(err => {
                setMyCart(cart)
            }).finally(() => {
            });
    };

    useEffect(() => {
        if (source == "product") {
            fetchData();
        }
    }, [])

    useEffect(() => {
        if (productItem != null)
            setMyCart([{...productItem,quantity:1}]);
            else
            setMyCart( cart );
    }, [productItem])


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.name.length < 2) {
            setError('الاسم غير صالح');
            return false;
        }
        if (formData.city.length < 2) {
            setError('المدينة غير صالح');
            return false;
        }
        if (formData.address.length < 2) {
            setError('العنوان غير صالح');
            return false;
        }
        if (formData.phone.length < 10) {
            setError('رقم الهاتف غير صالح');
            return false;
        }
        if (!IsValidEmail(formData.email)) {
            setError('البريد الالكتروني غير صالح');
            return false;
        }

        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
                ...formData,
                cart: JSON.stringify(myCart)
            });
            if (response.data.success) {
                setFormData({
                    name: '',
                    address: '',
                    city: '',
                    email: '',
                    phone: ''
                });
                setShowPopUp(true);
            } else {
                setError(response.data.message);
            }
            setLoading(false)
        } catch (err) {
            setError('An error occurred while placing the order.');
            setLoading(false)
        }
    };

    useEffect(() => {
        if (showPopUp) {
            document.body.style.overflow = "hidden";

            const interval = setInterval(() => {
                setRedirectSeconds(prev => {
                    if (prev === 1) {
                        document.body.style.overflow = "auto";
                        clearInterval(interval);
                        navigate("/")
                    }
                    return prev - 1;
                });
            }, 100);
            return () => clearInterval(interval); // Cleanup on unmount or showPopUp change

        } else {
            document.body.style.overflow = "auto";
        }
    }, [showPopUp]);


    return (
        <>

            {
                showPopUp &&
                <div className="overflow-y-auto overflow-x-hidden fixed
                        top-0 right-0 left-0 z-50 justify-center items-center w-screen
                        md:inset-0 h-screen max-h-screen bg-[#121212bd] flex align-center justify-center">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="progress-modal">
                            {/* <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close</span> */}
                        </button>

                        <div className="p-4 md:p-5 !pt-12">

                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white
                        text-end
                        ">
                                تم تأكيد طلبيتكم
                            </h3>

                            <p className="p-4 text-end">
                                تم تأكيد طلبكم و سيتم التأكيد و ارسالها في اقرب وقت
                            </p>



                            <div className="mb-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white
                            text-end
                            ">
                                    العودة للصفحة الرئيسية خلال {redirectSeconds < 10 ? "0" + Math.floor(redirectSeconds / 10) :
                                        Math.floor(redirectSeconds / 10)} ثواني
                                </p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                <div className={`bg-orange-500 h-2.5 rounded-full w-[${percentage}]`}
                                    style={{
                                        width: percentage + "%"
                                    }}
                                ></div>
                            </div>

                            <div className="mt-8">
                                <Link
                                    to="/"
                                    data-modal-hide="progress-modal" type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800
                                focus:outline-none font-medium 
                                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                dark:hover:bg-blue-700">الصفحة الرئيسية</Link>

                            </div>
                        </div>
                    </div>
                </div>
            }


            <div className="container">
                <h1 className="check-out-title">تاكيد الطلب</h1>




                <div className="row main_row">
                    <div className="col-75">
                        <div className="content">
                            {/* {error && <p className="text-center text-red-400 p-3">{error}</p>} */}
                            {
                                (error || error.length > 0) &&
                                <>
                                    <h1 className="check-out-title !text-red-700
                mt-4 mb-4 text-lg
                font-bold shadow-md">
                                        {error}
                                    </h1>
                                    <br />
                                </>

                            }

                            <form onSubmit={handleSubmit}>
                                <div className="rowk">
                                    <div className="col-50">
                                        <label htmlFor="name">
                                            <i className="fa fa-user"></i>
                                            الاسم الكامل
                                        </label>
                                        <input
                                            className="p-2"

                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Nom & prenom"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="address">
                                            <i className="fa fa-address-card-o"></i> العنوان
                                        </label>
                                        <textarea
                                            className="p-2"
                                            id="address"
                                            name="address"
                                            placeholder="542 W. 15th Street"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                        <label htmlFor="city">
                                            <i className="fa fa-institution"></i> المدينة
                                        </label>
                                        <input
                                            className="p-2"

                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="ville"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-50">
                                        <label htmlFor="email">
                                            <i className="fa fa-envelope"></i> البريد الالكتروني
                                        </label>
                                        <input
                                            className="p-2"
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="phone">
                                            <i className="fa fa-phone"></i> رقم الهاتف
                                        </label>
                                        <input
                                            className="p-2"

                                            type="number"
                                            id="phone"
                                            name="phone"
                                            placeholder="06xxxxxxxx"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <label>
                                    <input
                                        className="p-2"
                                        type="checkbox" name="sameadr" checked readOnly />
                                    ارسال الطلبية الى العنوان المدكور اعلى
                                </label>


                                <div>
                                    {
                                        loading ?
                                            <button type="button" className="btn opacitys-]0 
                                            !flex align-center justify-center
                                            !cursor-not-allowed	pt-4 pb-2">

                                                <span className='block -mt-1'>
                                                    <Loading />
                                                </span>

                                                <span>
                                                    تاكيد الطلبية
                                                </span>
                                            </button>
                                            :
                                            <button type="submit" className="btn active pt-4 pb-4">
                                                تاكيد الطلبية
                                            </button>
                                    }


                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-25">
                        <div className="content">
                            <section className="edit-cart-container">
                                <Link to="/cart">تعديل السلة</Link>
                            </section>
                            <h4>
                                Cart
                                <span className="price">
                                    <i className="fa fa-shopping-cart"></i>
                                    <b>{cart.length}</b>
                                </span>
                            </h4>
                            <hr />
                            {myCart.map((item, index) => (
                                <div key={index}>
                                    <section className='flex justify-between py-2'>
                                        <span>{item.quantity} - </span>


                                        <Link
                                            target='_blank'
                                            to={`/books/${item.id}`}>
                                            <TextTruncator
                                                text={item.title}
                                                len={9}
                                            />

                                        </Link>
                                        <span className="price">{item.price} DH</span>
                                    </section>
                                    <hr />
                                </div>
                            ))}
                            <p className="total-price-container">
                                Total
                                <span className="price">
                                    <b>
                                        {myCart.reduce((total, item) => total + item.quantity * item.price, 0)}
                                    </b>
                                    <span className="currency">DH</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;
