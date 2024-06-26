
const express = require('express');
const { uploadVideo, deleteVideo, getSingleVideo, getAllVideos, upload } = require("../controllers/videoController");

const router = express.Router();

/** @swagger
* /api/v1/upload:
*   post:
*     summary: Upload a video and obtain transcription
*     tags: [videos]
*     consumes:
*       - multipart/form-data
*     parameters:
*       - in: formData
*         name: video
*         type: file
*         required: true
*     description: The video file to upload. Maximum file size is 3MB.
*     responses:
*       201:
*         description: Video is uploaded and transcribed successfully. Returns video details and transcripts
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 videoId:
*                   type: string
*                   description: The unique identifier of the video.
*                 transcript:
*                   type: object
*                   description: The transcription of the video.
*       400:
*         description: Bad request - no file uploaded or file size exceeds 3MB. You may also receive an error like 'Required field is not provided'
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
router.post("/upload", upload.single('video'), uploadVideo);


/**
 * @swagger
 * /api/v1/videos:
 *   get:
 *     summary: Get all videos
 *     description: Retrieves all videos from the database.
 *     tags: [videos]
 *     responses:
 *       200:
 *         description: Videos retrieved successfully. OR No video found.
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
router.get("/videos", getAllVideos);


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
 *         description: Video retrieved successfully. Returns details of the videoId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 video:
 * 
 *       404:
 *          description: Video not found. The specified video ID does not exist in the db.
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the video was not found.
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
router.get("/videos/:videoId", getSingleVideo);


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
 *         description: Video deleted successfully.
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
 *         description: Video not found. The specified video ID does not exist in the db.
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
router.delete("/videos/:videoId", deleteVideo)



module.exports = router;
