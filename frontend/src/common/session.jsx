// Store in localStorage function (for persistence across sessions)
const storeInLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

// Get from localStorage function
const lookInLocalStorage = (key) => {
  return localStorage.getItem(key);
};

// Delete from localStorage function
const deleteFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export { storeInLocalStorage, lookInLocalStorage, deleteFromLocalStorage };
