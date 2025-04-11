import { User } from '@/common/model'
import React from 'react'

interface groupProps {
    modalId: string
    members?: User[]
}


export default function GroupMembers({ modalId, members }: groupProps) {
    return (
        <div>
            <dialog id={modalId} className="modal">
                <div className="modal-box bg-white">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h1 className='font-bold text-lg'>Group Members</h1>
                    <div className='max-h-[500px] h-[440] overflow-y-auto overflow-x-hidden'>
                        {members &&
                            members?.map(member =>

                                <div
                                    className='flex items-center gap-3 p-2 rounded-lg transition border-b border-slate-200'
                                    key={`group-member-${member.userId}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={(member.profileUrl === "") ? '/avatar.png' : member.profileUrl} alt="profile" className='w-10 h-10 rounded-full' />
                                    <div className='flex-1'>
                                        <div className='flex justify-between'>
                                            <span className='font-medium'>{member.username}</span>
                                            {/* <span className='text-sm text-gray-400'>{chat.time}</span> */}
                                        </div>
                                    </div>
                                </div>)}
                    </div>




                </div>
            </dialog></div>
    )
}
