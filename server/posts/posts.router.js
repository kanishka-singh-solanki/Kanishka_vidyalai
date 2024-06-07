const express = require('express');
const { fetchPosts } = require('./posts.service');
const {fetchAlbum } = require('./posts.service'); //Task2
const { fetchUserById } = require('../users/users.service');
const { default: axios } = require('axios');    // Task2


const router = express.Router();

router.get('/', async (req, res) => {
  // const posts = await fetchPosts();

  // Task4
  const { start, limit } = req.query;
  const posts = await fetchPosts({ start, limit });
  // Task4

  // const postsWithImages = posts.reduce((acc, post) => {
  //   // TODO use this route to fetch photos for each post
  //   // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
  //   return [
  //     ...acc,
  //     {
  //       ...post,
  //       images: [
  //         { url: 'https://picsum.photos/200/300' },
  //         { url: 'https://picsum.photos/200/300' },
  //         { url: 'https://picsum.photos/200/300' },
  //       ],
  //     },
  //   ];
  // }, []);

  // Task 2
  
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      const images = await fetchAlbum(post.id);
  
      const processedPost = {
        ...post,
        images: images.map((image) => ({ url: image.thumbnailUrl })),
      };
      return processedPost;
    })
  );
  
  // Task 2

  res.json(postsWithImages);
});

module.exports = router;
