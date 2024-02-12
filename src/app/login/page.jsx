'use client';

import Link from "next/link"
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            toast.dismiss();
            await toast.promise(
                new Promise(async (resolve, reject) => {
                    const response = await signIn('credentials', {
                        email: formData.get('email'),
                        password: formData.get('password'),
                        redirect: false,
                    });
        
                    console.log({ response });
        
                    if (!response?.error) {
                        // Redirect user to the home page if sign-in is successful
                        router.push('/');
                        router.refresh();
                        resolve(response); // Resolve the promise if sign-in is successful
                    } else {
                        // Reject the promise if there's an error during sign-in
                        if(response.status == 401){
                            reject(new Error("Incorrect username or password")); 
                        }
                        reject(new Error(response.error)); 
                        
                    }
                }),
                {
                    loading: 'Signing in...',
                    success: 'Signed in successfully!',
                    error: (err)=> `${err.message}`,
                },
                {
                    style: {
                        minWidth: '250px',
                    },
                }
            );

            
        } catch (error) {
            // Handle any errors that occur during sign-in or promise handling
            //toast.error(error.message, { duration: 5000 });
         
            console.error(error.message)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Quick Mart
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don&apos;t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}