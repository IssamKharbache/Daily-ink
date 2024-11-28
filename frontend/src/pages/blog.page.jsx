import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import LoaderSpinner from "../components/loader.component";
import NoDataFoundMessage from "../components/nodata.component";
import { formatToDate } from "../../libs/utils/utils";
import BlogInteractions from "../components/blog-interaction.component";
import { BlogContext } from "../context/BlogContext";
import BlogPost from "../components/blog-post.component";
import { FrownIcon } from "lucide-react";
import BlogContentBlock from "../components/blog-content.component";

import BlogContent from "../components/blog-content.component";

export let blogStructure = {
  title: "",
  description: "",
  content: [],
  tags: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
  activity: {},
};

const DetailedBlogPage = () => {
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState(blogStructure);
  const [isBlogLoading, setIsBlogLoading] = useState(false);

  const [similarBlogs, setSimilarBlogs] = useState([]);

  const {
    title,
    content,
    banner,
    author: {
      personal_info: { fullname, username: author_username, profile_img },
      description,
    },
    publishedAt,
  } = blogDetails;

  const getDetailedBlog = async () => {
    setIsBlogLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/get-blog`,
        {
          blogId,
        }
      );
      if (response.statusText === "OK") {
        const tag = response.data.singleBlog.tags[0];
        const blog = response.data.singleBlog;
        setBlogDetails(blog);
        blogStructure = blog;

        const {
          data: { filteredBlogs: similarBlogs },
        } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/blog/filter`,
          { category: tag, limit: 6, eliminateBlog: blogId }
        );
        if (similarBlogs) {
          setSimilarBlogs(similarBlogs);
        }
      }
    } catch (error) {
      setIsBlogLoading(false);
      console.log(error.message);
    }
  };
  const resetState = () => {
    setSimilarBlogs([]);
    setBlogDetails(blogStructure);
    setIsBlogLoading(false);
  };
  useEffect(() => {
    resetState();
    getDetailedBlog();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [blogId]);

  return (
    <AnimationWrapper>
      {isBlogLoading && <LoaderSpinner />}
      {!isBlogLoading && !blogDetails && (
        <NoDataFoundMessage message="Ooops . this blog doesn't exist :(" />
      )}
      <div className="max-w-[900px] center py-10 max-lg:px-[5vw] ">
        <img src={banner} alt="blog banner" className="aspect-video rounded" />
        <p className="flex gap-2 justify-end text-dark-grey font-inter  mt-4 text-sm md:text-xl ">
          Posted on
          <span className="font-semibold font-inter text-sm md:text-xl">
            {formatToDate(publishedAt)}
          </span>
        </p>
        <div className="mt-8">
          <h2>{title}</h2>
        </div>
        <div className="flex mt-4 max-sm:flex-col justify-between">
          <div className="flex items-center gap-6 ">
            <Link to={`/user/${author_username}`}>
              <img
                src={profile_img}
                alt="user avatar"
                className="w-12 h-12 rounded-full"
              />
            </Link>

            <h1 className="capitalize text-2xl font-bold">
              {fullname}
              <br />
              <span className="font-normal text-dark-grey ">@</span>
              <Link
                to={`/user/${author_username}`}
                className="underline font-normal text-dark-grey hover:text-black group/link"
              >
                {author_username}
              </Link>
            </h1>
          </div>
        </div>
        <BlogInteractions />

        {/* content here */}
        <div className="my-12 font-gelasio blog-page-content">
          {content.length &&
            content[0].blocks.map((block, i) => {
              return (
                <div className="my-4 md:my-8" key={i}>
                  <BlogContentBlock block={block} />
                </div>
              );
            })}
        </div>
        <BlogInteractions />

        {similarBlogs && similarBlogs.length > 0 ? (
          <>
            <h1 className="text-2xl md:text-4xl mt-14 mb-10 font-medium">
              Similar Blogs
            </h1>
            {similarBlogs.map((blog, id) => {
              const {
                author: { personal_info },
              } = blog;
              return (
                <AnimationWrapper
                  key={id}
                  className="mt-4"
                  transition={{ duration: 1, delay: id * 0.08 }}
                >
                  <BlogPost content={blog} author={personal_info} />
                </AnimationWrapper>
              );
            })}
          </>
        ) : (
          <h1 className="flex flex-col gap-4 justify-center items-center text-2xl md:text-4xl mt-14 mb-10 font-medium text-center text-dark-grey bg-grey rounded py-4">
            <FrownIcon size={70} />
            No similar blogs found
          </h1>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default DetailedBlogPage;
