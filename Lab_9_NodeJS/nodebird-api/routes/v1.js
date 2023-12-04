const express = require('express');

const { verifyToken,deprecated } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();

router.use(deprecated);

// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);


router.get('/posts/my', verifyToken, getMyPosts);

router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

// router.get('/follow', verifyToken, async (req, res) => { // when get, get the following and follower
//     try {
//         const user = await User.find({ where: { id: req.decoded.id } });
//         const follower = await user.getFollowers();
//         const following = await user.getFollowings();
//         return res.json({
//             code: 200,
//             follower,
//             following,
//         })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             code: 500,
//             message: 'server error',
//         });
//     }
// });

module.exports = router;
