import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import PostCard from '../components/PostCard'
import UserProfileInfo from '../components/UserProfileInfo'
import moment from 'moment'
import ProfileModel from '../components/ProfileModel'

const Profile = () => {

  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return user ? (
    <div className='relative min-h-full bg-slate-100 px-4 py-5 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-[760px]'>
        {/* Profile Card */}
        <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
          {/* Cover Photo */}
          <div className='h-40 w-full bg-slate-200 sm:h-52'>
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt=''
                className='h-full w-full object-cover'
              />
            )}
          </div>

          {/* User Info Section */}
          <div className='px-6 pb-4'>
            <UserProfileInfo 
              user={user} 
              posts={posts} 
              profileId={profileId} 
              setShowEdit={setShowEdit} 
            />
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
              {["posts", "media", "likes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Posts */}
            {activeTab === "posts" && (
              <div className="mt-6 flex flex-col items-center gap-6">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {/* Media */}
            {activeTab === 'media' && (
              <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {posts
                  .filter((post) => post.image_urls?.length > 0)
                  .flatMap((post) =>
                    post.image_urls.map((image, index) => (
                      <a
                        key={`${post._id}-${index}`}
                        target='_blank'
                        rel='noreferrer'
                        href={image}
                        className='relative group overflow-hidden rounded-xl'
                      >
                        <img src={image} className='h-64 w-full object-cover' alt='Post media' />
                        <p className='absolute bottom-0 right-0 m-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white opacity-0 transition duration-300 group-hover:opacity-100'>
                          Posted {moment(post.createdAt).fromNow()}
                        </p>
                      </a>
                    ))
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Edit profile  */}
      {showEdit && <ProfileModel setShowEdit={setShowEdit} />}
    </div>
  ) : (<Loading />)
}

export default Profile
