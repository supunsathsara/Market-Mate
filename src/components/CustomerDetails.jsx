'use client';

import Script from "next/script";
import crypto from "crypto";
import { useFormState } from 'react-dom';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';


export default function CustomerDetails({ user, netTotal, merchantSecret,  handleCheckout }) {

    const router = useRouter()
    const [orderUid, setOrderUid] = useState(uuidv4());

    const [state, submitOrder] = useFormState(handleCheckout.bind(null, orderUid),
        {
            message: '',
            error: ''
        })
        
    const hashedMerchantSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const hash = crypto.createHash('md5').update("1225510" + orderUid + netTotal + "LKR" + hashedMerchantSecret).digest('hex').toUpperCase();

    function startPayment() {
        payhere.onCompleted = function onCompleted(orderId) {
            console.log("Payment completed. OrderID:" + orderId);
            //submit the form
            document.getElementById("customer-details").requestSubmit();
        };

        payhere.onDismissed = function onDismissed() {
            console.log("Payment dismissed");
        };

        payhere.onError = function onError(error) {
            console.log("Error:" + error);
        };

        // payment variables
        const payment = {
            "sandbox": true,
            "merchant_id": "1225510",
            "return_url": 'https://supunsathsara.com/',
            "cancel_url": 'https://supunsathsara.com/',
            "notify_url": process.env.NEXT_PUBLIC_PAYHERE_NOTIFY_URL, 
            "order_id": orderUid,
            "items": "Quick Mart",
            "amount": netTotal,
            "currency": "LKR",
            "first_name": user.name,
            "last_name": "XXX",
            "email": user.email,
            "phone": user.mobile || "0790000000",
            "address": "No.1, Galle Road",
            "city": "Colombo",
            "country": "Sri Lanka",
            "hash": hash
        }

        //validate form
        if (document.getElementById("customer-details").reportValidity()) {
            //open payhere's payment selection
            payhere.startPayment(payment);


        }
    }

    useEffect(() => {
        if (state.message) {
            if (state.status === 200) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
            router.push(`/account/orders/${orderUid}`);
            router.refresh();
        }
    }, [state.message, router, state.status]);

    useEffect(() => {
        if (state.error) {
            console.log(state.error);
            toast.error(state.error);
        }
    }, [state.error]);

    return (
        <>
            <div>
                <form action={submitOrder} id="customer-details">
                    <div className="flex flex-col gap-5 max-w-lg mx-auto text-md">
                        {state.message && <p className="text-emerald-600 text-lg text-center font-bold mt-2">{state.message}</p>}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input className="text-black font-medium rounded-md px-1 py-2" type="text" name="name" id="name" defaultValue={user.name || ""} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input className="text-black font-medium rounded-md px-1 py-2" disabled type="email" name="email" id="email" defaultValue={user.email || ""} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="mobile">Mobile</label>
                            <input className="text-black font-medium rounded-md px-1 py-2" type="text" name="mobile" id="mobile" defaultValue={user.mobile || ""} required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address">Address</label>
                            <textarea className="text-black font-medium rounded-md px-1 py-2" id="address" name="address" defaultValue={user.address || ""} required />
                        </div>
                        <div className="flex justify-end">
                            <button type="button"
                                onClick={startPayment}
                                className="relative flex w-1/4 float-right items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 p-2 px-4 tracking-wide text-white text-lg mb-5">
                                Pay
                                <CurrencyDollarIcon className="h-6 w-6 ml-2" />
                            </button>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* <Script src='/payhere.dev.js'></Script> */}
            <Script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></Script>
        </>
    )
}