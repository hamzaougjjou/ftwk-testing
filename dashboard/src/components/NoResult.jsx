

function NoResult() {
    return (
        <div className="flex flex-col items-center justify-center 
        h-[60vh] bg-l-500 ">
            <div className="flex flex-col items-center gap-4">
                <SearchIcon className="w-12 h-12 text-green-600" />
                <h3 className="text-2xl font-bold text-black">No results found</h3>
                <p className="text-black/80">Sorry, we couldn't find any matching results. Please try a different search.</p>
            </div>
        </div>
    )
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

export default NoResult