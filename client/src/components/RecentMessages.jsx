import React, { useEffect, useState } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'

const RecentMessages = () => {
  const [messages, setMessages] = useState([])

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData)
  }

  useEffect(() => {
    fetchRecentMessages()
  }, [])

  const formatRelativeTime = (value) => {
    if (!value) return ''
    const createdAt = new Date(value)
    if (Number.isNaN(createdAt.getTime())) return ''
    const diffMs = Date.now() - createdAt.getTime()
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour

    if (diffMs < minute) return 'just now'
    if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`
    if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`
    return `${Math.floor(diffMs / day)}d ago`
  }

  return (
    <div className='bg-white max-w-xs mt-4 p-4 rounded-xl shadow-md text-sm text-slate-800'>
      
      <h3 className='font-semibold text-slate-800 mb-4 text-base'>
        Recent Messages
      </h3>

      <div className='flex flex-col max-h-64 overflow-y-auto scrollbar-thin'>
        
        {messages.map((message) => (
          (() => {
            const user = message.from_user_id || message.to_user_id
            if (!user) return null

            return (
              <Link
                key={message._id}
                to={`/chat/${message.from_user_id._id}`}
                className='flex items-start gap-3 py-3 px-2 rounded-lg hover:bg-slate-100 transition'
              >
                <img
                  src={user.profile_picture}
                  alt="profile"
                  className='w-9 h-9 rounded-full object-cover'
                />

                <div className='flex-1 min-w-0'>
                  
                  <div className='flex items-center justify-between'>
                    <p className='font-medium truncate'>
                      {user.full_name}
                    </p>

                    <span className='text-[11px] text-slate-400 whitespace-nowrap'>
                      {formatRelativeTime(message.createdAt)}
                    </span>
                  </div>

                  <div className='flex items-center justify-between mt-1'>
                    <p className='text-slate-500 truncate text-xs'>
                      {message.text ? message.text : 'Media'}
                    </p>

                    {!message.seen && (
                      <span className='ml-2 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px]'>
                        1
                      </span>
                    )}
                  </div>

                </div>
              </Link>
            )
          })()
        ))}

      </div>
    </div>
  )
}

export default RecentMessages