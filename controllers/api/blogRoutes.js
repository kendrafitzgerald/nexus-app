const router = require('express').Router();
const { blogPosts, comments, users } = require('../../models');

// GET a single blogpost
router.get('/:id', async (req, res) => {
  try {
    const blogpostData = await blogPosts.findByPk(req.params.id, {
      // JOIN with comments and users
      include: [{ model: comments }, { model: users }]
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a blogpost
router.post('/', async (req, res) => {
  try {
    const blogpostData = await blogPosts.create(req.body);
    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a blogpost
router.delete('/:id', async (req, res) => {
  try {
    const blogpostData = await blogPosts.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;