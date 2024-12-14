import { Link } from "react-router-dom"

function Error404() {
    return (

        <div className="flex min-h-[100dvh] flex-col items-center 
        justify-center bg-green-800 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="mx-auto h-12 w-12 text-green-300"
                >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                </svg>
                <h1 className="mt-4 text-6xl font-bold tracking-tight text-green-100">404</h1>
                <p className="mt-4 text-lg text-green-200">Oops, the page you're looking for doesn't exist.</p>
                <div className="mt-6">
                    <Link
                        className="inline-flex items-center rounded-md bg-blue-300 
                        px-4 py-2 text-sm font-medium text-black shadow-sm 
                        transition-colors hover:bg-blue-400 focus:outline-none"
                        to="/"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error404