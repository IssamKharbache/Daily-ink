import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";

//create blog route
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
  if (!draft) {
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
    if (!description.length || description.length > 200) {
      return res.status(403).json({
        error: "Description is required and should be less than 200 characters",
      });
    }
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
// get blogs route
export const getLatestBlogs = async (req, res) => {
  const { page } = req.body;
  let maxBlogs = 5;
  try {
    const allBlogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .sort({ publishedAt: -1 })
      .select(
        "title banner description author blog_id tags activity publishedAt -_id"
      )
      .skip((page - 1) * maxBlogs)
      .limit(maxBlogs);
    return res.status(200).json({ latestBlogs: allBlogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internale server error" });
  }
};

// get popular blogs route
export const getPopularBlogs = async (req, res) => {
  let maxBlogs = 5;
  try {
    const popularBlogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .sort({
        "activity.total_read": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("title   blog_id  publishedAt -_id")
      .limit(maxBlogs);
    return res.status(200).json({ popularBlogs });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internale server error" });
  }
};

export const getBlogByCategory = async (req, res) => {
  const { category, page } = req.body;

  const findQuery = {
    tags: category,
    draft: false,
  };
  const maxBlogs = 5;
  try {
    const filteredBlogs = await Blog.find(findQuery)
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .sort({ publishedAt: -1 })
      .select(
        "title banner description author blog_id tags activity publishedAt -_id"
      )
      .skip((page - 1) * maxBlogs)
      .limit(maxBlogs);

    return res.status(200).json({ filteredBlogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internale server error" });
  }
};
export const latestBlogsCount = async (req, res) => {
  Blog.countDocuments({ draft: false })
    .then((total) => {
      return res.status(200).json({ totalDocs: total });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

export const getBlogByCategoryCount = async (req, res) => {
  const { category } = req.body;
  const findQuery = {
    tags: category,
    draft: false,
  };
  Blog.countDocuments(findQuery)
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

export const searchBlogs = async (req, res) => {
  const { query, page } = req.body;

  const searchQuery = {
    draft: false,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  };
  const limit = 5;
  try {
    const searchedBlogs = await Blog.find(searchQuery)
      .sort({ publishedAt: -1 })
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .select(
        "title banner description author blog_id tags activity publishedAt -_id"
      );
    if (!searchedBlogs) {
      return res.status(200).json({ searchedBlogs: [] });
    }
    return res.status(200).json({ searchedBlogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const searchBlogsCount = async (req, res) => {
  const { query } = req.body;
  const searchQuery = {
    draft: false,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  };
  try {
    const searchedBlogs = await Blog.countDocuments(searchQuery);
    return res.status(200).json({ totalDocs: searchedBlogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.body;
  try {
    const users = await User.find({
      "personal_info.fullname": {
        $regex: query,
        $options: "i",
      },
      "personal_info.username": {
        $regex: query,
        $options: "i",
      },
    })
      .limit(50)
      .select(
        "personal_info.fullname personal_info.username personal_info.profile_img -_id"
      );
    if (!users) {
      return res.status(200).json({ searchedUsers: [] });
    }
    return res.status(200).json({ searchedUsers: users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
