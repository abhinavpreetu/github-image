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
    showLoader: true,
    userName: '',
    userNotFound: false,
  },

  getters: {
    profile: state => state.profile,
    repositories: state => state.repositories,
    contents: state => state.contents,
    repoSelected: state => state.repoSelected,
    showLoader: state => state.showLoader,
    userName: state => state.userName,
    userNotFound: state => state.userNotFound,
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

    [types.setShowLoader](state, payload) {
      state.showLoader = payload;
    },

    [types.setUserName](state, payload) {
      state.userName = payload;
    },

    [types.setUserNotFound](state, payload) {
      state.userNotFound = payload;
    },
  },

  actions: {
    getProfile({ commit, dispatch }, username) {
      fetch(`${apiBaseUrl}/users/${username}`)
        .then(res => (res.status >= 200 && res.status < 300) ? res.json() : Promise.reject(res)) //eslint-disable-line
        .then((payload) => {
          commit(types.setProfileInfo, payload);
          commit(types.setUserNotFound, false);
          dispatch('getRepositories');
        })
        .catch((err) => {
          commit(types.setUserName, '');
          commit(types.setUserNotFound, true);
          console.error(err);//eslint-disable-line
        });
    },

    getRepositories({ commit }) {
      const { userName } = this.state;
      fetch(`${apiBaseUrl}/users/${userName}/repos`)
        .then(res => res.json())
        .then((response) => {
          commit(types.setShowLoader, false);
          commit(types.setRepositories, response);
        })
        .catch((err) => {
          commit(types.setShowLoader, false);
          throw err;
        });
    },

    getContents({ commit }, { path = '' } = {}) {
      commit(types.setShowLoader, true);
      const { name } = this.state.repoSelected;
      fetch(`${apiBaseUrl}/repos/abhinavpreetu/${name}/contents${path}`)
        .then(res => res.json())
        .then((response) => {
          if (Array.isArray(response)) {
            commit(types.setContentOfFileSelected, filterPayload(response));
          } else {
            commit(types.setContentOfFileSelected, response.content);
          }
          commit(types.setShowLoader, false);
        })
        .catch((err) => {
          commit(types.setShowLoader, false);
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

    setShowLoader({ commit }, payload) {
      commit(types.setShowLoader, payload);
    },

    setUserName({ commit, dispatch }, payload) {
      commit(types.setUserName, payload);
      dispatch('getProfile', payload);
    },
  },
});

export default store;
