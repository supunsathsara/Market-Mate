import { getServerSession } from 'next-auth';
import { query } from '@/lib/db';
import Image from 'next/image';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import RemoveFromCart from '@/components/RemoveFromCart';
import { revalidatePath } from 'next/cache';

export default async function CartPage() {
    const session = await getServerSession();
    let netTotal = 0;

    async function removeFromCart(cart_id) {
        "use server"
        const res = await query({
            query: "DELETE FROM cart WHERE id = ?;",
            values: [cart_id],
        });
        revalidatePath('/cart');
    }

    if (!session) {
        return (
            <div className="flex flex-col w-full h-full items-center justify-center text-slate-200">
                <h1 className="text-3xl mt-28">Please Login to view your cart</h1>
                <Link href="/login" className="text-xl underline-offset-2 underline">Login</Link>
            </div>
        );
    }


    const products = await query({
        query: "CALL getCartItemsByEmail(?);",
        values: [session.user.email],
    });

    if (products[0].length === 0) {
        return (
            <div className="flex w-full h-full items-center justify-center text-slate-200">
                <h1 className="text-3xl mt-28">Cart is Empty</h1>
            </div>
        );
    }

    return (
        <div className="mx-auto h-full max-w-screen-lg px-4 text-slate-200">
            <h1 className="text-3xl font-medium mb-4">Cart</h1>
            <div className="flex flex-col gap-4">
                {products[0].map((product) => (
                    //convert to two decimal and add to netTotal
                    netTotal = netTotal + parseFloat(product.total_price),
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
                                className="w-16 h-16 object-contain"
                            />
                            <div>
                                <h2 className="text-lg font-medium">{product.product_title}</h2>
                                <p className="text-sm text-neutral-200">
                                    {product.quantity} x {product.unit_price}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-5 mr-5'>
                            <p className="text-lg font-medium">
                                Rs. {product.total_price}
                            </p>
                            <div>
                                <RemoveFromCart cart_id={product.cart_id} removeFromCart={removeFromCart} />
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="flex flex-col text-right justify-end mt-6 mb-4">
                <h2 className="text-xl font-medium">Net Total: {netTotal.toFixed(2)} LKR</h2>
                <div className='flex justify-end mt-3'>
                <Link href="/cart/checkout" className=" flex text-xl w-fit text-right">
                    <button className='relative flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 p-2 px-4 tracking-wide text-white text-xl my-5'>
                        Checkout
                        <BanknotesIcon className="h-6 w-6 ml-2" />
                        </button>
                </Link>
                </div>
            </div>
        </div>
    );
}