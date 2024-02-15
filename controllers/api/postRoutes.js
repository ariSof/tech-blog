const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route used to add a new post /api/posts
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route used to update post /api/posts/:id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        date_created: req.body.date_created
      },
      { 
        where: {id: req.params.id}
      },
      {
        user_id: req.session.user_id,
      }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route used to delete a post /api/posts/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    //res.status(200).json(postData);
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
