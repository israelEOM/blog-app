"use client"
import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import Search from './Search'

type Props = {}

const Navbar = (props: Props) => {
	return (
		<header className='mb-5'>
			<nav className='flex justify-between items-centers w-full bg-wh-300 text-wh-10 px-10 py-4'>
				{/* <div className='hidden sm:block'>BLOGPesadao</div> */}
				<div className='flex gap-24'>
					<Logo />
					<div className='flex justify-between items-center gap-10 text-lg'>
						<Link href='/'>Home</Link>
						<Link href='/'>About</Link>
						<Link href='/list'>Blog</Link>
						<Link href='/'>Contact</Link>
					</div>
				</div>
				<div>
					<Search />
				</div>
			</nav>
		</header>
	)
}

export default Navbar