import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IsValidEmail from '../../utils/IsValidEmail';


function Register() {

    const emailInpt = useRef();
    const passwordInpt = useRef();
    const nameInpt = useRef();
    const confirmPasswordInpt = useRef();
    const phoneInpt = useRef();

    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const handlRegister = async (e) => {
        e.preventDefault();
        setLoginError('');

        const body = {
            "email": email,
            "name": name,
            "phone": phone,
            "confirmPassword": confirmPassword,
            "password": password
        };

        if (name.length < 2) {
            setLoginError('please insert a valid name');
            nameInpt.current.focus();
            return 0;
        }

        if ( !IsValidEmail( email ) ) {
            setLoginError('please insert a valid email');
            emailInpt.current.focus();
            return 0;
        }
        
        if (  phone.length < 10 ) {
            setLoginError('please insert a valid phone number');
            emailInpt.current.focus();
            return 0;
        }

        if (password.length < 6) {
            setLoginError('invalid password');
            passwordInpt.current.focus();
            return 0;
        }

        if (password !== confirmPassword) {
            setLoginError('password and password confirmation not same');
            confirmPasswordInpt.current.focus();
            return 0;
        }


        setLoading(true);
        await fetch(`${process.env.REACT_APP_API_URL}/register`,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }
        )
            .then(res => res.json())
            .then(result => {

                console.log('====================================');
                console.log(result);
                console.log('====================================');
                // setLoading(false);
                if (result.success === true) {

                    localStorage.setItem('authInfo', JSON.stringify({
                        'email': email,
                        'password': password
                    }));

                    // localStorage.setItem('auth', JSON.stringify(data.auth));
                    // localStorage.setItem('user', JSON.stringify(data.user));

                    // window.location.href = "/";
                }
                if (result.code === -1) {
                    setLoginError('Email already used');
                }
            }
            ).catch(errors => {
                setLoginError('somthing went worng');
            }).finally(() => {
                setLoading(false);
            })

    }

    return (
        <section className="bg-sky-50">

            <div className="flex flex-col items-center justify-center px-6 py-5 mx-auto m:h-sdcreen lg:py-0">
                <br />
                <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-10">

                    <h1 className="text-xl pt-2 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-red">
                        Create account
                    </h1>

                    {
                        loginError &&
                        <p className="text-sm pt-2 text-center font-bold leading-tight tracking-tight text-rose-600">
                            {loginError}
                        </p>
                    }


                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6"
                            onSubmit={e => handlRegister(e)}
                            action="#">


                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                                <input type="text"
                                    ref={nameInpt}
                                    onChange={e => setName(e.target.value)}
                                    name="email" id="email" className="bg-gray-50 border border-gray-300 
                                    text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John Doe" required="" />
                            </div>


                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email"
                                    ref={emailInpt}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="phone" 
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                <input type="number"
                                    ref={phoneInpt}
                                    onChange={e => setPhone(e.target.value)}
                                    name="phone"
                                    id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900
                                    sm:text-sm rounded-lg focus:ring-primary-600 
                                    focus:border-primary-600 block w-full p-2.5 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="06000000000" required=""/>
                            </div>




                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password"
                                    ref={passwordInpt}
                                    onChange={e => setPassword(e.target.value)}
                                    id="password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirmPassword"
                                    ref={confirmPasswordInpt}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    id="password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember"
                                            aria-describedby="remember" type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                                    focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600
                                     dark:ring-offset-gray-800"
                                            defaultChecked
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            {
                                loading ?
                                    <button type="button" className="w-full text-white   bg-[#0284c7] hover:bg-primary-700 
                                    focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                    opacity-40 cursor-not-allowed cursor-default
                                    ">Register</button>
                                    :
                                    <button type="submit" className="w-full text-white  bg-[#0284c7] hover:bg-primary-700 
                                    focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                    ">Register</button>
                            }


                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <br />
            
        </section>
    )
}

export default Register