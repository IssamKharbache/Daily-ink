import React, { useContext, useEffect, useRef, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { FcLike } from "react-icons/fc";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useLocation } from "react-router-dom";
import ShareBlogModal from "./modals/ShareBlogModal";

const BlogInteractions = () => {
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
  const location = useLocation();

  const modalRef = useRef(null);
  ///
  const [openModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    const closeHandler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener("mousedown", closeHandler);
    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  });

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
          <button
            onClick={() => setIsOpenModal(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full  bg-grey/70 group/share  "
          >
            <i class="fi fi-rr-share group-hover/share:text-blue"></i>
          </button>
          <ShareBlogModal
            setIsOpenModal={setIsOpenModal}
            openModal={openModal}
            urlToShare={`${import.meta.env.VITE_FRONTEND_URL}${
              location.pathname
            }`}
          />
        </div>
      </div>
      <hr className="border-grey my-4" />
    </>
  );
};

export default BlogInteractions;
