import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Search({ setSearchQuery }) {

    const [inputValue, setInputValue] = useState("");

    let handleSearch = () => {
        setSearchQuery(inputValue);
    }
    return (<></>)
    return (

        <form className='max-w-full'
            onSubmit={(e) => handleSearch(e)}
        >
            <div className="flex">

                <div className="relative w-full">
                    <input
                        onChange={e => setInputValue(e.target.value.trim())}

                        type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50
             rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none min-w-[300px]  max-w-[100%]
              dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search Mockups, Logos, Design Templates..." required />


                    <Link
                        to={ inputValue.length >0 ? "?q=" + inputValue : ""}
                        onClick={handleSearch}
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 
                                   rounded-e-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </Link>
                </div>
            </div>
        </form>

    )
}

export default Search