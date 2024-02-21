'use client';

import { removeReview } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function DeleteReview(productId, reviewId) {
    return (
        <button onClick={
            async () => {
                await removeReview(productId, reviewId)
            }
        }>
            <TrashIcon className="w-6 h-6 text-red-400" />
        </button>

    )
}
