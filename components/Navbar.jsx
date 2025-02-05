import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex gap-2'>
      <Link href='/'>Home</Link>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/inventory'>Inventory</Link>
        <Link href='/ai'>AI</Link>

    </nav>
  )
}
