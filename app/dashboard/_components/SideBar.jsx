"use client"
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HiHome, HiMiniSquare3Stack3D, HiMiniCheckBadge, HiMiniPower } from "react-icons/hi2";



function SideBar() {
  const Menu=[
    {
      id:1,
      name:'Home',
      icon:<HiHome />,
      path:'/dashboard'
    },
    {
      id:1,
      name:'Explore',
      icon:<HiMiniSquare3Stack3D />,
      path:'/dashboard/explore'
    },
    {
      id:1,
      name:'Upgrade',
      icon:<HiMiniCheckBadge />,
      path:'/dashboard/Upgrade'
    },
    {
      id:1,
      name:'Logout',
      icon:<HiMiniPower />,
      path:'/dashboard/Logout'
    }
  ]
  const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
      <Image src={'/logo.svg'} width={40} height={60} />
      <hr className='my-5'>
      </hr>

        <ul>
          {Menu.map((item,index)=>(
            <Link href={item.path}>
            <div className={`flex items-center gap-2 text-gray-600
            p-3 cursor-pointer hover:bg-gray-100
             hover:text-black rounded-lg mb-3
             ${item.path==path&&'bg-gray-100 text-black'}`}>
              <div className='text-3xl'>{item.icon}</div>
                <h2>{item.name}</h2>
            </div>
            </Link>
          ))}
        </ul>
        <div className='absolute bottom-10 w-[80%]'>
          
        <Progress value={33} />
        <h2 className='text-sm my-2'>3 Out of 5 Course Created</h2>
        <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimted course generate</h2>

        </div>

    </div>
  )
}

export default SideBar