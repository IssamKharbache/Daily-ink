import React from "react";

const LoadMoreButton = ({ state, getData }) => {
  if (state.length != 0 && state?.results.length < state.totalDocs) {
    return (
      <button
        onClick={() => getData({ page: state.page + 1 })}
        className="btn-dark rounded-full mt-4 justify-end"
      >
        Load more
      </button>
    );
  }
};

export default LoadMoreButton;
