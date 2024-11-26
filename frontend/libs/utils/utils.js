import { useEffect } from "react";

export const formatToDate = (dateString) => {
  const date = new Date(dateString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Return the formatted date
  return date.toLocaleDateString("en-US", options);
};

export const checkNumberOfBlogsandReads = (text, number) => {
  if (text === "blogs") {
    if (number === 1) {
      return `${number.toLocaleString()} Blog`;
    } else {
      return `${number.toLocaleString()} Blogs`;
    }
  } else {
    if (number === 1) {
      return `${number.toLocaleString()} Read`;
    } else {
      return `${number.toLocaleString()} Reads`;
    }
  }
};

export const useOutsideClick = (modalRef, setIsOpenModal) => {
  useEffect(() => {
    const closeHandler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpenModal(false);
      }
    };

    document.addEventListener("mousedown", closeHandler);

    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  });
};
