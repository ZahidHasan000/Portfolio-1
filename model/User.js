const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        select: false,
    },

    timeline: [
        {
            title: String,
            description: String,
            date: Date,
        },
    ],

    skills: {
        image1: {
            public_id: String,
            url: String,
        },

        image2: {
            public_id: String,
            url: String,
        },
        image3: {
            public_id: String,
            url: String,
        },
        image4: {
            public_id: String,
            url: String,
        },
        image5: {
            public_id: String,
            url: String,
        },
        image6: {
            public_id: String,
            url: String,
        },
    },

    youtube: [
        {
            url: String,
            title: String,
            image: {
                public_id: String,
                url: String,
            },
        },
    ],

    projects: [
        {
            url: String,
            title: String,
            image: {
                public_id: String,
                url: String,
            },
            description: String,
            techStack: String,
        },
    ],

    about: {
        name: String,
        title: String,
        subtitle: String,
        description: String,
        quote: String,
        avatar: {
            public_id: String,
            url: String,
        },
    },
});

// // Hash the password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;