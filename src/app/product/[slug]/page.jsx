import AddToCart from "@/components/AddToCart";
import Price from "@/components/price";
import { query } from "@/lib/db";
import Image from "next/image";
import { getServerSession } from 'next-auth';
import Reviews from "@/components/Reviews";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {

    const products = await query({
        query: "SELECT * FROM product WHERE id = ?;",
        values: [params.slug],
    });

    const product = products[0];

    if (!product) return notFound();

    const session = await getServerSession();

    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4">
                <div className="flex flex-col rounded-lg border p-8 border-neutral-800 bg-black md:p-12 lg:flex-row lg:gap-8">
                    <div className="h-full w-full basis-full lg:basis-4/6">
                        <div className="relative aspect-square h-full max-h-[500px] w-full overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                layout="fill"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="basis-full lg:basis-2/6">
                        <div className="mb-6 flex flex-col gap-3 border-b pb-6">
                            <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
                            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-lg px-3 text-white">
                                <Price
                                    amount={product.price}
                                    currencyCode="LKR"
                                    currencyCodeClassName="hidden @[275px]/label:inline"
                                />
                            </div>
                        </div>
                        <p className="mb-6 text-lg leading-tight text-white/[60%]">{product.description}</p>
                            <AddToCart productId={params.slug} session={session} AoQ={parseInt(product.qty)}/>
 
                    </div>
                </div>
                    <div className="mt-8">
                    <Reviews productId={params.slug} />
                    </div>
            </div>

        </>
    );
}