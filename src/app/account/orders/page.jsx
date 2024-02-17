import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";


export default async function OrdersPage() {
    const session = await getServerSession();
    const orders = await query({
        query: "Call getAllOrdersByEmail(?);",
        values: [session.user.email],
    });

    if(orders[0].length === 0){
        return (
            <div className="flex w-full h-full items-center justify-center max-w-screen-lg ml-56 mt-10">
                <h1 className="text-3xl mt-28">No Orders Found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-screen-lg h-full items-center justify-center ml-56 mt-10">

            <div className="w-full max-w-screen-md px-10 pb-10 border rounded-lg shadow bg-gray-800/50 border-gray-700">
                <div className="flex flex-col w-full gap-4 pt-4">
                    <div className="flex w-full justify-between">
                        <h5 className="text-md font-medium">Order ID</h5>
                        <h5 className="text-md font-medium">Order Date</h5>
                        <h5 className="text-md font-medium">Total</h5>
                    </div>
                    {orders[0].map((order) => (
                        <div key={order.id} className="flex flex-col w-full gap-6 border-b border-gray-600 p-2">
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