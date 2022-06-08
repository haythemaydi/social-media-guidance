const Post = require("../model/postModel");
const User = require("../model/userModel");
const createPost = async (req, res, next) => {
  const { post, user } = req.body;
  console.log("postuser", user);
  const PostBlog = new Post({
    post,
    user,
  });

  try {
    await PostBlog.save();
  } catch (error) {
    console.log("error on the add event", error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ PostBlog });
};
const getAllPost = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find().populate({
      path: "user",
      select: " username selectedRole selectedFile",
    });
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(404).json({ message: "not found blog" });
  }
  return res.status(200).json({ posts });
};
exports.createPost = createPost;
exports.getAllPost = getAllPost;
