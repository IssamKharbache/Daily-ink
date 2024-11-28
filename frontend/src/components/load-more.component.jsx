import React from "react";

const LoadMoreButton = ({ state, getData }) => {
  if (
    state.results &&
    state?.results.length !== 0 &&
    state?.results.length < state.totalDocs
  ) {
    const updateState = () => {
      getData({ page: state.page + 1 }); //
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    return (
      <button
        onClick={updateState}
        className="btn-dark rounded-full mt-4 justify-end"
      >
        Load more
      </button>
    );
  }
};

export default LoadMoreButton;
