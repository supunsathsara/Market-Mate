'use client';

import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    async function createAccount(formData) {
        try {
            toast.dismiss();
            await toast.promise(
                new Promise(async (resolve, reject) => {

                    const response = await fetch(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/auth/register`, {
                        method: 'POST',
                        body: JSON.stringify({
                            name: formData.get('name'),
                            email: formData.get('email'),
                            password: formData.get('password'),
                        }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to create account');
                    }

                    const responseData = await response.json();
                    console.log(responseData)
                    if (responseData.message == "success") {
                        router.push('/login');
                        router.refresh();
                        resolve(response); // Resolve the promise if sign-in is successful
                    } else {
                        reject(new Error(response.error));

                    }
                }),
                {
                    loading: 'Signing up...',
                    success: 'Signed up successfully!',
                    error: (err) => `${err.message}`,
                },
                {
                    style: {
                        minWidth: '250px',
                    },
                }
            );
        } catch (error) {
            console.error("Error occurred:", error);

        }
    }

    return (
        <section className="bg-[#030014]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white/5 shadow-lg bg-opacity-50 backdrop-blur-2xl border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action={createAccount}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
                                <input type="text" name="name" id="name" placeholder="" className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input type="email" name="email" id="email" className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border  rounded  focus:ring-3  bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light  text-gray-300">I accept the <a className="font-medium  hover:underline text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:bg-primary-700 focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light  text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium  hover:underline text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}