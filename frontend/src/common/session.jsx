//store in session storage function
const storeInSession = (key, value) => {
  return sessionStorage.setItem(key, value);
};

//get from session storage function
const lookInSession = (key) => {
  return sessionStorage.getItem(key);
};

//delete from session storage function
const deleteFromSession = (key) => {
  return sessionStorage.removeItem(key);
};

export { storeInSession, lookInSession, deleteFromSession };
