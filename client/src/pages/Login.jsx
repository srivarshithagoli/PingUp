import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import {SignIn} from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen relative flex flex-col md:flex-row">
      
      {/* Background Image */}
      <img
        src={assets.bgImage}
        alt="Background"
        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover"
      />

      {/* Left Section */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
        
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="h-12 object-contain"
        />

        {/* Users + Rating */}
        <div className="max-md:mt-10">
          <div className="flex items-center gap-3 mb-4">
            
            <img
              src={assets.group_users}
              alt="Users"
              className="h-8 md:h-10"
            />

            <div>
              {/* Stars */}
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 md:size-[18px] text-transparent fill-amber-500"
                    />
                  ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600">
                Used by 12k+ developers
              </p>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-xl">More than just friends truly connect</h1>
          <p>connect with global community on pingup.</p>
        </div>
            <span className = 'md:h-10'></span>
      </div>
      <div className='flex-1 flex items-center justify-center p-6 sm:p-10'>
                  <SignIn/>
      </div>
    </div>
  )
}

export default Login
