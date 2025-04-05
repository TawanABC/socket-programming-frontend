"use client";

import { LogOutIcon } from "lucide-react";
// import { UserAccountIcon } from "hugeicons-react";
// import { useAppSelector } from "@/states/hook";
import { useRouter } from "next/navigation";
import NavLinks from "./nav-links";
import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";
import Image from "next/image";

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
    const handleRouterPush = async (path: string) => {

        try {
            router.push(path);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="navbar bg-slate-200 border-b border-slate-50">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" onClick={() => handleRouterPush("/home")}>ChatRoom</a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                width={20}
                                height={20}
                                alt="Tailwind CSS Navbar component"
                                src="/avatar.png" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-slate-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between"
                                onClick={() => handleRouterPush("/home/profile")}>
                                Profile
                                {/* <span className="badge">New</span> */}
                            </a>
                        </li>
                        {/* <li><a>Settings</a></li> */}
                        <li ><a onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        // <div className="mx-auto shadow-md border-b border-gray-400">
        //     {/* <div className="grid h-16 grid-cols-2 items-end"> */}
        //     <div className="grid h-16 grid-cols-2 items-center">


        //         {/* Navigation Links Column */}
        //         {/* <div className="flex justify-center">
        //             <NavLinks />
        //         </div> */}
        //           <Link
        // 				// href={`/profile/${userId}`}
        //                 href = "/home"
        // 				className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-gray-300 hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
        // 			>
        // 				<p className="block">Account</p>
        // 			</Link>

        //            {/* Profile */}
        //             {/* <Link
        // 				href={`/profile/${userId}`}
        // 				className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
        // 			>
        // 				<UserAccountIcon className="w-6" />
        // 				<p className="block">Account</p>
        // 			</Link> */}
        //         {/* User Account Icon Column */}
        //         <div className="flex justify-end pr-4">
        //             {/* Profile */}
        //             {/* <Link
        // 				href={`/profile/${userId}`}
        // 				className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
        // 			>
        // 				<UserAccountIcon className="w-6" />
        // 				<p className="block">Account</p>
        // 			</Link> */}

        //             {/* Logout */}
        //             <button
        //                 className="flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-gray-300 hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2"
        //                 onClick={logout}
        //             >
        //                 <LogOutIcon className="w-6" />
        //                 <p className="block">Logout</p>
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
}
