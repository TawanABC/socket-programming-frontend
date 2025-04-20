import { User } from '@/common/model';
import { getUserById } from '@/services/userService';
import { useAppSelector } from '@/states/hook';
import { socket } from '@/utils/instances';
import React, { useEffect, useState } from 'react'

type ClientInfo = {
    socketId: string;
    userId: string;
};


export default function OnlineUsers() {
    const loggedInUserId = useAppSelector(state => state.user.user?.userId);
    // const [clientList, setClientList] = useState([]);
    const [OnlineUsers, setOnlineUsers] = useState<User[] | null>(null)
    useEffect(() => {
        if (loggedInUserId) {
            socket.emit("register", { userId: loggedInUserId });
        }

        socket.on("clientList", async (clients) => {
            console.log("Online clients:", clients);
            const typedClients = clients as ClientInfo[];

            const uniqueUserIds = Array.from(new Set(typedClients.map(c => c.userId)));

            const users: User[] = await Promise.all(
                uniqueUserIds.map(async (userId) => {
                    try {
                        return await getUserById(userId);
                    } catch (error) {
                        console.warn(`Failed to fetch user ${userId} with error ${error}`);
                        return null;
                    }
                })
            ).then(users => users.filter(Boolean) as User[]); // filter out nulls

            setOnlineUsers(users);
        });

        return () => {
            socket.off("clientList");
        };
    }, [loggedInUserId]);

    console.log(OnlineUsers);
    return (
        <div className='p-2 min-w-lg'>
            <h1 className='font-bold text-lg'>Online users</h1>
            <div className='max-h-[500px] h-[440] overflow-y-auto overflow-x-hidden'>
                {OnlineUsers &&
                    OnlineUsers?.map(member =>

                        <div
                            className='flex items-center gap-3 p-2 rounded-lg transition border-b border-slate-200'
                            key={`group-member-${member.userId}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={(member.profileUrl === "") ? '/avatar.png' : member.profileUrl} alt="profile" className='w-10 h-10 rounded-full' />
                            <div className='flex-1'>
                                <div className='flex justify-between'>
                                    <span className='font-medium'>{`${member.username} ${member.userId === loggedInUserId ? "(You)" : ""}`}</span>
                                    {/* <span className='text-sm text-gray-400'>{chat.time}</span> */}
                                </div>
                            </div>
                        </div>)}
            </div>
        </div>
    );

}
