import { CirclePlus, LogOut } from 'lucide-react'
import React from 'react'
import MenuItems from './MenuItems'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { UserButton, useClerk } from '@clerk/clerk-react'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const { user, signOut } = useClerk()

  return (
    <div
      className={`w-60 xl:w-72 bg-white border-r border-gray-200
      flex flex-col justify-between max-sm:absolute top-0 bottom-0 z-20
      ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      transition-all duration-300 ease-in-out`}
    >
      {/* Top */}
      <div className="w-full">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          className="w-24 ml-7 my-4 cursor-pointer"
          alt="logo"
        />

        <hr className="border-gray-300 mb-6" />

        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 py-2.5
          mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-700 hover:to-purple-800 active:scale-95
          transition text-white"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* Bottom */}
      {user && (
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <UserButton />
            <div>
              <h1 className="text-sm font-medium">{user.fullName}</h1>
              <p className="text-xs text-gray-500">
                @{user.username || 'user'}
              </p>
            </div>
          </div>

          <LogOut
            onClick={() => signOut(() => navigate('/login'))}
            className="w-[18px] text-gray-400 hover:text-gray-700 cursor-pointer"
          />
        </div>
      )}
    </div>
  )
}

export default Sidebar
