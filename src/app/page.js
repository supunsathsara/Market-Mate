import Image from "next/image";
import Link from "next/link";
import Logout from "@/components/logout";
import { getServerSession } from "next-auth";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/product-grid-items";
import { query } from "@/lib/db";

export default async function Home({
  searchParams
}) {

  const { q: searchValue } = searchParams;
  let products = [];
  if (searchValue) {
    products = await query({
      query: "SELECT * FROM product WHERE title LIKE ?;",
      values: [`%${searchValue}%`],
    });
  } else {
    products = await query({
      query: "SELECT * FROM product;",
      values: [],
    });
  }

  if(products.length === 0){
    return (
      <div className="flex w-full h-full items-center justify-center">
        <h1 className="text-3xl mt-28">No products found</h1>
      </div>
    )
  }

  return (
    <main>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className="order-last min-h-screen w-full max-w-screen-lg mx-auto md:order-none">
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
        </div>
      </div>
    </main>
  );
}
