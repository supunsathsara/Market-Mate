import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";

export async function GET(req, res) {

    // Generate a UUID
    const uuid = uuidv4();
    const options = { timeZone: 'Asia/Colombo' };
        const dateRaw = new Date().toLocaleString('en-US', options);
        // Format the date string in the required format ('YYYY-MM-DD HH:MM:SS')
const date = new Date(dateRaw).toISOString().slice(0, 19).replace('T', ' ');
    return NextResponse.json({ message: "success", uuid: uuid, date: date})
    // return NextResponse.json({ message: "success"})

}


export async function POST(req, res) {
    const body = await req.text();
    const formData = new URLSearchParams(body);

    // Extract specific fields
    const order_id = formData.get('order_id');
    const payment_id = formData.get('payment_id');
    const amount = formData.get('payhere_amount');
    const md5sig = formData.get('md5sig');
    const method = formData.get('method');
    const status_code = formData.get('status_code');


    //validate payment
    const hashedMerchantSecret = crypto.createHash('md5').update(process.env.PAYHERE_MERCH_SECRET).digest('hex').toUpperCase();
    const hashOnSever = crypto.createHash('md5').update("1225510" + order_id + amount + "LKR" + status_code + hashedMerchantSecret).digest('hex').toUpperCase();

    if (md5sig !== hashOnSever) {
        return NextResponse.json({ message: "Invalid payment" });
    }

    // Log the extracted fields
    console.log("order_id:", order_id);
    console.log("payment_id:", payment_id);
    console.log("md5sig:", md5sig);
    console.log("server_hash:", hashOnSever);
    console.log("method:", method);
    console.log("status_code:", status_code);

    // Update the order status
    try {
        const options = { timeZone: 'Asia/Colombo' };
        const dateRaw = new Date().toLocaleString('en-US', options);
        // Format the date string in the required format ('YYYY-MM-DD HH:MM:SS')
const date = new Date(dateRaw).toISOString().slice(0, 19).replace('T', ' ');
        const result = await query({
            query: "CALL updatePayment(?, ?, ?, ?, ?);",
            values: [payment_id, order_id, date, method, status_code]
        });
        console.log(result[0])
        // Respond as needed
        return NextResponse.json({ message: "success" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" });
    }
}
