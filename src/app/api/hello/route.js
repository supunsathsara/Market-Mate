import { query } from "@/lib/db";
import { dbConnect } from "@/lib/mongodb";
import ReviewModel from "@/models/ReviewModel";
import { NextResponse } from "next/server";

export const revalidate = 0

export async function GET(req, res) {
    const products = await query({
        query: "SELECT * FROM product;",
        values: [],
    });

    // query: "CALL getUserById(6);",
    const con = await dbConnect();
    const reviews = await ReviewModel.find({});
    return NextResponse.json({ message: "success", products, reviews });
    // return NextResponse.json({ message: "success"})

}