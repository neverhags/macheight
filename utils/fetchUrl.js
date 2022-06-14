'use-strict';
/**
 * @param {*} url
 * @return {Promise}
 */
const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
  });
};

export default fetchUrl;
