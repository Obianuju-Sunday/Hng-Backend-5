const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    filePath: {
      type: String,
    },
    videoData: {
      type: Buffer, // Assuming videoData is binary data (Buffer)
    },
    transcript: {
      type: String, // Assuming transcript is a string
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
