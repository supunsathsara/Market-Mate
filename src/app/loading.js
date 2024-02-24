import Image from "next/image";
import Logo from "../../public/logo-no-background.png";


export default function Loading() {
    return (
        <div className="flex justify-center items-center h-full min-h-[60vh] max-h-fit">
            <Image
                src={Logo}
                alt="Market-Mate logo"
                height={50}
                className="animate-pulse bg-blend-overlay"
            />
        </div>
    )
}