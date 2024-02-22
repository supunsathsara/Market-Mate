import CustomerDetails from "@/components/CustomerDetails";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";


export default async function CheckoutPage() {
    const session = await getServerSession();
    let netTotal = 0;
    

    const products = await query({
        query: "CALL getCartItemsByEmail(?);",
        values: [session.user.email],
    });

    if (products.length === 0) {
        return (
            <div className="flex w-full h-full items-center justify-center text-slate-200">
                <h1 className="text-3xl mt-28">Cart is Empty</h1>
            </div>
        );
    }

    const user = await query({
        query: "SELECT id,name,address,email,mobile FROM user WHERE email = ?;",
        values: [session.user.email],
    });

    async function handleCheckout(orderUid,currentState,formData) {
        "use server"

        try {
            //console.log(orderUid)
        const name = formData.get("name");
        const email = formData.get("email");
        const mobile = formData.get("mobile");
        const address = formData.get("address");
       
        console.log("CHECKOUT ",name, mobile, address, netTotal)
        const order = await query({
            query: "CALL checkout(?, ?, ?, ?, ?);",
            values: [session.user.email,orderUid, netTotal ,address, mobile]
        });

       
         //check payment status
         const payment = await query({
            query: "select status from order_payment WHERE order_id = ?;",
            values: [orderUid]
        });
        

        revalidatePath('/cart');

        if (payment[0].status == 2 || payment[0].status == 0) {
            return {
                status: 200,
                message: "Order placed successfully!",
                error: null
            }
        }

        return {
            status: 400,
            message: "Payment failed!",
            error: null
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: null,
            error: "Internal server error"
        }
           
    }

    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-center text-slate-200">
            <h1 className="text-3xl mt-2">Checkout</h1>
            <div className="flex w-[90%] gap-5">
                <div className="w-72 max-w-xl">
                    <h2 className="text-2xl font-semibold">Your Cart</h2>
                    <div className="flex flex-col gap-4">
                        {products[0].map((product) => (
                            //convert to decimal and add to netTotal
                            netTotal += parseFloat(product.total_price),
                            <div
                                key={product.cart_id}
                                className="flex items-center justify-between border-b pb-4"
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
                    <div className="flex justify-between mt-4">
                        <h3 className="text-lg font-semibold">Total</h3>
                        <p className="text-lg font-semibold">Rs.{netTotal.toFixed(2)}</p>
                    </div>
                </div>
                <span className="border-l-2 min-h-full my-2 mx-2"></span>
                <div className="w-full ">
                    <h2 className="text-2xl font-semibold text-center">Order Details</h2>
                    <CustomerDetails user={user[0]} netTotal={netTotal.toFixed(2)} merchantSecret={process.env.PAYHERE_MERCH_SECRET} handleCheckout={handleCheckout} />
                </div>

            </div>
        </div>
    );
}