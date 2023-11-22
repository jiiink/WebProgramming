const express = require('express');

const { verifyToken } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');
const { apiLimiter, deprecated } = require('../middlewares/index');


const router = express.Router();

// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);

router.get('/posts/my', verifyToken, getMyPosts);

router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;
