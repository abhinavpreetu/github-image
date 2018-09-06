import Vue from 'vue';
import Vuex from 'vuex';

import constants from '../constants';
import types from './mutation-types';

Vue.use(Vuex);

const { apiBaseUrl } = constants;
const filterPayload = payload => payload.map(({ name, path, type }) => ({ name, path, type }));

const store = new Vuex.Store({
  state: {
    profile: {},
    repositories: [],
    contents: [],
    repoSelected: {},
    contentSelected: {},
    repoImage: [],
  },

  getters: {
    profile: state => state.profile,
    repositories: state => state.repositories,
    contents: state => state.contents,
    repoSelected: state => state.repoSelected,
  },

  mutations: {
    [types.setProfileInfo](state, { avatar_url: image, name, bio }) {
      state.profile = {
        image,
        name,
        bio,
      };
    },

    [types.setRepositories](state, payload) {
      state.repositories = [
        ...payload.map(({ name, id, created_at: createdAt, description }) => ({
          name,
          id,
          createdAt,
          description: description || 'No description found.',
        })),
      ];
    },

    [types.setContentsOfRepository](state, payload) {
      state.repoImage = payload;
    },

    [types.setRepoSelected](state, payload) {
      state.repoSelected = payload;
    },

    [types.setContentSelected](state, payload) {
      state.contentSelected = payload;
    },

    [types.setContentOfFileSelected](state, payload) {
      state.contents = payload;
    },
  },

  actions: {
    getProfile({ commit }) {
      fetch(`${apiBaseUrl}/users/abhinavpreetu`)
        .then(res => res.json())
        .then(payload => commit(types.setProfileInfo, payload))
        .catch((err) => {
          throw err;
        });
    },

    getRepositories({ commit }) {
      fetch(`${apiBaseUrl}/users/abhinavpreetu/repos`)
        .then(res => res.json())
        .then(response => commit(types.setRepositories, response))
        .catch((err) => {
          throw err;
        });
    },

    getContents({ commit }, { path = '' } = {}) {
      const { name } = this.state.repoSelected;
      fetch(`${apiBaseUrl}/repos/abhinavpreetu/${name}/contents${path}`)
        .then(res => res.json())
        .then((response) => {
          if (Array.isArray(response)) {
            commit(types.setContentOfFileSelected, filterPayload(response));
          } else {
            commit(types.setContentOfFileSelected, response.content);
          }
        })
        .catch((err) => {
          throw err;
        });
    },

    setRepoSelected({ commit, dispatch }, payload) {
      commit(types.setRepoSelected, payload);
      dispatch('getContents');
    },

    setContentSelected({ commit }, payload) {
      commit(types.setContentSelected, payload);
    },
  },
});

export default store;
