import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  //search bar states
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const inputRef = useRef(null);
  const handleSearchBarVisibility = () => {
    setSearchBarVisibility(!searchBarVisibility);
    inputRef.current.focus();
  };
  //search bar function
  const handleSearch = (e) => {
    const query = e.target.value;
    if (e.keyCode === 13 && query.length > 0) {
      if (query.length > 0) {
        navigate(`/search/${query}`);
        e.target.value = "";
      }
    }
  };
  const handleSearchMobile = () => {
    const query = inputRef.current.value;
    if (query.length > 0) {
      navigate(`/search/${query}`);
      inputRef.current.value = "";
      setSearchBarVisibility(false);
    }
  };
  return (
    <>
      <div
        className={`motion-preset-expand ${
          searchBarVisibility
            ? "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:block md:border-0 md:relative md:top-0 md:mt-0 md:w-auto md:p-0"
            : "relative hidden md:block"
        }`}
      >
        <input
          ref={inputRef}
          onKeyDown={handleSearch}
          type="text"
          placeholder="Search..."
          className="relative w-full md:w-auto bg-grey p-4 pl-8 md:pl-12  md:pr-6 rounded-full placeholder:text-black/60 input
          pe-24 md:pe-16"
        />
        <i
          onClick={handleSearchBarVisibility}
          className="fi fi-rr-circle-xmark absolute right-[10%]  top-1/2 -translate-y-1/2 text-xl   md:pointer-events-none ps-3 md:hidden text-red"
        ></i>
        <i
          onClick={handleSearchMobile}
          className="fi fi-rr-search absolute right-[18%] md:left-2 top-1/2 -translate-y-1/2 text-xl  md:pointer-events-none  ps-3 "
        ></i>
      </div>
      {/* toggle search button */}
      <div className="block md:hidden">
        <button
          onClick={handleSearchBarVisibility}
          className="flex items-center justify-center  h-12 w-12 rounded-full bg-black/80 hover:bg-black"
        >
          <i className="fi fi-rr-search  pointer-events-none text-white"></i>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
