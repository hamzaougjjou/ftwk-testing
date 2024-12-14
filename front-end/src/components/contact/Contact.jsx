import axios from 'axios';
import { useEffect, useState } from 'react'
import IsValidEmail from '../utils/IsValidEmail';
import Loading from '../utils/Loading';
import SocialMedia from './SocialMedia'

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("ERROR");

    useEffect( ()=>{
        setTimeout(() => {
            setSuccess(false)
        }, 6000);
    },[success])

    const submitData = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(false);

        if (name.length === 0) {
            setError(true)
            setErrorMessage("the Name  field is required")
            return false;
        }

        if (!IsValidEmail(email)) {
            setError(true)
            setErrorMessage("invalid email inserted")
            return false;
        }

        if (message.length === 0) {
            setError(true)
            setErrorMessage("message field is required")
            return false;
        }

        setLoading(true);
        await axios.post("https://perfumy-backend.ougjjou.com/api" + '/contact', {
            "name": name,
            "email": email,
            "message": message,
        })
            .then(response => {
                if (!response.data.success) {
                    setError(true);
                    setErrorMessage("Ooops Something went wrong , try again");
                    return false;
                }

                setSuccess(true);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
            }).
            catch(err => {
                setError(true);
            }).finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <section class="mb-32">
                <div id="map" class=" h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
                    <iframe
                        title='google map'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                        width="100%" height="500" allowFullscreen="" loading="lazy"></iframe>
                </div>
                <div class="px-6 md:px-12">
                    <div
                        class="block rounded-lg bg-white px-6 
                    py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                      md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
                        <div class="flex flex-wrap">
                            <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">

                                {error ?
                                    <p className='text-center text-red-800 italic font-bold py-2'> {errorMessage} </p>
                                    :
                                    null
                                }

                                {
                                    success && <p className='text-center text-green-500 font-bold py-2'>
                                        Message Sent successfully
                                    </p>
                                }
                                <form
                                    onSubmit={e => submitData(e)}
                                >

                                    <div class="relative mb-6" data-te-input-wrapper-init>
                                        <input type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value.toString().trim())}
                                            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                                            id="exampleInput91" />
                                        <label
                                            class="
                                            top-[15px]
                                            bg-white mt-[-10px] px-2
                                            py-[0px]
                                            pointer-events-none absolute top-0
                                            left-3 mb-0 max-w-[90%] origin-[0_0] 
                                            truncate leading-[1.6] text-neutral-500 transition-all duration-200 
                                            ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] 
                                            peer-focus:text-primary 
                                            peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
                                            peer-data-[te-input-state-active]:scale-[0.8] 
                                            motion-reduce:transition-none"
                                            for="exampleInput91">Name
                                        </label>
                                    </div>
                                    <div class="relative mb-6" data-te-input-wrapper-init>
                                        <input type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value.toString().trim())}
                                            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                                            id="exampleInput91" />
                                        <label
                                            class="
                                            top-[15px]
                                            bg-white mt-[-10px] px-2
                                            py-[0px]
                                            pointer-events-none absolute top-0
                                            left-3 mb-0 max-w-[90%] origin-[0_0] 
                                            truncate leading-[1.6] text-neutral-500 transition-all duration-200 
                                            ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] 
                                            peer-focus:text-primary 
                                            peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
                                            peer-data-[te-input-state-active]:scale-[0.8] 
                                            motion-reduce:transition-none"
                                            for="exampleInput91">Email address
                                        </label>
                                    </div>
                                    <div class="relative mb-6" data-te-input-wrapper-init>
                                        <input type="number"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value.toString().trim())}
                                            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                                            id="exampleInput91" />
                                        <label
                                            class="
                                            top-[15px]
                                            bg-white mt-[-10px] px-2
                                            py-[0px]
                                            pointer-events-none absolute top-0
                                            left-3 mb-0 max-w-[90%] origin-[0_0] 
                                            truncate leading-[1.6] text-neutral-500 transition-all duration-200 
                                            ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] 
                                            peer-focus:text-primary 
                                            peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
                                            peer-data-[te-input-state-active]:scale-[0.8] 
                                            motion-reduce:transition-none"
                                            for="exampleInput91">Phone Number
                                        </label>
                                    </div>
                                    <div class="relative mb-6" data-te-input-wrapper-init>
                                        <textarea
                                            class="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                                            id="exampleFormControlTextarea1" rows="3"
                                            onChange={e => setMessage(e.target.value.toString().trim())}
                                            value={message}
                                        ></textarea>
                                        <label for="exampleFormControlTextarea1"
                                            class="pointer-events-none absolute top-0 
                                            left-3 mb-0 max-w-[90%] origin-[0_0] truncate 
                                            pt-[0.37rem] leading-[1.6] text-neutral-500 
                                            transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] 
                                            peer-focus:scale-[0.8] peer-focus:text-primary
                                            peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
                                            peer-data-[te-input-state-active]:scale-[0.8] 
                                            motion-reduce:transition-none 
                                            top-3
                                            bg-white mt-[-10px] px-2"
                                        >Message</label>
                                    </div>
                                    {
                                        !loading ?

                                            <button type="submit"
                                                class="mb-6 w-full rounded bg-sky-500 text-white 
                                                        px-6 text-xs font-medium uppercase leading-normal
                                                        flex items-center justify-center py-2
                                                        lg:mb-0">
                                                                Send
                                                            </button>
                                            :
                                            <button type="button"
                                                class="mb-6 w-full rounded bg-sky-500 text-white 
                                                        px-6 text-xs font-medium uppercase leading-normal
                                                        flex items-center justify-center
                                                        lg:mb-0 opacity-50 cursor-auto">
                                                Send
                                                <Loading />
                                            </button>
                                    }


                                </form>
                            </div>
                            <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                                <div class="flex flex-wrap">
                                    <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                                        <div class="flex items-start">
                                            <div class="shrink-0">
                                                <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                        stroke="currentColor" class="h-6 w-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="ml-6 grow">
                                                <p class="mb-2 font-bold ">
                                                    Technical support
                                                </p>
                                                <p class="text-sm text-neutral-500">
                                                    example@gmail.com
                                                </p>
                                                <p class="text-sm text-neutral-500">
                                                    1-600-890-4567
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                                        <div class="flex items-start">
                                            <div class="srink-0">
                                                <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                        stroke="currentColor" class="w-7 h-7">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="ml-6 grow">
                                                <p class="mb-2 font-bold ">
                                                    Address
                                                </p>
                                                <p class="text-sm text-neutral-500">
                                                    abcd, <br />
                                                    xyz <br />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                                        <div class="align-start flex">
                                            <div class="shrink-0">
                                                <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">

                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                                        <path d="M 25 2 C 12.3 2 2 12.3 2 25 C 2 29.1 3.1 32.899219 5 36.199219 L 2 46.699219 C 1.9 46.999219 1.9992187 47.399219 2.1992188 47.699219 C 2.4992187 47.999219 2.8992187 48 3.1992188 48 L 14.199219 45.300781 C 17.399219 47.000781 21.1 48 25 48 C 37.7 48 48 37.7 48 25 C 48 12.3 37.7 2 25 2 z M 25 4 C 36.6 4 46 13.4 46 25 C 46 36.6 36.6 46 25 46 C 21.3 46 17.800781 45.000781 14.800781 43.300781 C 14.600781 43.200781 14.299609 43.099219 14.099609 43.199219 L 4.5 45.599609 L 7 36.400391 C 7.1 36.100391 7.0003906 35.899609 6.9003906 35.599609 C 5.1003906 32.499609 4 28.9 4 25 C 4 13.4 13.4 4 25 4 z M 18.113281 12.988281 C 17.925781 12.975781 17.800781 13 17.800781 13 L 16.599609 13 C 15.999609 13 15.100781 13.2 14.300781 14 C 13.800781 14.5 12 16.3 12 19.5 C 12 22.9 14.299609 25.799609 14.599609 26.099609 C 14.599609 26.099609 15 26.600781 15.5 27.300781 C 16 28.000781 16.699609 28.800781 17.599609 29.800781 C 19.399609 31.700781 21.899609 33.899219 25.099609 35.199219 C 26.499609 35.799219 27.699609 36.2 28.599609 36.5 C 30.199609 37 31.700781 36.900781 32.800781 36.800781 C 33.600781 36.700781 34.500391 36.299219 35.400391 35.699219 C 36.300391 35.099219 37.199609 34.400391 37.599609 33.400391 C 37.899609 32.600391 37.999609 31.900781 38.099609 31.300781 L 38.099609 30.5 C 38.099609 30.2 38.000781 30.200781 37.800781 29.800781 C 37.300781 29.000781 36.799219 29.000781 36.199219 28.800781 C 35.899219 28.600781 34.999219 28.200781 34.199219 27.800781 C 33.299219 27.400781 32.599609 27.000781 32.099609 26.800781 C 31.799609 26.700781 31.400391 26.499609 30.900391 26.599609 C 30.400391 26.699609 29.899609 27 29.599609 27.5 C 29.299609 27.9 28.200781 29.299219 27.800781 29.699219 L 27.699219 29.599609 C 27.299219 29.399609 26.7 29.200781 26 28.800781 C 25.2 28.400781 24.299219 27.800781 23.199219 26.800781 C 21.599219 25.400781 20.499219 23.699609 20.199219 23.099609 C 20.499219 22.699609 20.899609 22.3 21.099609 22 C 21.199609 21.9 21.280859 21.799219 21.349609 21.699219 C 21.418359 21.599219 21.475391 21.500391 21.525391 21.400391 C 21.625391 21.200391 21.700781 21.000781 21.800781 20.800781 C 22.200781 20.100781 22.000781 19.300391 21.800781 18.900391 C 21.800781 18.900391 21.7 18.600781 21.5 18.300781 C 21.4 18.000781 21.2 17.499609 21 17.099609 C 20.6 16.199609 20.2 15.199609 20 14.599609 C 19.7 13.899609 19.300781 13.399219 18.800781 13.199219 C 18.550781 13.049219 18.300781 13.000781 18.113281 12.988281 z M 16.599609 15 L 17.699219 15 L 17.900391 15 C 17.900391 15 17.999609 15.100391 18.099609 15.400391 C 18.299609 16.000391 18.799609 17.000391 19.099609 17.900391 C 19.299609 18.300391 19.499609 18.799609 19.599609 19.099609 C 19.699609 19.399609 19.800391 19.600781 19.900391 19.800781 C 19.900391 19.900781 20 19.900391 20 19.900391 C 19.8 20.300391 19.8 20.399219 19.5 20.699219 C 19.2 21.099219 18.799219 21.499219 18.699219 21.699219 C 18.599219 21.899219 18.299609 22.1 18.099609 22.5 C 17.899609 22.9 18.000781 23.599609 18.300781 24.099609 C 18.700781 24.699609 19.900781 26.700391 21.800781 28.400391 C 23.000781 29.500391 24.1 30.199609 25 30.599609 C 25.9 31.099609 26.600781 31.300391 26.800781 31.400391 C 27.200781 31.600391 27.599609 31.699219 28.099609 31.699219 C 28.599609 31.699219 29.000781 31.3 29.300781 31 C 29.700781 30.6 30.699219 29.399609 31.199219 28.599609 L 31.400391 28.699219 C 31.400391 28.699219 31.699609 28.8 32.099609 29 C 32.499609 29.2 32.900391 29.399609 33.400391 29.599609 C 34.300391 29.999609 35.100391 30.399609 35.400391 30.599609 L 36 30.900391 L 36 31.199219 C 36 31.599219 35.899219 32.200781 35.699219 32.800781 C 35.599219 33.100781 35.000391 33.699609 34.400391 34.099609 C 33.700391 34.499609 32.899609 34.800391 32.599609 34.900391 C 31.699609 35.000391 30.600781 35.099219 29.300781 34.699219 C 28.500781 34.399219 27.4 34.1 26 33.5 C 23.2 32.3 20.899219 30.3 19.199219 28.5 C 18.399219 27.6 17.699219 26.799219 17.199219 26.199219 C 16.699219 25.599219 16.500781 25.2 16.300781 25 C 15.900781 24.6 14 21.999609 14 19.599609 C 14 17.099609 15.200781 16.100391 15.800781 15.400391 C 16.100781 15.000391 16.499609 15 16.599609 15 z"></path>
                                                    </svg>

                                                </div>
                                            </div>
                                            <div class="ml-6 grow">
                                                <p class="mb-2 font-bold ">Whatsap</p>
                                                <p class="text-neutral-500"> +212 06 37820834
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                                        <div class="align-start flex">
                                            <div class="shrink-0">
                                                <div class="inline-block rounded-md bg-sky-200 p-4 text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                        stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="ml-6 grow">
                                                <p class="mb-2 font-bold ">Mobile</p>
                                                <p class="text-neutral-500"> +91 123456789
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>

            <SocialMedia />
        </div>
    )
}

export default Contact