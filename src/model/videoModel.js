const mongoose = require("mongoose");


const videoSchema = new mongoose.Schema(
    {
        title: {
            String,
        },
        description: {
            String,
        },
        filePath: {
            type: String,
        }, // Store the file path to locate the video
    },
    {
        timestamps: true,
    }

);


const Video = mongoose.model('Video', videoSchema);

module.exports = Video;