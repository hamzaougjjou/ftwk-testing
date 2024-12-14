import React from 'react'

function Pagination(
    {
        page ,
        setPage ,
        next_page_url ,
        current_page
    }
) {

    // console.log(
    //     page ,
    //     next_page_url ,
    //     current_page
    // );

    const goNext = ()=>{
        setPage( prev => prev+1 );
    }

    return (
        <nav aria-label="pagination" className="mx-auto flex w-full justify-center
        my-4 
        " role="navigation">
            <ul className="flex flex-row items-center gap-1">

                <li>
                    <button
                    onClick={ ()=>goNext() }
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5 bg-green-500 text-white hover:bg-green-600"
                        aria-label="Go to next page"
                    >
                        <span>Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination