const express = require('express');
const { searchByHashtag, getMyPosts, test, getFollow } = require('../controllers');

const router = express.Router();

// POST /test
router.get('/', async (req, res) => {
    res.send('<h1>NodeCat</h1>');
})
router.get('/test', test);
router.get('/myposts', getMyPosts);

router.get('/search/:hashtag', searchByHashtag);

router.get('/follow', getFollow);

module.exports = router;
