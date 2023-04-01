export const setInCache = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromCache = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const removeFromCache = (key) => {
  sessionStorage.removeItem(key);
};
