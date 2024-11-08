import logo from "../imgs/dailylogo.png";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./seach-bar.component";
const Navbar = () => {
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
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i class="fi fi-tr-file-edit"></i>
            <p>Create your blog</p>
          </Link>
          <Link to="/sign-in" className="btn-dark py-2">
            Sign In
          </Link>
          <Link to="/sign-up" className="btn-light py-2 hidden md:flex">
            Sign up
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
