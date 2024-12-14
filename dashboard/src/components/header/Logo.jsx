import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <Link className="flex items-center gap-2" to="/">

            <img
                src='https://perfumy.ougjjou.com/static/media/logo.f016608e6a1ec726c7b3.png'
                alt='logo'
                className='w-[30px] h-[30px]'
            />
            <span className="text-xl font-bold">PARFUMY</span>
        </Link>
    )
}

export default Logo