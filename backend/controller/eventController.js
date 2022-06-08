const EventBlog = require("../model/BlogEvent");
const User = require("../model/userModel");
const getAllEvent = async (req, res, next) => {
  let blogs;
  try {
    blogs = await EventBlog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "not found blog" });
  }
  return res.status(200).json({ blogs });
};
const addEvent = async (req, res, next) => {
  const { date, time, address, description, image } = req.body;

  const blog = new EventBlog({
    date,
    time,
    address,
    description,
    image,
  });

  try {
    await blog.save();
  } catch (error) {
    console.log("error on the add event", error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ blog });
};

const updateEvent = async (req, res, next) => {
  const { blogId, user } = req.body;
  let blog;
  try {
    blog = await EventBlog.findByIdAndUpdate(
      blogId,
      {
        $push: { interested: user },
      },
      {
        new: true,
      }
    ).populate({ path: "user", select: "username" });
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "unable to update" });
  }
  return res.status(200).json({ blog });
};

const NotInterestedEvent = async (req, res, next) => {
  const { blogId, user } = req.body;
  let blog;
  try {
    blog = await EventBlog.findByIdAndUpdate(
      blogId,
      {
        $pull: { interested: user },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "unable to update" });
  }
  return res.status(200).json({ blog });
};
/*const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await EventBlog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "no blog found" });
  }
  return res.status(200).json({ blog });
};
const deleteEvent = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await EventBlog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return res.status(500).json({ message: "blog not deleted" });
  }
  return res.status(200).json({ message: "blog deleted successfully" });
};
const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "no blog found" });
  }
  return res.status(200).json({ userBlogs });
};*/
exports.getAllEvent = getAllEvent;
exports.addEvent = addEvent;
exports.updateEvent = updateEvent;
exports.NotInterestedEvent = NotInterestedEvent;
/*exports.getById = getById;
exports.deleteEvent = deleteEvent;
exports.getByUserId = getByUserId;*/
