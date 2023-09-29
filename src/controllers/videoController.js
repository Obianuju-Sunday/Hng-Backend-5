
//Multer connection

const multer = require('multer');
const Video = require('../model/videoModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  'uploads'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + '-' + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a video and save its metadata
// const uploadVideo = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const videoPath = req.file.path;
    
//     // Create a new video document
//     const newVideo = new Video({ title, description, filePath: videoPath });

//     // Save the video info to the database
//     await newVideo.save();

//     // Redirect the user to a custom page
//     // res.redirect('/custom-page');

//     res.status(201).json({ message: 'Video uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// }

// 

const uploadVideo = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error });
        } else {
          const file = new Video({
            filename: req.file.originalname,
            videoUrl: result.secure_url,
          });
          await file.save();
          res.status(201).json({ file });
        }
        console.log("result", result);
      }
    );

    console.log(stream.secure_url);

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


//

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
    const video = await Video.findByIdAndDelete(videoId);
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getSingleVideo,
  deleteVideo
};
