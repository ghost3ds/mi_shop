export const getData = (path) => {
  return fetch(path).then((response) => response.json());
};
