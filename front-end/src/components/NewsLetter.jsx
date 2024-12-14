import axios from 'axios';
import React, { useState } from 'react'
import IsValidEmail from './utils/IsValidEmail';

function NewsLetter() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("ERROR");

    const submitData = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(false);
        if ( !IsValidEmail(email)) {
            setError(true)
            setErrorMessage("invalid email inserted")
            return false;
        }
        // if (email.length === 0) {
        //     setError(true)
        //     setErrorMessage("insert email !!")
        //     return false;
        // }

        setLoading(true);

        await axios.post("https://perfumy-backend.ougjjou.com/api" + '/newsletter/join', {
            "email": email
        })
            .then(response => {
                setSuccess(true);
                setEmail("");
            }).
            catch(err => {
                setError(true);
                console.log(55555555555);
            }).finally(() => {
                setLoading(false);
            });
    };


    return (
        <div className="flex justify-center items-center">
            <div className="p-2">
                <div
                    className="flex flex-wrap items-center w-full max-w-5xl p-5 mx-auto text-left rounded lg:flex-nowrap md:p-8 dark:border-gray-700">
                    <div className="flex-1 w-full mb-5 md:mb-0 md:pr-5 lg:pr-10 md:w-1/2">
                        <h3 className="mb-2 text-2xl font-bold text-gray-700">Subscribe to Newsletter</h3>
                        <p className="text-gray-500 dark:text-gray-400 ">Provide your email to get email notification when we launch
                            new
                            products or publish new articles
                        </p>
                    </div>
                    <div className="w-full px-1 flex-0 md:w-auto lg:w-1/2">

                        {error ?
                            <p className='text-center text-red-800 italic font-bold py-2'> {errorMessage} </p>
                            :
                            null
                        }

                        {
                            success && <p className='text-center text-green-500 font-bold py-2'>
                                You are now in our news letter
                            </p>
                        }

                        <form action='' method='POST'
                            onSubmit={(e) => submitData(e)}
                        >
                            <div className="flex flex-col sm:flex-row">
                                <input type="email"
                                    value={email || ""}
                                    onChange={e => setEmail(e.target.value.toString().toLocaleLowerCase().trim())}
                                    id="email" name="email" placeholder="Enter your email address"
                                    className="flex-1 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md sm:mr-5
                             focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                />
                                {
                                    !loading ?
                                        <button type="submit"
                                            className="w-full px-6 py-4 mt-5 text-white text-lg bg-gray-900 rounded-md sm:mt-0 sm:w-auto whitespace-nowrap dark:bg-gray-900">
                                            Subscribe
                                        </button>
                                        :
                                        <button type="submit"
                                            className="w-full px-6 py-4 mt-5 text-white 
                                            text-lg bg-gray-900 rounded-md sm:mt-0 
                                            sm:w-auto whitespace-nowrap 
                                            opacity-60 cursor-auto
                                            dark:bg-gray-900">
                                            Subscribe
                                        </button>
                                }


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter