import AccountNavBar from "@/components/AccountNavBar";


export default function AccountLayout({ children }) {
    return (

                <>
                    <AccountNavBar />
                    {children}
                </>
    );
}
