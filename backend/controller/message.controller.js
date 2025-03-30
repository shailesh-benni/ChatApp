import User from "../models/user.models.js";
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js'


export const getUsersForSidebar = async(req, res)=>{
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getMessages = async(req, res)=>{
try {
    const {id:userToChatId} = req.params
    const myId = req.user._id;
    const messages = await Message.find({
        $or:[
            {senderId:myId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId:myId},
        ],
    });

    res.status(200).json(messages);

} catch (error) {
    console.log("Error In getMessages controller", error);
    res.status(500).json({error:"Internal Server Error"});
}
};

export const sendMessage = async(req, res)=>{
try {
    const {text, image} = req.body;
    const {id: receiverId} = req.params;
    const senderId= req.user._id;

    let imageUrl;

    if(image){
        const uploadResponse  = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl,
    });
     await newMessage.save();

     //ille real time functionality bartet "todo"

     res.status(200).json(newMessage);


} catch (error) {
    console.log("Error in senderMessage Controller", error.message);
    res.status(500).json({error:"Internal Server Error"});
    
}
};