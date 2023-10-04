
const express = require('express');
const multer = require('multer');
const { uploadVideo, deleteVideo, getSingleVideo, getAllVideos } = require("../controllers/videoController");

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Upload a video
router.post("/upload", upload.single('video'), uploadVideo); 

// Get a single video by ID
router.get("/videos/:videoId", getSingleVideo);

router.get("/videos", getAllVideos);

router.delete("/videos/:videoId", deleteVideo)

module.exports = router;

