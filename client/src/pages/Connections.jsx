import React, { useState } from "react"
import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from "../assets/assets"

const Connections = () => {
  const [currentTab, setCurrentTab] = useState("Followers")
  const navigate = useNavigate()

  const dataArray = [
    { label: "Followers", value: followers, icon: Users },
    { label: "Following", value: following, icon: UserCheck },
    { label: "Pending", value: pendingConnections, icon: UserRoundPen },
    { label: "Connections", value: connections, icon: UserPlus },
  ]

  const activeData = dataArray.find(
    (item) => item.label === currentTab
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Connections
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your network and discover new connections
          </p>
        </div>

        {/* Counts Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          {dataArray.map((items, index) => {
            const Icon = items.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-5 border border-slate-100 flex items-center justify-between hover:shadow-md transition"
              >
                <div>
                  <p className="text-xl font-bold text-slate-800">
                    {items.value.length}
                  </p>
                  <p className="text-sm text-slate-500">
                    {items.label}
                  </p>
                </div>
                <Icon className="w-6 h-6 text-indigo-500" />
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          {dataArray.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.label}
                onClick={() => setCurrentTab(tab.label)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all
                ${
                  currentTab === tab.label
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">
                  {tab.value.length}
                </span>
              </button>
            )
          })}
        </div>

        {/* User Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {activeData.value.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 group"
            >
              {/* Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={user.profile_picture}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition"
                />
                <div>
                  <p className="font-semibold text-slate-800">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-slate-500">
                    @{user.username}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                {user.bio}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-5">

                {/* View Profile */}
                <button
                  onClick={() =>
                    navigate(`/profile/${user._id}`)
                  }
                  className="w-full py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-all"
                >
                  View Profile
                </button>

                {/* Conditional Buttons */}
                {currentTab === "Following" && (
                  <button className="w-full py-2 rounded-lg text-sm bg-red-100 hover:bg-red-200 text-red-600 active:scale-95 transition">
                    Unfollow
                  </button>
                )}

                {currentTab === "Pending" && (
                  <button className="w-full py-2 rounded-lg text-sm bg-green-100 hover:bg-green-200 text-green-700 active:scale-95 transition">
                    Accept
                  </button>
                )}

                {currentTab === "Connections" && (
                  <button
                    onClick={() =>
                      navigate(`/messages/${user._id}`)
                    }
                    className="w-full py-2 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Connections