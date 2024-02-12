import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const products = await query({
        query: "SELECT * FROM user",
        values: [],
    });

    return NextResponse.json({ message: "success", products })
   // return NextResponse.json({ message: "success"})

}