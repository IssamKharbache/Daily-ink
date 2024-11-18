import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { deleteFromLocalStorage } from "../common/session";

const UserDropDown = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const signOut = () => {
    deleteFromLocalStorage("user");
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
          className="flex  gap-2 link md:hidden pl-8 py-4 rounded-none border-b border-dark-grey/10 "
        >
          <i className="fi fi-rr-magic-wand"></i>
          <span>Create a blog</span>
        </Link>
        <Link
          to={`/user/${username}`}
          className="flex items-center gap-2 link pl-8 py-4 rounded-none border-b border-dark-grey/10 "
        >
          <i className="fi fi-rs-user"></i>
          <span>Profile</span>
        </Link>
        <Link
          to={`dashboard/blogs`}
          className="flex items-center gap-2 link pl-8 py-4 rounded-none border-b border-dark-grey/10"
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
          className="flex items-center gap-4 link pl-8 py-4 rounded-none w-full bg-slate/50 hover:bg-slate/80 "
        >
          <i className="fi fi-rr-exit"></i>
          <div className="flex flex-col justify-start  ">
            <span className="text-start">Logout</span>
            <p className="text-md font-bold text-dark-grey break-words line-clamp-1">
              @{username}
            </p>
          </div>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserDropDown;
