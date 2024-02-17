import { PencilSquareIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AccountNavBar() {
    return (
        <div className="">
            <div id="default-sidebar" className="fixed mt-10 z-10 left-8 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/account" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <UserCircleIcon className="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"/>
                                <span className="ms-3">Account</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/edit" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <PencilSquareIcon className="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"/>
                                <span className="ms-3">Edit</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/orders" className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <ShoppingBagIcon className="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"/>
                                <span className="ms-3">Orders</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}