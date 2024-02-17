import UpdateAccount from "@/components/UpdateAccount";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function AccountEditPage() {
    const session = await getServerSession();
    const user = await query({
        query: "SELECT id,name,address,email,mobile FROM user WHERE email = ?;",
        values: [session.user.email],
    });

    async function updateAccount(currentState, formData) {
        "use server"

        try {
            const name = formData.get("name");
            const email = formData.get("email");
            const mobile = formData.get("mobile");
            const address = formData.get("address");

            console.log(name, email, mobile, address)

            const update = await query({
                query: "UPDATE user SET name = ?, mobile = ?, address = ? WHERE email = ?;",
                values: [name, mobile, address,session.user.email]
            });

            console.log(update.affectedRows)
            revalidatePath('/account');

            if (update.affectedRows === 0) {
                return {
                    status: 400,
                    message: null,
                    error: "Account update failed"
                }
            }
            return {
                status: 200,
                message: "Account updated successfully!",
                error: null
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: null,
                error: "Internal server error"
            }
        }

    }
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            {/* <AccountNavBar /> */}
            <h1 className="text-3xl mt-5 mb-3">Account</h1>
            <UpdateAccount user={user[0]} updateAction={updateAccount} />
        </div>
    )
}