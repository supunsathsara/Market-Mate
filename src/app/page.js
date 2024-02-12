import Image from "next/image";
import Link from "next/link";
import Logout from "@/components/logout";
import { getServerSession } from "next-auth";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/product-grid-items";

export default async function Home() {
  // const session = await getServerSession();
  // console.log(session)
  const products = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log(products);
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
