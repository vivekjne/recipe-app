import { ApiClient } from "./apiClient";

let client = new ApiClient();

const exampleClient = {
  fetchPosts(data) {
    return client.get("/posts");
  },
};

export default exampleClient;
