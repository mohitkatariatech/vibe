import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js"
import Notification from "../models/notification.model.js";
import { io, getSocketId } from "../socket.js";

// =====================
// Get Current User
// =====================
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password").populate("posts loops posts.author posts.comments story following")

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get current user error: ${error}` });
  }
};


// =====================
// Suggested Users
// =====================
export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: `Get suggested users error: ${error}`
    });
  }
};

export const editProfile = async (req, res) => {
  console.log("REQ FILE:", req.file);
console.log("REQ BODY:", req.body);

  try {
    const { name, userName, bio, profession, gender } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const sameUser = await User.findOne({ userName });
    if (sameUser && sameUser._id.toString() !== req.userId.toString()) {
      return res.status(400).json({ message: "Username already exists" });
    }

    let profileImage = user.profileImage;

    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path); // ✅ string only
    }

    user.name = name;
    user.userName = userName;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
    user.profileImage = profileImage;

    await user.save();

    return res.status(200).json(user);

  } catch (error) {
    console.error("EDIT PROFILE ERROR:", error);
    return res.status(500).json({
      message: `edit profile error: ${error.message}`,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName })
      .select("-password")
      .populate("posts loops")
      .populate({
        path: "followers",
        select: "userName name profileImage"
      })
      .populate({
        path: "following",
        select: "userName name profileImage"
      });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `get profile error: ${error.message}`,
    });
  }
};


export const follow = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const targetUserId = req.params.targetUserId;

    if (currentUserId.toString() === targetUserId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId); 
       if (currentUser._id!= targetUser._id) {
                const notificatiion = await Notification.create({
                    sender: currentUser._id,
                    receiver: targetUser._id,
                    type: "follow",
                    message:" started following you"
                })
                const populatedNotification = await Notification.findById(notificatiion._id).populate("sender receiver ")
                const receiverSocketId = getSocketId(targetUser._id)

                if(receiverSocketId){
                    io.to(receiverSocketId).emit("newNotification", populatedNotification)
                }
            }
    }

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      following: !isFollowing,
      message: isFollowing ? "Unfollowed" : "Followed",
    });

  } catch (error) {
    return res.status(500).json({ message: `follow error ${error.message}` });
  }
};

export const followingList = async (req,res)=>{
  
  try {
     const result  = await User.findById(req.userId)
      return  res.status(200).json(result?.following)
  } catch (error) {
        return res.status(500).json({ message: `following  error ${error.message}` });

  }

}


export const search = async (req, res) => {
  try {
    const keyWord = req.query.keyWord;

    if (!keyWord) {
      return res.status(200).json([]);
    }

    const users = await User.find({
      $or: [
        { userName: { $regex: keyWord, $options: "i" } },
        { name: { $regex: keyWord, $options: "i" } },
      ],
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: `search error ${error.message}`,
    });
  }
};


export   const getAllNotifications = async(req,res)=>{
  try {
    const notifications  = await Notification.find({
      receiver:req.userId
    }).populate("sender receiver post loop").sort({createdAt:-1})
    return res.status(200).json(notifications)
  } catch (error) {
     return res.status(500).json({
      message: `get Notification error ${error.message}`,
    });
  }

} 

export const markAsRead =  async(req,res)=>{
  try {
    const {notificationId} = req.body 
     
    if(Array.isArray(notificationId)){
      await Notification.updateMany(
        {_id: {$in: notificationId}, receiver: req.userId},
        {$set: {isRead : true}}
      );
    }else {
      await Notification.findByIdAndUpdate(
          {_id: {$in: notificationId}, receiver: req.userId},
        {$set: {isRead : true}}
      );
    }

 

    return res.status(200).json({message:"marked as read"})

  } catch (error) {
     return res.status(500).json({
      message: `read Notification error ${error.message}`,
    });
  }

}