import axios from "axios";
import store from "@/store";
import cookie from "vue-cookies";

//const baseURL = store.state.baseURL;

const downloadFile = async ({ type }) => {
  try {
    const response = await fetch(
      `${store.state.baseURL}/parser/download/${type}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${cookie.get("auth_token")}`,
        },
      }
    );
    if (response.ok) {
      const fileData = await response.blob();
      return fileData;
    }
    const { detail } = await response.json();
    return Promise.reject({ message: detail, status: response.status });
  } catch (error) {
    throw new Error(error);
  }
};

const getComments = async () => {
  try {
    const { data } = await axios.get(`${store.state.baseURL}/comment`, {
      headers: {
        Authorization: `token ${cookie.get("auth_token")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const createComment = async ({ comment, parser }) => {
  try {
    const { data } = await axios.post(
      `${store.state.baseURL}/comment/`,
      {
        comment,
        parser,
      },
      {
        headers: {
          Authorization: `token ${cookie.get("auth_token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { downloadFile, getComments, createComment };
