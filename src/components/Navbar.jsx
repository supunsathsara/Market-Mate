
import Link from 'next/link';
import Search from './search';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { getServerSession  } from 'next-auth';
import Logout from './logout';
import Logo from '../../public/logo-no-background.png'
import Image from 'next/image';


export default async function Navbar() {
  const menu = [
    // { title: 'Home', path: '/' },
  ];
  const session = await getServerSession();
  //console.log(session)
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 z-40 text-white">
      
      <div className="flex w-full items-center text-white">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex p-2 w-full items-center justify-center md:w-auto lg:mr-6">
            <Image 
            src={Logo}
            alt='logo'
            height={35}
            className='cursor-pointer'
            />
          </Link>
          {menu.length ? (
            <ul className="gap-6 text-sm flex items-center">
              {menu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3 gap-5 my-auto">
             {session ? (
              <>
              <div className='flex gap-1'>
                <UserCircleIcon className='h-5 my-auto' />
                <Link href='/account' className='hover:underline-offset-2 hover:underline my-auto'>
                <span className='text-md my-auto'>{session.user.name}</span>
                </Link>
              </div>
              <div className=' my-auto text-md hover:underline-offset-2 hover:underline'><Logout/></div>
              </>
            ) : (
              <Link href='/login' className='text-md hover:underline-offset-2 hover:underline'>Login</Link>
            )}
            <Link href='/cart'>
            <ShoppingCartIcon className='h-8' />
            </Link> 
        </div>
      </div>
    </nav>
  );
}