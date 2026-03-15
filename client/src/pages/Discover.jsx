import React, { useMemo, useState } from "react"
import { dummyConnectionsData, dummyUserData } from "../assets/assets"
import { Search } from "lucide-react"
import UserCard from "../components/UserCard"

const Discover = () => {
  const [input, setInput] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    ...dummyUserData,
    following: Array.isArray(dummyUserData.following) ? dummyUserData.following : [],
    connections: Array.isArray(dummyUserData.connections) ? dummyUserData.connections : [],
  })

  const users = useMemo(() => {
    const query = input.trim().toLowerCase()
    if (!query) return dummyConnectionsData

    return dummyConnectionsData.filter((user) => {
      const fullName = user.full_name?.toLowerCase() || ""
      const username = user.username?.toLowerCase() || ""
      const bio = user.bio?.toLowerCase() || ""

      return (
        fullName.includes(query) ||
        username.includes(query) ||
        bio.includes(query)
      )
    })
  }, [input])

  const onSearch = (e) => {
    setInput(e.target.value)
    setHasSearched(true)
  }

  const handleFollowToggle = (userId) => {
    if (!userId) return

    setCurrentUser((prev) => {
      const following = Array.isArray(prev?.following) ? prev.following : []

      return {
        ...prev,
        following: following.some((id) => String(id) === String(userId))
          ? following
          : [...following, userId],
      }
    })
  }

  const handleConnectionToggle = (userId) => {
    if (!userId) return

    setCurrentUser((prev) => {
      const connections = Array.isArray(prev?.connections) ? prev.connections : []

      return {
        ...prev,
        connections: connections.some((id) => String(id) === String(userId))
          ? connections
          : [...connections, userId],
      }
    })
  }

  return (
    <div className="min-h-full bg-[#f4f6fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-8">
        <div className="mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Discover People
          </h1>
          <p className="text-slate-600 mt-1.5 text-base">
            Connect with amazing people and grow your network
          </p>
        </div>

        <div className="mb-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={input}
              onChange={onSearch}
              placeholder="Search people by name, username, bio, or location..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
            />
          </div>
        </div>

        {hasSearched && (
          <p className="text-sm text-slate-500 mb-4">
            {users.length} profile{users.length === 1 ? "" : "s"} found
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              currentUser={currentUser}
              handleFollow={handleFollowToggle}
              handleConnectionRequest={handleConnectionToggle}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Discover
