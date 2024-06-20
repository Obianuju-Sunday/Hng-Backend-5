
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





/**
 * @swagger
 * api/v1/videos/{videoId}:
 *   delete:
 *     summary: Delete a video by ID.
 *     description: Delete a video by its unique video Id.
 *     tags: [videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the video to be deleted.
 *     responses:
 *       200:
 *         description: video deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the video was deleted.
 *                 videos:
 *                   type: array
 *                   description: An array of remaining videos after the deletion.
 *       404:
 *         description: video not found. The specified video ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the video was not found.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.delete("/videos/:videoId", deleteVideo)

module.exports = router;

