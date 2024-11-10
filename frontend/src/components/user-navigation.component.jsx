import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { deleteFromSession } from "../common/session";

const UserDropDown = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const signOut = () => {
    deleteFromSession("user");
    setUserAuth({ access_token: null });
  };
  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-2 z-50"
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200 rounded">
        <Link
          to="/editor"
          className="flex  gap-2 link md:hidden pl-8 py-4 rounded-none"
        >
          <i className="fi fi-rr-magic-wand"></i>
          <span>Create a blog</span>
        </Link>
        <Link
          to={`/user/${username}`}
          className="flex items-center gap-2 link pl-8 py-4 rounded-none"
        >
          <i className="fi fi-rs-user"></i>
          <span>Profile</span>
        </Link>
        <Link
          to={`dashboard/blogs`}
          className="flex items-center gap-2 link pl-8 py-4 rounded-none"
        >
          <i className="fi fi-rr-blog-text"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/settings/edit-profile"
          className="flex items-center gap-2 link pl-8 py-4 rounded-none"
        >
          <i className="fi fi-rr-settings-sliders"></i>
          <span>Settings</span>
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          onClick={signOut}
          type="button"
          className="link pl-8 py-4 rounded-none w-full bg-slate/50 hover:bg-slate/80"
        >
          <div className="flex items-center  gap-2 ">
            <i className="fi fi-rr-exit"></i>
            <span>Logout</span>
          </div>
          <p className="text-md font-bold text-dark-grey break-words line-clamp-1">
            @{username}
          </p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserDropDown;
