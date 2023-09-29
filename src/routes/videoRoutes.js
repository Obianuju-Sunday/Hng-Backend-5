
const express = require('express');
const multer = require('multer');
const { uploadVideo, getAllVideos, renderVideo } = require("../controllers/videoController");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload a video
router.post("/upload", upload.single('video'), uploadVideo);


// Get every video
router.route("/videos")
    .get(getAllVideos)

// Render a particular video on a page by its id
router.route("/videos/:videoId")
    .get(renderVideo)


module.exports = router;




















// app.use(express.json());

// app.post('/upload', (req, res) => {
//   // Handle the video data received in the request body
//   const videoData = req.body;

//   // Implement code to save the video data to disk
//   // You can use Node.js's file system (fs) module for this
//   // For example: fs.writeFileSync('path/to/save/video.mp4', videoData);

//   // Respond with a success message or any necessary data
//   res.status(200).json({ message: 'Video uploaded successfully' });
// });


// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'videos')); // Specify the upload directory
//     },
//     filename: (req, file, cb) => {
//         const videoId = Date.now(); // Generate a unique ID for the video
//         cb(null, `${videoId}.mp4`);
//     },
// });

// const upload = multer({ storage });

// // Serve HTML for video playback
// app.get('/play/:videoId', (req, res) => {
//     const videoId = req.params.videoId;
//     const videoPath = path.join(__dirname, 'videos', `${videoId}.mp4`);

//     if (fs.existsSync(videoPath)) {
//         res.send(`
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Video Playback</title>
//             </head>
//             <body>
//                 <video controls>
//                     <source src="/videos/${videoId}.mp4" type="video/mp4">
//                     Your browser does not support the video tag.
//                 </video>
//             </body>
//             </html>
//         `);
//     } else {
//         res.status(404).send('Video not found');
//     }
// });

// // Handle video uploads using multer
// app.post('/upload', upload.single('video'), (req, res) => {
//     // Check if a file was uploaded
//     if (!req.file) {
//         return res.status(400).send('No file was uploaded.');
//     }

//     const videoId = path.parse(req.file.filename).name; // Extract video ID from the filename

//     // Redirect to the video playback page
//     res.redirect(`/play/${videoId}`);
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


