
const express = require('express');
const multer = require('multer');
const { uploadVideo, deleteVideo, getSingleVideo, getAllVideos , upload } = require("../controllers/videoController");

const router = express.Router();

router.post("/upload", upload.single('video'), uploadVideo);
router.get("/videos/:videoId", getSingleVideo);
router.get("/videos", getAllVideos);
router.delete("/videos/:videoId", deleteVideo)


/** @swagger
* /api/v1/upload:
*   post:
*     summary: Upload a video and obtain transcription
*     consumes:
*       - multipart/form-data
*     parameters:
*       - in: formData
*         name: file
*         type: file
*         required: true
*         description: The video file to upload.
*       - in: body
*         name: video
*         description: Video details.
*         required: false
*         schema:
*           type: object
*           properties:
*             title:
*               type: string
*               description: The title of the video.
*             description:
*               type: string
*               description: The description of the video.
*     responses:
*       201:
*         description: Video uploaded and transcribed successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 videoId:
*                   type: string
*                   description: The unique identifier of the video.
*                 title:
*                   type: string
*                   description: The title of the video.
*                 description:
*                   type: string
*                   description: The description of the video.
*                 filePath:
*                   type: string
*                   description: The URL or path to the uploaded video.
*                 videoData:
*                   type: string
*                   description: The video data in buffer format.
*                 transcript:
*                   type: object
*                   description: The transcription of the video.
*       400:
*         description: Bad request - no file uploaded.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Error message indicating no file was uploaded.
*       500:
*         description: Internal server error.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Error message describing the internal server error.
*/




/**
 * @swagger
 * /api/v1/videos:
 *   get:
 *     summary: Get all videos
 *     description: Retrieves all videos from the database.
 *     tags: [videos]
 *     responses:
 *       200:
 *         description: Videos retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videos:
 *                   type: array
 *                   items:
 *         
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   get:
 *     summary: Get a single video
 *     description: Retrieves a single video by its ID.
 *     tags: [videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: objectId
 *         description: The ID of the video to retrieve.
 *     responses:
 *       200:
 *         description: Video retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 video:
 *       
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   delete:
 *     summary: Delete a video by ID
 *     description: Delete a video by its unique video ID.
 *     tags: [videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: objectId
 *         description: The ID of the video to be deleted.
 *     responses:
 *       200:
 *         description: Video deleted successfully. This also returns the details of the deleted video.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the video was deleted.
 *                 video:
 *       
 *       404:
 *         description: Video not found. The specified video ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the video was not found.
 *       500:
 *         description: Internal server error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


module.exports = router;
