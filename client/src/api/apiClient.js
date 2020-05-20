import axios from "axios";
import querystring from "querystring";

const getClient = (url) => {
  const options = {
    baseURL: url || process.env.REACT_APP_API_BASEURL,
  };

  const client = axios.create(options);
  // request interceptor
  client.interceptors.request.use(
    async function (config) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("config=", config);
      return config;
    },
    function (error) {
      console.log(error);
    }
  );

  // Add a response interceptor
  client.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      console.log("error in interceptor", error);

      return Promise.reject(error);
    }
  );

  return client;
};

class ApiClient {
  constructor(url = null) {
    this.client = getClient(url);
  }

  get(url, data = null, conf = {}) {
    console.log(url);
    if (data && typeof data === "object") {
      url = `${url}?${querystring.stringify(data)}`;
    }
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    console.log(url);

    console.log("url=", url);
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}

export { ApiClient };
