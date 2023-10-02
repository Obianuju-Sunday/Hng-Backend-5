
const express = require('express');
const multer = require('multer');
const { uploadVideo, deleteVideo, getSingleVideo } = require("../controllers/videoController");

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Upload a video
router.post("/upload", upload.single('video'), uploadVideo); 

// Get a single video by ID
router.get("/videos/:videoId", getSingleVideo);

router.delete("/videos/:videoId", deleteVideo)

module.exports = router;

