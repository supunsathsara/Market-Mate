
import Link from 'next/link';
import Search from './search';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import Logout from './logout';


export default async function Navbar() {
  const menu = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'About', path: '/about' },
  ];
  const session = await getServerSession();
  //console.log(session)
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            🔥
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
            Market Mate  
            </div>
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
                <UserIcon className='h-5 my-auto' />
                <span className='text-md my-auto'>{session.user.name}</span>
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