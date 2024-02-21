import { StarIcon as OutlineStar, TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from '@heroicons/react/24/solid'
import AddReview from "./AddReview";
import { revalidatePath } from "next/cache";
import { getServerSession } from 'next-auth';
import Review from "@/models/ReviewModel";
import { dbConnect } from "@/lib/mongodb";
import DeleteReview from "./DeleteReview";

export default async function Reviews({ productId }) {
    await dbConnect();
    const reviews = await Review.find({ productId });
    // const reviews = [
    //     {
    //         _id: '65d5deaac16bfeade697a456',
    //         name: 'supun',
    //         email: 'bb@bb.bb',
    //         rating: 4,
    //         review: 'This is a great product. I love it!',
    //         productId: 1,
    //         __v: 0
    //     },
    //     {
    //         _id: '65d5dff0c16bfeade697a458',
    //         name: 'supun',
    //         email: 'bb@bb.com',
    //         rating: 5,
    //         review: 'The best one',
    //         productId: 1,
    //         __v: 0
    //     }

    // ]
    // console.log(reviews)

    const session = await getServerSession();
    let user = null;
    if (session) {
        user = session.user;
    }

    async function submitReview(rating, review, currentState, formData) {
        "use server"

        try {
            console.log({ rating, review, name: user?.name || "Anonymous", email: user?.email });

            if (!user) {
                return {
                    status: 400,
                    message: null,
                    error: "Auth Error"
                }
            }
            await dbConnect();
            const res = await Review.create({
                rating,
                review,
                name: user?.name,
                email: user?.email,
                productId
            });

            console.log(res)

            revalidatePath(`/product/${productId}`);
            return {
                status: 200,
                message: "Review submitted successfully!",
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

    //if not reviews
    if(reviews.length == 0){
        return(
        <div className="text-white mb-3 pb-4">
             <h1 className="text-4xl">Reviews</h1>
             {
                user?.email && (
                    <AddReview submitAction={submitReview} />
                )
            }
             <div className="flex items-center justify-center mt-8">
                <p className="text-lg text-gray-400">There are no reviews yet.</p>
            </div>
        </div>
        )
    }


    return (
        <div className="text-white mb-3 pb-4">
            <h1 className="text-4xl">Reviews</h1>
            {
                user?.email && (
                    <AddReview submitAction={submitReview} />
                )
            }

            <p className="text-gray-400">Read what our customers have to say about our products.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {reviews.map((review) => (
                    <div key={review._id.toHexString()} className="relative bg-opacity-30 backdrop-blur-2xl  bg-gray-800 p-6 pb-8 rounded-lg">
                        <div className="flex items-center mb-4">
                            {/* Rating stars */}
                            {Array.from({ length: 5 }).map((_, i) => (
                                i < review.rating ? (
                                    <SolidStar key={i} className="w-6 h-6 text-yellow-400" />
                                ) : (
                                    <OutlineStar key={i} className="w-6 h-6 text-yellow-400" />
                                )
                            ))}
                        </div>
                        <p className="text-lg mb-4">{review.review}</p>
                        {/* Name and Trash icon */}
                        <div className="absolute bottom-4 left-6 right-6 flex justify-between">
                            <p className="text-sm text-gray-400">{review.name}</p>
                            {
                                user && review.email === user?.email && (
                                    // <TrashIcon className="w-6 h-6 text-red-400" />
                                    <DeleteReview productId={productId} reviewId={review._id.toHexString()} />
                                )

                            }
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}