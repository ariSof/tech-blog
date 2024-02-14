const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route used to add a new comment /api/comment
router.post('/', withAuth, async (req, res) => {
    try {
        let user_id = req.session.user_id;
        let user_name;

        try {
            // Find the logged in user based on the session ID
            const userData = await User.findByPk(user_id);

            const user = userData.get({ plain: true });
            user_name = user.name;

            const newComment = await Comment.create({
                ...req.body,
                user_id,
                user_name,
            });
            res.status(200).json(newComment);

        } catch (err) {
            res.status(400).json(err);
        }

        //res.json(user)
    } catch (err) {
        res.status(500).json(err);
    }

});

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!postData) {
//       res.status(404).json({ message: 'No post found with this id!' });
//       return;
//     }

//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
