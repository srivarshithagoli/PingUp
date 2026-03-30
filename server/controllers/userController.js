import User from "../models/User.js";
import fs from "fs";
import { imagekit, imageKitUrlEndpoint } from "../configs/imageKit.js";
import Connection from "../models/Connections.js";
import { inngest } from "../inngest/index.js";

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
            const response = await imagekit.files.upload({
                file: fs.createReadStream(profile.path),
                fileName: profile.originalname,
            });

            const url = imagekit.helper.buildSrc({
                urlEndpoint: imageKitUrlEndpoint,
                src: response.filePath,
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
            const response = await imagekit.files.upload({
                file: fs.createReadStream(cover.path),
                fileName: cover.originalname,
            });

            const url = imagekit.helper.buildSrc({
                urlEndpoint: imageKitUrlEndpoint,
                src: response.filePath,
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

        const filteredUsers = allUsers.filter(
            (user) => user._id.toString() !== userId
        );
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
        res.json({ success: false, message: error.message })
    }
};


//Send connection request
export const sendConnectionRequest = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {id} = req.body;

        if (userId === id) {
            return res.json({
                success: false,
                message: "You cannot send a connection request to yourself",
            });
        }

        const [fromUser, toUser] = await Promise.all([
            User.findById(userId),
            User.findById(id),
        ]);

        if (!fromUser || !toUser) {
            return res.json({ success: false, message: "User not found" });
        }

        //Check if user had sent more than 20 connection requests in the last 24 hrs
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const connectionRequests = await Connection.find({
            from_user_id: userId,
            createdAt: { $gt: last24Hours },
        });
        if(connectionRequests.length >= 20){
            return res.json({success: false, message: 'You have sent more that 20 connection req in the last 24hrs'})
        }

        //Check if users are already connected
        const connection = await Connection.findOne({
            $or: [
                { from_user_id: userId, to_user_id: id },
                { from_user_id: id, to_user_id: userId },
            ]
        })

        if(!connection){
            const newConnection = await Connection.create({
                from_user_id : userId,
                to_user_id: id
            });

            await inngest.send({
                name: "app/connection-request",
                data: { connectionId: newConnection._id.toString() },
            });

            return res.json({success: true, message: 'Connection request sent successfully'})
        }

        if (connection.status === 'accepted') {
            return res.json({success: false, message: 'You are already connected'})
        }

        return res.json({success: false, message: 'Connection request pending'})
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Get user Connections
export const getUserConnections = async (req, res) => {
    try{
        const {userId} = req.auth()
        const user = await User.findById(userId).populate('connections followers following')

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const connections = user.connections
        const followers = user.followers
        const following = user.following

        const pendingConnections = (await Connection.find({to_user_id: userId, status: 'pending'}).populate('from_user_id')).map(connection=>connection.from_user_id)

        res.json({success: true, connections, followers, following, pendingConnections})
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Accept Connection request
export const acceptConnectionRequest = async (req, res) => {
    try{
        const {userId} = req.auth()
        const {id} = req.body;

        const connection = await Connection.findOne({
            from_user_id: id,
            to_user_id: userId,
            status: "pending",
        })

        if(!connection){
            return res.json({success: false, message: 'Connection not found'});
        }

        const [user, toUser] = await Promise.all([
            User.findById(userId),
            User.findById(id),
        ]);

        if (!user || !toUser) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.connections.includes(id)) {
            user.connections.push(id);
        }
        await user.save()

        if (!toUser.connections.includes(userId)) {
            toUser.connections.push(userId);
        }
        await toUser.save()

        connection.status = 'accepted';
        await connection.save()

        res.json({success: true, message: 'Connection accepted successfully'});
        
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
