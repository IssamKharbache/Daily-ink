export const formatPaginationData = async ({
  create_new_arr = false,
  state = { results: [], page: 1, totalDocs: 0 },
  data,
  page,
  countRoute,
  data_to_send,
}) => {
  let object;

  if (state?.results && !create_new_arr) {
    object = {
      ...state,
      results: [...state.results, ...data],
      page,
    };
  } else {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/${countRoute}`, data_to_send)
      .then((res) => {
        object = {
          results: data,
          page: 1,
          totalDocs: res.data.totalDocs,
        };
      })
      .catch((error) => console.log(error.message));
  }
  return object;
};
