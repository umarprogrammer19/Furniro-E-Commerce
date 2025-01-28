import React from 'react'

function Loading() {
    return (
        <div className="flex items-center justify-center w-full min-h-[60vh]">
            <div className="w-20 h-20 border-8 border-myOrange border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading