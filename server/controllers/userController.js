import ImageKit from "@imagekit/nodejs";
import User from "../models/User.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";

// Get user data using user id
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth();

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update User Data
export const updateUserData = async (req, res) => {
    try {
        const { userId } = req.auth();

        let { username, bio, location, full_name } = req.body;

        const tempUser = await User.findById(userId);

        // fallback username
        if (!username) {
            username = tempUser.username;
        }

        // check username uniqueness
        if (tempUser.username !== username) {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                username = tempUser.username;
            }
        }

        const updatedData = {
            username,
            bio,
            location,
            full_name,
        };

        const profile = req.files?.profile?.[0];
        const cover = req.files?.cover?.[0];

        // Profile upload
        if (profile) {
            const buffer = fs.readFileSync(profile.path);

            const response = await imagekit.upload({
                file: buffer,
                fileName: profile.originalname,
            });

            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: "auto" },
                    { format: "webp" },
                    { width: "512" },
                ],
            });

            updatedData.profile_picture = url;
        }

        // Cover upload
        if (cover) {
            const buffer = fs.readFileSync(cover.path);

            const response = await imagekit.upload({
                file: buffer,
                fileName: cover.originalname,
            });

            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: "auto" },
                    { format: "webp" },
                    { width: "1280" },
                ],
            });

            updatedData.cover_photo = url;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updatedData,
            { new: true }
        );

        res.json({ success: true, user, message: "Profile updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//find users using username, email, location, Name
export const discoverUsers = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { input } = req.body;
        const allUsers = await User.find(
            {
                $or: [
                    {username: new RegExp(input, 'i')},
                    {email: new RegExp(input, 'i')},
                    {full_name: new RegExp(input, 'i')},
                    {location: new RegExp(input, 'i')},
                ]
            }
        )

        const filteredUsers = allUsers.filter(user => user._id !== userId);
        res.json({ success: true, users: filteredUsers });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Follow User
export const followUser = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;

        const user = await User.findById(userId);
        const toUser = await User.findById(id);

        if (!user || !toUser) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.following.includes(id)) {
            return res.json({
                success: false,
                message: "You are already following this user",
            });
        }

        user.following.push(id);
        await user.save();

        toUser.followers.push(userId);
        await toUser.save();

        res.json({
            success: true,
            message: "Now you are following this user",
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//Unfollow user
export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;

        const user = await User.findById(userId);
        const toUser = await User.findById(id);

        if (!user || !toUser) {
            return res.json({ success: false, message: "User not found" });
        }

        user.following = user.following.filter(
            u => u.toString() !== id
        );
        await user.save();

        toUser.followers = toUser.followers.filter(
            u => u.toString() !== userId
        );
        await toUser.save();

        res.json({
            success: true,
            message: "You are no longer following this user",
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};