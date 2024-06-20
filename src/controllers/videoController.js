const Video = require('../model/videoModel');
require("dotenv").config();
const { Deepgram } = require("@deepgram/sdk");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); 

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

const deepgram = new Deepgram(deepgramApiKey);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const videoChunks = [];

const uploadVideo = async (req, res) => {
  try {
    const chunk = req.file.buffer;

    const videoId = uuidv4();

    videoChunks.push(chunk);

    const isLastChunk = req.body.isLastChunk === 'true';

    if (isLastChunk) {
      const fullVideoBuffer = Buffer.concat(videoChunks);

      const transcript = await deepgram.transcribe(fullVideoBuffer, {
        mimetype: "video/mp4", 
      });

      const file = new Video({
        videoId: videoId, 
        videoData: fullVideoBuffer,
        transcript: transcript,
      });

      await file.save();

      videoChunks.length = 0;

      res.status(201).json({ file, transcript });


    } else {
      res.status(200).json('Video uploaded successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
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
    const video = await Video.findByIdAndDelete(videoId);
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllVideos = async (req, res) => {
  try {
    // Retrieve all videos from your database
    const videos = await Video.find();

    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error });
  }
};


module.exports = {
  uploadVideo,
  getSingleVideo,
  deleteVideo,
  getAllVideos
};


