"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { setActiveRoom } from "@/states/features/chatSlice";
import { socket } from "@/utils/instances";

export default function TopNav() {

    const userProfileUrl = useAppSelector((state) => state.user.user!.profileUrl);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const logout = async () => {

        try {
            socket.disconnect();
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };
    const handleRouterPush = async (path: string) => {

        try {
            router.push(path);
            dispatch(setActiveRoom(null))
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
                                src={(userProfileUrl === "") ? "/avatar.png" : userProfileUrl} />
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
    );
}
