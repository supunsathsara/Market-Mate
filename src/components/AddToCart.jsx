'use client';

import { SubmitToCart } from "@/lib/actions";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {useFormState, useFormStatus } from 'react-dom'

export default function AddToCart({ productId,session , AoQ}) {
    const [qty, setQty] = useState(1);
    const { pending } = useFormStatus()
    
    const [state,updateCart] = useFormState(SubmitToCart.bind(null, qty, productId,session?.user?.email),
        {
            message:'',
            error:''
        })
        
    return (
        <div className="max-w-lg text-white">
            <div className=" w-fit justify-between flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                <button
                    onClick={
                        // min value is 1
                        () => setQty(qty - 1 < 1 ? 1 : qty - 1)
                    }
                    disabled={qty === 1}
                    aria-disabled={qty === 1 || pending}
                    className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                >
                    <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
                </button>
                <p className="w-6 text-center">
                    <span className="w-full text-sm">
                        {qty}
                    </span>
                </p>
                <button
                    disabled={qty === AoQ}
                    aria-disabled={qty === 1 || pending}
                    onClick={() => setQty(qty + 1 > AoQ ? AoQ : qty + 1)}
                    className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                >
                    <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
                </button>

            </div>
            
            <form action={updateCart} >
           
                <button type="submit"
                aria-disabled={qty === 1 || pending}
                 className="relative flex w-1/2 items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 p-2 px-4 tracking-wide text-white text-xl my-5">
                    {pending ? "Adding to cart..." : "Add to cart"}
                </button>
            </form>
            {state.message && <p className="text-emerald-600 -mt-2 font-semibold">{state.message}</p>}
            {state.error && <p className="text-red-600 -mt-2 font-semibold">{state.error}</p>}
        </div>
    );
}