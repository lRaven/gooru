import { getArticles } from '@/api/blog';

const state = () => ({
  articles: []
});

const mutations = {
  SET_ARTICLES: (state, payload) => state.articles = payload,
};

const getters = {
  getArticlesByTopic: (state) => (topic) => {
    return state.articles.filter( article => article.topic === topic) || [];
  },
};

const actions = {
  getArticles: async (context) => {
    try {
      const articles = await getArticles();
      
      const publishedArticles = articles.filter( article => article.is_published === true);
      context.commit('SET_ARTICLES', publishedArticles);
    } catch (error) {
      throw {...error};
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions
};
