import React, { useContext, useEffect, useRef, useState } from "react";
import { BlogContext } from "../context/BlogContext";

import { Link, useLocation } from "react-router-dom";
import ShareBlogModal from "./modals/ShareBlogModal";

import { UserContext } from "../context/UserContext";
import { useOutsideClick } from "../../libs/utils/utils";

const BlogInteractions = () => {
  //blog context
  const {
    blog: {
      blog_id,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    setBlog,
  } = useContext(BlogContext);
  //user auth context
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
              className="flex items-center btn-light py-2 text-center rounded-md gap-2"
            >
              Edit
              <i className="fi fi-rr-pencil"></i>
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
