import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Header() {
    return (
        <header className="bg-gray-100 text-primary-foreground py-4
        px-6 flex items-center justify-between">

            <div className='flex gap-2'>
                <Logo />
            </div>
            <nav className="hidden headerBreakPoint:flex items-center gap-6">
                <Link className="text-sm font-medium hover:underline" to="/products">
                    Products
                </Link>
                <Link className="text-sm font-medium hover:underline" to="/categories">
                    Categories
                </Link>
            </nav>
            <p></p>
        </header>
    )
}

export default Header