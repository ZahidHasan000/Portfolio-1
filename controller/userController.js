const User = require("../model/User");
const jwt = require("jsonwebtoken");
const sendMail = require("../middlewares/sendMail");
const cloudinary = require("cloudinary").v2; // Corrected import


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        }).json({
            success: true,
            message: "Logged in successfully",
            token
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne().select("-password -email");
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;
        await sendMail(userMessage);
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const { name, email, password, skills, about } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        const uploadImage = async (newImage, currentImage) => {
            if (currentImage && currentImage.public_id) {
                await cloudinary.uploader.destroy(currentImage.public_id);
            }
            const result = await cloudinary.uploader.upload(newImage, {
                folder: "portfolio",
            });
            return { public_id: result.public_id, url: result.secure_url };
        };

        if (skills) {
            if (skills.image1) user.skills.image1 = await uploadImage(skills.image1);
            if (skills.image2) user.skills.image2 = await uploadImage(skills.image2);
            if (skills.image3) user.skills.image3 = await uploadImage(skills.image3);
            if (skills.image4) user.skills.image4 = await uploadImage(skills.image4);
            if (skills.image5) user.skills.image5 = await uploadImage(skills.image5);
            if (skills.image6) user.skills.image6 = await uploadImage(skills.image6);
        }

        if (about) {
            if (about.name) user.about.name = about.name;
            if (about.title) user.about.title = about.title;
            if (about.subtitle) user.about.subtitle = about.subtitle;
            if (about.description) user.about.description = about.description;
            if (about.quote) user.about.quote = about.quote;
            if (about.avatar) user.about.avatar = await uploadImage(about.avatar);
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            token
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const addTimeline = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const user = await User.findById(req.user._id);
        user.timeline.unshift({ title, description, date });
        await user.save();
        res.status(200).json({
            success: true,
            message: "Added to timeline"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


const addProject = async (req, res) => {
    try {
        const { title, url, image, description, techStack } = req.body;
        const user = await User.findById(req.user._id);
        const myCloud = await cloudinary.uploader.upload(image, { folder: "portfolio" });
        user.projects.unshift({

            title,
            url,
            description,
            techStack,
            image: { public_id: myCloud.public_id, url: myCloud.secure_url }
        });
        await user.save();
        res.status(200).json({
            success: true,
            message: "Added to projects"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


const addYoutube = async (req, res) => {
    try {
        const { url, title, image } = req.body;
        const user = await User.findById(req.user._id);
        const myCloud = await cloudinary.uploader.upload(image, { folder: "portfolio" });
        user.youtube.unshift({
            url,
            title,
            image: { public_id: myCloud.public_id, url: myCloud.secure_url }
        });
        await user.save();
        res.status(200).json({
            success: true,
            message: "Added to youtube"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};

const deleteTimeline = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        user.timeline = user.timeline.filter((item) => item._id.toString() !== id);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Deleted from timeline"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


const deleteYoutube = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        const video = user.youtube.find((video) => video._id.toString() === id);
        if (video) {
            await cloudinary.uploader.destroy(video.image.public_id);
            user.youtube = user.youtube.filter((video) => video._id.toString() !== id);
            await user.save();
            res.status(200).json({
                success: true,
                message: "Deleted from youtube"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        const project = user.projects.find((project) => project._id.toString() === id);
        if (project) {
            await cloudinary.uploader.destroy(project.image.public_id);
            user.projects = user.projects.filter((project) => project._id.toString() !== id);
            await user.save();
            res.status(200).json({
                success: true,
                message: "Deleted from project"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message // Fixed typo
        });
    }
};


module.exports = {
    login,
    logout,
    getUser,
    myProfile,
    contact,
    updateUser,
    addTimeline,
    addProject,
    addYoutube,
    deleteTimeline,
    deleteYoutube,
    deleteProject
};
