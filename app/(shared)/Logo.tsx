import Image from 'next/image'
import React from 'react'
import LogoIcon from "/public/assets/logo.svg";
import Link from 'next/link';

const Logo = () => {
  return (
    <div className='flex cursor-pointer items-center space-x-3'>
      <Link href='/'>
        <Image src={LogoIcon} width={64} height={64} alt='Logo' />
      </Link>
    </div>
  )
}

export default Logo