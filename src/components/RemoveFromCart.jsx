"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";

export default function RemoveFromCart({ cart_id, removeFromCart}) {
    console.log(cart_id)
    return(
    <button
    onClick={async () => {
        await removeFromCart(cart_id);
    }}
    className="text-slate-200 hover:text-slate-300 transition-colors ease-in-out duration-200"
    >
    <XCircleIcon className="h-7" />
    </button>
    )
}