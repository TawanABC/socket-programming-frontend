"use client";

import { LogOutIcon } from "lucide-react";
// import { UserAccountIcon } from "hugeicons-react";
// import { useAppSelector } from "@/states/hook";
import { useRouter } from "next/navigation";
import NavLinks from "./nav-links";
import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";

export default function TopNav() {

    // const userId = useAppSelector((state) => state.user.user!.userId);
    const router = useRouter();

    const logout = async () => {

        try {
            router.push("/");
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div className="mx-auto shadow-md border-b border-gray-400">
            {/* <div className="grid h-16 grid-cols-2 items-end"> */}
            <div className="grid h-16 grid-cols-2 items-center">


                {/* Navigation Links Column */}
                {/* <div className="flex justify-center">
                    <NavLinks />
                </div> */}
                  <Link
						// href={`/profile/${userId}`}
                        href = "/home"
						className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-gray-300 hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
					>
						<p className="block">Account</p>
					</Link>

                   {/* Profile */}
                    {/* <Link
						href={`/profile/${userId}`}
						className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
					>
						<UserAccountIcon className="w-6" />
						<p className="block">Account</p>
					</Link> */}
                {/* User Account Icon Column */}
                <div className="flex justify-end pr-4">
                    {/* Profile */}
                    {/* <Link
						href={`/profile/${userId}`}
						className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
					>
						<UserAccountIcon className="w-6" />
						<p className="block">Account</p>
					</Link> */}

                    {/* Logout */}
                    <button
                        className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-gray-300 hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
                        onClick={logout}
                    >
                        <LogOutIcon className="w-6" />
                        <p className="block">Logout</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
