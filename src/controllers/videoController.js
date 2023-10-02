 
const Video = require('../model/videoModel');
require("dotenv").config();
const { Deepgram } = require("@deepgram/sdk");
const multer = require('multer');

const deepgram = new Deepgram('5f596cc5c3b3387697b7d954bb0873f65d6f21bb');

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const videoChunks = [];

const uploadVideo = async (req, res) => {
  try {
    const chunk = req.file.buffer;
    
    // Append the received chunk to the videoChunks array
    videoChunks.push(chunk);

    // Check if this is the last chunk (you may need to determine this based on your frontend logic)
    const isLastChunk = req.body.isLastChunk === 'true';

    if (isLastChunk) {
      // Combine all video chunks into a single Buffer
      const fullVideoBuffer = Buffer.concat(videoChunks);

      // Transcribe the video using Deepgram
      const transcript = await deepgram.transcribe(fullVideoBuffer, {
        mimetype: "video/mp4", // Adjust the mimetype as needed
      });

      // Create a new Video document with the full video and transcript
      const file = new Video({
        videoData: fullVideoBuffer,
        transcript: transcript,
      });

      // Save the video info to the database
      await file.save();

      // Clear the videoChunks array for the next recording session
      videoChunks.length = 0;

      res.status(201).json({ file, transcript });
    } else {
      // Continue receiving chunks, but don't send a response yet
      res.status(200).send('Video uploaded successfully', {transcript});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error});
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

module.exports = {
  uploadVideo,
  getSingleVideo,
  deleteVideo,
};

