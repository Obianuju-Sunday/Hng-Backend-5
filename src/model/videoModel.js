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
      type: Buffer,
    },
    transcript: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
