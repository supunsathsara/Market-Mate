import Image from 'next/image'
import supunsathsaraLogo from '../../public/supunsathsara-logo.png'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="rounded-lg m-4 sticky mt-3 top-[100vh] w-auto">
            <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
            <div className="flex flex-col md:flex-row justify-between mx-8 pb-5">
                <span className="block text-sm sm:text-base sm:tracking-wider mb-1 text-gray-400 items-center justify-center gap-1 text-center">© 2024 <Link href="/" className="hover:underline">Market Mate™</Link>. All Rights Reserved.</span>
                <p className="text-gray-400 text-sm sm:text-base sm:tracking-wider flex items-center justify-center gap-1 text-center">
                    {/* Made with ❤️ 
                    <a href="https://supunsathsara.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">
                        <Image
                            src={supunsathsaraLogo}
                            alt="Supun Sathsara"
                            width={220}
                            height={40} // Adjust height as needed
                        />
                    </a> */}
                    Elevating your shopping experience, one click at a time.
                </p>
            </div>
        </footer>
    )
}
