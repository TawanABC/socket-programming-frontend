'use client'
import { useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import Image from 'next/image'

export default function ProfilePage() {
  const dummyuser = {
    name: 'Ye Zus',
    profilePic: '/dummypic.jpg',
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSrc, setImageSrc] = useState('/dummypic.jpg') // default picture

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("pic changed")
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-8">Your Profile</h2>
      <div className="relative group w-40 h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <h1 className="mt-4 text-xl font-semibold">{dummyuser.name}</h1>
    </div>
  )
}
