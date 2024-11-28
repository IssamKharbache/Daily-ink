import logo from "../imgs/dailylogo.png";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./seach-bar.component";
import { useContext, useState } from "react";

import UserDropDown from "./user-navigation.component";
import { UserContext } from "../context/UserContext";
import { EditorContext } from "../context/EditorContext";
const Navbar = () => {
  const {
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const { setBlog } = useContext(EditorContext);
  //dropdown state

  const [showDropDown, setShowDropDown] = useState(false);
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  //click outside
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropDown(false);
    }, 200);
  };
  return (
    <>
      <nav className="navbar">
        {/* logo */}
        <Link to="/" className="flex-none w-28  object-contain">
          <img src={logo} className="w-full" />
        </Link>
        {/* search bar */}
        <SearchBar />
        {/* menu */}
        <div className="flex gap-4 items-center">
          <Link
            onClick={() => setBlog({ title: "", banner: "", content: "" })}
            to="/editor"
            className="flex items-center gap-4    px-7  py-2 hover:bg-grey  rounded-full text-center "
          >
            <i className="fi fi-tr-file-edit"></i>
            <p>Create your blog</p>
          </Link>
          {
            //check if user is logged in
            access_token ? (
              <>
                <Link to="/dashboard/notifications">
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                    <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                  </button>
                </Link>
                <div
                  className="relative"
                  onClick={toggleDropDown}
                  onBlur={handleBlur}
                >
                  <button className="w-12 h-12 mt-1">
                    <img
                      src={profile_img}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                  {showDropDown && <UserDropDown />}
                </div>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="btn-dark py-2">
                  Sign In
                </Link>
                <Link to="/sign-up" className="btn-light py-2 hidden md:flex">
                  Sign up
                </Link>
              </>
            )
          }
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
