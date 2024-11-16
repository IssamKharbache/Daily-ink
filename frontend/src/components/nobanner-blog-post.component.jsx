import React from "react";
import { Link } from "react-router-dom";
import { formatToDate } from "../../libs/utils/utils";

const NoBannerBlogPost = ({ blog, index, className }) => {
  const {
    title,
    blog_id: id,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    publishedAt,
  } = blog;
  return (
    <Link
      to={`/blogs/${id}`}
      className={`flex gap-5  items-center border-b-2 border-grey group hover:bg-grey/30 ${
        className ?? ""
      } `}
    >
      <h1 className="blog-index">{index < 5 ? "0" + (index + 1) : index}</h1>
      <div className="w-full  p-4   gap-4  ">
        <h1 className="text-3xl md:text-4xl my-3 capitalize font-bold  ">
          {title}
        </h1>

        <div className="flex flex-wrap   gap-2 md:gap-5 items-center mt-8  ">
          <img
            src={profile_img}
            alt="blog-banner"
            className="object-cover w-6 h-6 rounded-full "
          />
          <p className="line-clamp-1 capitalize font-bold text-xl ">
            {fullname}
          </p>
          <p className="text-md text-dark-grey/70">@{username}</p>
          <p className="min-w-fit font-inter text-sm text-dark-grey/50">
            {formatToDate(publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NoBannerBlogPost;
