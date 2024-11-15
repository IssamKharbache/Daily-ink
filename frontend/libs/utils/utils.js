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
