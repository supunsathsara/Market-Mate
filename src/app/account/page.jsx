import { query } from "@/lib/db";
import { DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AccountPage() {
    const session = await getServerSession();
    const userRec = await query({
        query: "SELECT id,name,address,email,mobile FROM user WHERE email = ?;",
        values: [session.user.email],
    });
    const user = userRec[0];

    const orders = await query({
        query: "Call getRecentOrdersByEmail(?);",
        values: [session.user.email],
    });


    return (
        <div className="flex flex-col w-full max-w-screen-lg h-full items-center justify-center ml-56">
            {/* <AccountNavBar /> */}
            <div className="w-full max-w-screen-md px-10 pb-10 border rounded-lg shadow bg-gray-800/50 border-gray-700">
                <div class="flex flex-col items-center pb-10">
                    <UserCircleIcon className="w-20 h-20 mt-6 text-gray-500" />
                    <h5 class="mb-1 text-2xl font-medium text-white">{user.name}</h5>
                    <div className="flex flex-col gap-3 w-full text-justify ml-20">
                        <div class="flex text-left space-x-2">
                            <EnvelopeIcon className="w-7 h-7 text-gray-400" />
                            <p class="text-lg text-gray-400">Email: </p>
                            <p class="text-lg text-gray-300">{user.email}</p>
                        </div>
                        <div class="flex text-left space-x-2">
                            <DevicePhoneMobileIcon className="w-7 h-7 text-gray-400" />
                            <p class="text-lg text-gray-400">Mobile: </p>
                            <p class="text-lg text-gray-300">{user.mobile || "-"}</p>
                        </div>
                        <div class="flex text-left space-x-2">
                            <MapPinIcon className="w-7 h-7 text-gray-400" />
                            <p class="text-lg text-gray-400">Address: </p>
                            <p class="text-lg text-gray-300">{user.address || "-"}</p>
                        </div>
                    </div>


                </div>
                <h2 className="text-2xl">Recent Orders</h2>
                <div className="flex flex-col w-full gap-2">
                    <div className="flex w-full justify-between">
                        <h5 className="text-md font-medium">Order ID</h5>
                        <h5 className="text-md font-medium">Order Date</h5>
                        <h5 className="text-md font-medium">Total</h5>
                    </div>
                    {orders[0].map((order) => (
                        <div key={order.id} className="flex flex-col w-full gap-2 border-b border-gray-600 p-2">
                            <Link href={`/account/orders/${order.id}`}>
                            <div className="flex w-full justify-between">
                                <h5 className="text-md font-medium">{order.id}</h5>
                                <h5 className="text-md font-medium">{new Date(order.orderDate).toLocaleString()}</h5>
                                <h5 className="text-md font-medium">Rs. {order.total}</h5>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}