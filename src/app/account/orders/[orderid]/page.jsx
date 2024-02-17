import { query } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";


export default async function OrderDetailsPage({ params }) {

    const order = await query({
        query: "select * from `order` where id = ?;",
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
                        <h5 className="text-md font-medium">Order ID</h5>
                        <h5 className="text-md font-medium">Order Date</h5>
                        <h5 className="text-md font-medium">Total</h5>
                    </div>
                    <div key={order[0].id} className="flex flex-col w-full gap-2 p-2 pb-4">
                        <div className="flex w-full justify-between">
                            <h5 className="text-md font-medium">{order[0].id}</h5>
                            <h5 className="text-md font-medium">{new Date(order[0].orderDate).toLocaleString()}</h5>
                            <h5 className="text-md font-medium">Rs. {order[0].total}</h5>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl mt-5">Order Items</h2>
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