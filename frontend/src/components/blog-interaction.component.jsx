import React, { useContext, useEffect, useRef, useState } from "react";
import { BlogContext } from "../context/BlogContext";

import { Link, useLocation } from "react-router-dom";
import ShareBlogModal from "./modals/ShareBlogModal";

import { Edit2 } from "lucide-react";

import { useOutsideClick } from "../../libs/utils/utils";
import { UserContext } from "../context/UserContext";

const BlogInteractions = () => {
  //blog context
  const {
    singleBlog: {
      blog_id,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
  } = useContext(BlogContext);

  const {
    userAuth: { username },
  } = useContext(UserContext);

  const location = useLocation();
  //modal ref and state
  const modalRef = useRef(null);
  const [openModal, setIsOpenModal] = useState(false);

  // custom hook to close modal when clicked outside

  useOutsideClick(modalRef, setIsOpenModal);

  return (
    <>
      <hr className="border-grey my-4" />
      <div className="flex justify-between ">
        <div className="flex gap-6">
          {/* like button */}
          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/70  group/like">
              <i className="fi fi-rr-social-network group-hover/like:text-twitter"></i>
            </button>
            <p className="text-xl text-dark-grey font-inter">{total_likes}</p>
          </div>
          {/* comment button */}
          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/70  group/comment">
              <i className="fi fi-rr-comment-alt-dots group-hover/comment:text-purple"></i>
            </button>
            <p className="text-xl text-dark-grey font-inter ">
              {total_comments}
            </p>
          </div>
        </div>
        {/*  */}
        <div ref={modalRef} className="flex gap-6 items-center ">
          {username === author_username && (
            <Link
              to={`/editor/${blog_id}`}
              className="flex items-center gap-4    px-7 rounded py-1 border-dark-grey hover:bg-grey :text-white border  group/share  "
            >
              Edit
              <Edit2 size={15} />
            </Link>
          )}

          <>
            <button
              onClick={() => setIsOpenModal(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full  bg-grey/70 group/share  "
            >
              <i className="fi fi-rr-share group-hover/share:text-blue"></i>
            </button>
            <ShareBlogModal
              setIsOpenModal={setIsOpenModal}
              openModal={openModal}
              urlToShare={`${import.meta.env.VITE_FRONTEND_URL}${
                location.pathname
              }`}
            />
          </>
        </div>
      </div>
      <hr className="border-grey my-4" />
    </>
  );
};

export default BlogInteractions;
