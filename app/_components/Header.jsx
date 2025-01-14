import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-md'>
      <Image src={'/logo.svg'} width={60} height={60} />
      <Button className="bg-blue-500 text-white px-4 py-2">Get Started</Button>
    </div>
  )
}

export default Header