import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Messages = () => {

  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>

        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-1'>
            Messages
          </h1>
          <p className='text-slate-600 text-sm'>
            Talk to your friends and family
          </p>
        </div>

        {/* Connected Users */}
        <div className='flex flex-col gap-4'>
          {dummyConnectionsData.map((user) => (
            <div
              key={user._id}
              className='flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition'
            >
              <img
                src={user.profile_picture}
                alt="profile"
                className='w-14 h-14 rounded-full object-cover'
              />

              <div className='flex-1 min-w-0'>
                <p className='font-semibold text-slate-700 truncate'>
                  {user.full_name}
                </p>

                <p className='text-sm text-indigo-500 truncate'>
                  @{user.username}
                </p>

                <p className='text-xs text-slate-500 truncate mt-1'>
                  {user.bio}
                </p>
              </div>

              {/* Message Button */}
              <button onClick={()=>navigate(`/messages/${user._id}`)}
                className='w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition'
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button onClick={()=>navigate(`/profile/${user._id}`)}
                className='w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition'
              >
                <Eye className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Messages
