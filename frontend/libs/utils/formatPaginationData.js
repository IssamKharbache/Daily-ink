import axios from "axios";

export const formatPaginationData = async ({
  createNewArray,
  state,
  data,
  page,
  countRoute,
  data_to_send,
}) => {
  let obj;
  if (state.length != 0 && !createNewArray) {
    obj = { ...state, results: [...state.results, ...data] };
  } else {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/${countRoute}`, data_to_send)
      .then(({ data: { totalDocs } }) => {
        obj = { results: data, page: 1, totalDocs };
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return obj;
};
