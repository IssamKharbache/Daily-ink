import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";

export const createBlog = async (req, res) => {
  const userAuthId = req.user;
  const {
    title,
    content,
    banner,
    tags,
    description,
    draft = undefined,
  } = req.body;
  //validate the data
  if (!title.length) {
    return res.status(403).json({ error: "title is required" });
  }
  if (!description.length || description.length > 200) {
    return res.status(403).json({
      error: "Description is required and should be less than 200 characters",
    });
  }
  if (!banner.length) {
    return res.status(403).json({ error: "Banner is required" });
  }
  if (!content.blocks.length) {
    res.status(403).json({ error: "Content is required to publish a blog" });
  }
  if (!tags.length || tags.length > 5) {
    return res
      .status(403)
      .json({ error: "Tags should be less than 5  and are required" });
  }
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  //
  const blog_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  try {
    const blog = new Blog({
      blog_id,
      title,
      banner,
      description,
      author: userAuthId,
      content,
      tags: lowerCaseTags,
      draft: Boolean(draft),
    });

    const savedBlog = await blog.save();
    if (savedBlog) {
      let incerementValue = draft ? 0 : 1;
      const updateUser = await User.findOneAndUpdate(
        { _id: userAuthId },
        {
          $inc: {
            "account_info.total_posts": incerementValue,
          },
          $push: {
            blogs: savedBlog._id,
          },
        }
      );
      return res.status(200).json({ id: savedBlog.blog_id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internale error" });
  }
};
