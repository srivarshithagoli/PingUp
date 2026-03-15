import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react'

const ProfileModel = ({setShowEdit}) => {
  const user = dummyUserData;

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  })

  const handleSaveProfile = async (e) => {
    e.preventDefault();
  }

  const handleFileChange = (field) => (e) => {
    const file = e.target.files?.[0] || null
    setEditForm((prev) => ({
      ...prev,
      [field]: file
    }))
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50'>
      <div className='max-w-2xl sm:py-6 mx-auto'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>

          <form className='space-y-4' onSubmit={handleSaveProfile}>
            {/* Profile Picture */}
            <div className='flex flex-col items-start gap-3'>
              <label
                htmlFor="profile_picture"
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Profile Picture
              </label>

              <input
                hidden
                type="file"
                accept="image/*"
                id="profile_picture"
                onChange={handleFileChange('profile_picture')}
              />

              <label htmlFor="profile_picture" className='group/profile relative cursor-pointer'>
                <img
                  className="w-24 h-24 rounded-full object-cover mt-2"
                  src={
                    editForm.profile_picture
                      ? URL.createObjectURL(editForm.profile_picture)
                      : user.profile_picture
                  }
                  alt=""
                />

                <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center'>
                  <Pencil className='w-5 h-5 text-white' />
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div className='flex flex-col items-start gap-3'>
              <label htmlFor="cover_photo" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Photo
              </label>
              <input
                hidden
                type="file"
                accept="image/*"
                id="cover_photo"
                onChange={handleFileChange('cover_photo')}
              />
              <label htmlFor="cover_photo" className='group/cover relative cursor-pointer'>
                <img
                  src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo) : user.cover_photo}
                  alt=""
                  className='w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2'
                />
                <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center'>
                  <Pencil className='w-5 h-5 text-white' />
                </div>
              </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Please enter your full name"
                onChange={(e) =>
                    setEditForm({ ...editForm, full_name: e.target.value })
                }
                value={editForm.full_name}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                </label>
                <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Please enter your username"
                onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                }
                value={editForm.username}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                </label>
                <textarea rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Please enter your bio"
                onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                }
                value={editForm.bio}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                </label>
                <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Please enter your location"
                onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                }
                value={editForm.location}
                />
            </div>
            <div className='mt-2 flex items-center justify-end gap-3 border-t border-gray-100 pt-5'>
                <button
                  onClick={() => setShowEdit?.(false)}
                  type='button'
                  className='inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
                >
                  Save Changes
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModel
