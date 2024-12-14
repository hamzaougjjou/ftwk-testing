import React from 'react'

function Loading({ width=5, height=5, text = "Loading...", display = "flex" }) {
    return (
        <div className={`${display} 
        
        items-center justify-center`}>
            <div className="flex items-center space-x-2">
                <div className={`h-${height} w-${width}
                animate-spin rounded-full border-4 
                border-green-700 border-t-transparent`} />
                <span className="text-muted-foreground"> {text} </span>
            </div>
        </div>
    )
}

export default Loading