const router = require('express').Router();
const { Comments, BlogPost, User } = require('../../models');
const withAuth = require('../../utils/withAuth');

// CREATE a comment
router.post('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.userId
            }

        });
        const userID = userData.id

        const blogpostData = await BlogPost.findOne({
            where: {
                id: req.params.id
            }

        });
        const blogpostID = blogpostData.id

        const newComment = await Comments.create({
            content: req.body.content,
            blogpost_id: blogpostID,
            user_id: userID
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err)
    }
});



// DELETE a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.userId
            }

        });
        const userID = userData.id

        const blogpostData = await BlogPost.findOne({
            where: {
                id: req.params.id
            }

        });
        const blogpostID = blogpostData.id

        const newComment = await Comments.destroy({
            content: req.body.content,
            blogpost_id: blogpostID,
            user_id: userID
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;