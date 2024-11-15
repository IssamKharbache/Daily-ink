import React from "react";

import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatToDate } from "../../libs/utils/utils";

const BlogPost = ({ content, author }) => {
  const {
    title,
    banner,
    description,
    tags,
    publishedAt,
    activity: { total_likes },
    blog_id: id,
  } = content;
  const { fullname, username, profile_img } = author;
  return (
    <Link
      to={`/blogs/${id}`}
      className="flex gap-8 items-center hover:bg-grey/30 border-b-2 border-grey group"
    >
      <div className="h-56 aspect-square bg-grey">
        <img
          src={banner}
          alt="blog-banner"
          className="h-full w-full aspect-square  object-cover rounded opacity-80 group-hover:opacity-100 duration-200  "
        />
      </div>
      <div className="w-full  p-4   gap-4  ">
        <h1 className="text-4xl my-3 capitalize font-bold ">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-7 ">
          <span className="bg-grey/80 py-1 px-4 inline-block rounded-full text-black">
            {" "}
            {tags[0]}
          </span>
          <span className="ml-3 flex items-center gap-2 font-inter text-dark-grey/70">
            <HeartIcon size={18} />
            {total_likes}
          </span>
        </div>
        <div className="flex gap-5 items-center mt-8  ">
          <img
            src={profile_img}
            alt="blog-banner"
            className="object-cover w-9 h-9 rounded-full "
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

export default BlogPost;
