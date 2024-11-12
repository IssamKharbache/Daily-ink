import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/dailylogo.png";
import { EditorContext } from "../context/EditorContext";

const EditorNavbar = () => {
  const { editorTitle } = useContext(EditorContext);
  return (
    <nav className="navbar justify-normal">
      <Link to="/" className="flex-none w-28  object-contain">
        <img src={logo} className="w-full" alt="logo" />
      </Link>
      <p className="max-md:hidden text-black line-clamp-1  w-full capitalize">
        {editorTitle}
      </p>
      {/* buttons */}
      <div className="flex gap-4 ml-auto items-center ">
        <button className="btn-dark py-3">Publish</button>
        <button className="btn-dark-border py-2">Save draft</button>
      </div>
    </nav>
  );
};

export default EditorNavbar;
