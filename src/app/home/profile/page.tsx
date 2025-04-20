/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import clsx from 'clsx'
import { updateProfile } from '@/services/profileService'
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { getUserById } from '@/services/userService'
import { setUser } from '@/states/features/userSlice'

const availableImages = [
  '/avatars/avatar1.jpg',
  '/avatars/avatar2.jpg',
  '/avatars/avatar3.jpg',
  '/avatars/avatar4.jpg',
  '/avatars/avatar5.jpg',
  '/avatars/avatar6.jpg'
]

export default function ProfilePage() {
  const [imageSrc, setImageSrc] = useState('/avatars/avatar1.png') // default image
  const [selecting, setSelecting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState("Ye")
  const [tempName, setTempName] = useState("")
  const userId = useAppSelector((state) => state.user.user?.userId);
  const dispatch = useAppDispatch();

  const handleSaveName = async () => {
    setName(tempName)
    setEditingName(false)
    if (userId) {
      await updateProfile({ userId: userId, username: tempName, profileUrl: null })
    }
  }


  const handleSelect = async (imgUrl: string) => {
    if (imgUrl === imageSrc) {
      return
    }
    setImageSrc(imgUrl)
    setSelecting(false)

    try {
      setUploading(true)
      console.log('pic changed')
      console.log(imgUrl)
      if (userId) {
        await updateProfile({ userId: userId, username: null, profileUrl: imgUrl })

      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const current = await getUserById(userId)
          setName(current.username)
          setImageSrc(current.profileUrl)
          dispatch(setUser(current))
        }
        else {
          console.log('no userId')
        }
      } catch (err) {
        console.error(err)
      } finally {
        //setLoading(false)
      }
    }

    fetchProfile()
  }, [uploading, editingName])
  return (
    <div className='flex flex-row justify-center'>
      <div className="grow max-w-2xl flex flex-col items-center justify-start bg-slate-300 p-4 pt-12 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Your Profile</h2>

        <div className="relative group w-40 h-40">
          <img
            src={imageSrc === "" ? '/avatar.png' : imageSrc}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
          />
          <button
            onClick={() => setSelecting(true)}
            className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition"
            disabled={uploading}
          >
            <Pencil className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {editingName ? (
          <div className="flex items-center gap-2 mt-6">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-lg w-40"
            />
            <button
              onClick={handleSaveName}
              className="text-blue-600 hover:underline text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingName(false)
                //setName(name)
              }}
              className="text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-6">
            <p className="text-xl font-semibold">{name}</p>
            <button onClick={() => {
              setEditingName(true)
              setTempName(name)
            }
            }>
              <Pencil className="w-4 h-4 text-gray-500 hover:text-black" />
            </button>
          </div>
        )}

        {uploading && <p className="mt-2 text-sm text-gray-500">Saving...</p>}

        {/* Selection Modal */}
        {selecting && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Choose a profile picture</h3>
              <div className="grid grid-cols-4 gap-4">
                {availableImages.map((img) => (
                  <button
                    key={img}
                    onClick={() => handleSelect(img)}
                    className={clsx(
                      imageSrc === img ? 'border-blue-500' : 'border-transparent',
                      'w-20 h-20 rounded-full border-4 overflow-hidden transition-all hover:scale-105 flex items-center justify-center'
                    )}
                  >
                    <img
                      src={img}
                      alt="Option"
                      className="w-full h-full object-cover"
                    />
                  </button>

                ))}
              </div>
              <button
                onClick={() => setSelecting(false)}
                className="mt-6 w-full py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
