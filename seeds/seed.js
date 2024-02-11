const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

//   for (const post of postData) {
//     await Post.create({
//       ...post,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }
  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);


  process.exit(0);
};

seedDatabase();

// await sequelize.sync({ force: true });

//     const users = await User.bulkCreate(userData, {
//         individualHooks: true,
//         returning: true,
//     });

    
//     await Hike.bulkCreate(hikeData);
    
//     await Image.bulkCreate(imageData);

//     await Comment.bulkCreate(commentData);
