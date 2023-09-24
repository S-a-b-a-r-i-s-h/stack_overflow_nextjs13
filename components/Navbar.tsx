import Link from "next/link";
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul>
           <Link href='/'>
            <li>Home</li>
           </Link>
           <Link href='/about'>
            <li>About</li>
           </Link>
           <Link href='/contact'>
            <li>Contact</li>
           </Link>
        </ul>
    </nav>
  )
}

export default Navbar