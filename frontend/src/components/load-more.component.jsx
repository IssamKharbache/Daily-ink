import React from "react";

const LoadMoreButton = ({ state, getData }) => {
  if (
    state.results &&
    state?.results.length !== 0 &&
    state?.results.length < state.totalDocs
  ) {
    const updateState = () => {
      console.log(state.user_id);
      getData({ page: state.page + 1 }); //
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
