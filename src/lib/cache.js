export const setInCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromCache = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromCache = (key) => {
  localStorage.removeItem(key);
};
