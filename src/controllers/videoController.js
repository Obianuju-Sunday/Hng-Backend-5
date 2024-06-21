
require("dotenv").config();
const multer = require('multer');
const Video = require('../model/videoModel');
const cloudinary = require("cloudinary").v2;
const { Deepgram } = require("@deepgram/sdk");
const { v4: uuidv4 } = require('uuid');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });




const uploadVideo = async (req, res) => {
  try {
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
    const deepgram = new Deepgram(deepgramApiKey);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error) {
          throw error;
        }
        return result;
      }
    ).end(req.file.buffer);

    const cloudinaryUrl = result.secure_url;
    const videoBuffer = req.file.buffer;
    const videoId = uuidv4();

    const transcript = await deepgram.transcription.preRecorded(
      { buffer: videoBuffer, mimetype: "video/mp4" }
    );

    const file = new Video({
      videoId: videoId,
      cloudinaryUrl: cloudinaryUrl,
      transcript: transcript.results,
    });

    await file.save();

    res.status(201).json({ file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error });
  }
};


const getSingleVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found in the database' });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


module.exports = {
  upload,
  uploadVideo,
  getAllVideos,
  getSingleVideo,
  deleteVideo
};