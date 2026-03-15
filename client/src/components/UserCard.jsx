import { MapPin, MessageCircle, UserPlus, UserCheck } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user, currentUser, handleFollow, handleConnectionRequest }) => {
  const navigate = useNavigate()
  const isFollowing = currentUser?.following?.includes(user?._id)
  const isConnected = currentUser?.connections?.includes(user?._id)

  return (
    <div className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 group'>
      <div className='flex items-center gap-4'>
        <img
          src={user?.profile_picture}
          alt={user?.full_name}
          className='w-14 h-14 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition'
        />
        <div>
          <p className='font-semibold text-slate-800'>{user?.full_name}</p>
          {user?.username && <p className='text-sm text-slate-500'>@{user.username}</p>}
        </div>
      </div>

      {user?.bio && (
        <p
          className='text-sm text-slate-600 mt-4 line-clamp-2'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {user.bio.replace(/\r?\n/g, ' ')}
        </p>
      )}

      <div className='mt-4 flex items-center gap-2 flex-wrap'>
        {user?.location && (
          <div className='flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1.5 text-xs text-slate-600'>
            <MapPin className='w-4 h-4 text-slate-500' />
            {user.location}
          </div>
        )}

        <div className='flex items-center gap-1.5 bg-indigo-50 text-indigo-700 rounded-full px-3 py-1.5 text-xs font-medium'>
          {user?.followers?.length || 0} Followers
        </div>
      </div>

      <div className='grid grid-cols-2 mt-5 gap-2'>
        <button
          onClick={() => handleFollow?.(user?._id)}
          disabled={isFollowing}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition
            ${
              isFollowing
                ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          {isFollowing ? (
            <>
              <UserCheck className='w-4 h-4' />
              Following
            </>
          ) : (
            <>
              <UserPlus className='w-4 h-4' />
              Follow
            </>
          )}
        </button>

        <button
          onClick={() =>
            isConnected
              ? navigate(`/messages/${user?._id}`)
              : handleConnectionRequest?.(user?._id)
          }
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition
            ${
              isConnected
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
        >
          <MessageCircle className='w-4 h-4' />
          {isConnected ? 'Message' : 'Connect'}
        </button>
      </div>
    </div>
  )
}

export default UserCard
