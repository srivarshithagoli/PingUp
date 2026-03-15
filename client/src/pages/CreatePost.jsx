import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { X, Image } from "lucide-react";
import toast from 'react-hot-toast'
const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;

  const handleSubmit = async () => {
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Post
          </h1>
          <p className="text-slate-600">
            Share your thoughts with the world
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl bg-white p-4 sm:p-8 rounded-xl shadow-md space-y-4">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_picture}
              alt=""
              className="w-12 h-12 rounded-full shadow"
            />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-20 rounded-md"
                    alt=""
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/40 rounded-md cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            
            {/* Upload Button */}
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <Image className="w-6 h-6" />
              Add Images
            </label>

            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={(e) =>
                setImages([...images, ...Array.from(e.target.files)])
              }
            />

            {/* Publish Button */}
            <button
              disabled={loading} onClick={()=>toast.promise(
                handleSubmit(),
                {
                  loading: 'uploading ...',
                  success : <p>Post Added</p>,
                  error: <p>Post Not Added</p>
                }
              )}
              className="text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white font-medium px-6 py-2 rounded-md cursor-pointer"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;