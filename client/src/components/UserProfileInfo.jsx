import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import React from 'react'

const UserProfileInfo = ({user, posts, profileId, setShowEdit}) => {
  const joinedOn = (() => {
    if (!user?.createdAt) return 'N/A'
    const created = new Date(user.createdAt)
    const now = new Date()
    const days = Math.max(1, Math.floor((now - created) / (1000 * 60 * 60 * 24)))
    return `${days} days ago`
  })()

  return (
    <div className='relative w-full'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>

        <img
          src={user.profile_picture}
          alt=""
          className='-mt-12 h-24 w-24 sm:-mt-14 sm:h-28 sm:w-28
                     rounded-full object-cover 
                     border-4 border-white 
                     shadow-md'
        />

        <div className='flex-1 pt-1 sm:pt-3'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-semibold text-slate-900'>
                {user.full_name}
                </h1>
                <Verified className='h-5 w-5 text-sky-500' />
              </div>
              <p className='mt-0.5 text-lg text-slate-600'>
                {user.username ? `@${user.username}` : 'Add a username'}
              </p>
            </div>

            {!profileId && (
              <button
                onClick={() => setShowEdit?.(true)}
                className='inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer'
              >
                <PenBox className='h-4 w-4' />
                Edit
              </button>
            )}
          </div>

          <p className='text-grey-700 text-sm max-w-md mt-4'>
            {user.bio}
          </p>

          <div className='mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500'>
            <span className='flex items-center gap-1.5' >
                <MapPin className='w-4 h-4' />
                {user.location ? user.location : 'Add location'}
            </span>
            <span className='flex items-center gap-1.5' >
                <Calendar className='w-4 h-4' />
                Joined <span className='font-medium' >{joinedOn}</span>
            </span>
          </div>

          <div className='flex items-cener gap-6 border-t border-grey-200 pt-4'>
            <div>
              <span className='sm:text-xl font-bold text-grey-900' >{posts.length}</span>
              <span className='text-xs sm:text-sm text-grey-500 ml-1.5'>Posts</span>
            </div>
            <div>
              <span className='sm:text-xl font-bold text-grey-900' >{user.followers.length}</span>
              <span className='text-xs sm:text-sm text-grey-500 ml-1.5'>Followers</span>
            </div>
            <div>
              <span className='sm:text-xl font-bold text-grey-900' >{user.following.length}</span>
              <span className='text-xs sm:text-sm text-grey-500 ml-1.5'>Following</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileInfo
