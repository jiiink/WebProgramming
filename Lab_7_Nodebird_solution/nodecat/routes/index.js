const express = require('express');
const { searchByHashtag, getMyPosts } = require('../controllers');
// const { test } = require('../controllers');/

const router = express.Router();

router.get('/myposts', getMyPosts);
router.get('/search/:hashtag', searchByHashtag);
// POST /test
// router.get('/test', test);

module.exports = router;
