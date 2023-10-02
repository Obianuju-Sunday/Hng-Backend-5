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
        },
    },
    {
        timestamps: true,
    }

);


const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
