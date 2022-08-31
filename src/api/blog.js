import axios from 'axios';

const getTabs = async () => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_BACK_URL}/topic`);
    return data.results;
  } catch (error) {
    throw {...error};
  }
};

const getArticles = async () => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_BACK_URL}/blog`);
    return data.results;
  } catch (error) {
    throw {...error};
  }
};

export { getTabs, getArticles };
