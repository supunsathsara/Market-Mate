import { query } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";


export default async function OrderDetailsPage({ params }) {

    const order = await query({
        query: "SELECT o.*, op.id AS payment_id, op.status AS payment_status FROM `order` o LEFT JOIN order_payment op ON o.id = op.order_id WHERE o.id = ?;",
        values: [params.orderid],
    });

    if (order.length === 0) {
        return notFound()
    }

    const orderItems = await query({
        query: "CALL getOrderProducts(?);",
        values: [params.orderid],
    });

    return (
        <div className="flex flex-col w-full h-full items-center justify-center mt-7">
            <div className="w-full max-w-screen-md px-10 pt-3 pb-10 border rounded-lg shadow bg-gray-800/50 border-gray-700">
                <div className="flex flex-col w-full gap-2 mb-4">
                    <div className="flex w-full justify-between">
                        <h5 className="text-md font-medium w-1/3">Order ID</h5>
                        <h5 className="text-md font-medium w-1/3 text-center">Order Date</h5>
                        <h5 className="text-md font-medium w-1/3 text-right">Total</h5>
                    </div>
                    <div key={order[0].id} className="flex flex-col w-full gap-2 p-2 pb-4">
                        <div className="flex w-full justify-between">
                            <h5 className="text-sm font-medium w-1/3">{order[0].id}</h5>
                            <h5 className="text-md font-medium w-1/3 text-center">{new Date(order[0].orderDate).toLocaleString()}</h5>
                            <h5 className="text-md font-medium w-1/3 text-right">Rs. {order[0].total}</h5>
                        </div>
                        <div className="flex flex-col w-full justify-between gap-2">
                            <h5 className="text-md font-medium mr-2">Payment ID: <span className="font-light font-mono ml-2">{order[0].payment_id}</span></h5>
                            <h5 className="text-md font-medium mr-2">Payment Status:
                                <span className={`ml-2 px-2 py-1 rounded-2xl text-[15px] font-light border ${order[0].payment_status === 2 ? 'border-green-500 text-green-700' : order[0].payment_status === 0 ? 'border-yellow-500 text-yellow-700' : 'border-red-500 text-red-700'}`}>
                                    {order[0].payment_status === 2 ? "Paid" : order[0].payment_status === 0 ? "Pending" : "Failed"}
                                </span>
                            </h5>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl mt-5 pb-5">Order Items</h2>
                <div className="flex flex-col gap-4">
                    {orderItems[0].map((product) => (
                        <div
                            key={product.product_id}
                            className="flex items-center justify-between border-b border-gray-800 pb-4"
                        >
                            <div className="flex gap-4">
                                <Image
                                    src={product.product_image}
                                    alt={product.product_title}
                                    width={64}
                                    height={64}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{product.product_title}</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        {product.quantity} x Rs.{product.unit_price}
                                    </p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                        Rs. {product.total_price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}