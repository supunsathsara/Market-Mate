
import { dbConnect } from "@/lib/mongodb";
import ReviewModel from "@/models/ReviewModel";
import { NextResponse } from "next/server";

export async function GET() {
  const con = await dbConnect();
  const reviews = await ReviewModel.find({});

    return NextResponse.json({reviews});
  
 

  //   return NextResponse.json({ messsage: "Hello World" });
}