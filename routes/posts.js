const express = require("express");
const router = express.Router();
const request = require('request');
const Post = require('../models/Post');

const newPost = async (req, res) => {
  console.log('hiiiii')
  const { imageURL, caption } = req.body;
  console.log(imageURL);
  console.log(caption);
  const post = new Post({
    url : imageURL,
    caption : caption
  });
  console.log(post);

  try {
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post successfully added!",
      data: post,
    });
    // console.log(result);
  } catch (err) {
    console.log(err);
    if (
      err.message.includes("duplicate")
    ) {
      return res.status(400).json({
        success: false,
        message: "A post with that name already exists.",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}



router.post("/new-post", newPost);


module.exports = router;