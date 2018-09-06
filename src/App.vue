<template>
  <div id="app" class="home">
    <div class="profile" v-cloak>
      <img :src="profile.image" alt="user profile icon">
      <p>{{profile.name}}</p>
      <p>{{profile.bio}}</p>
    </div>
    <div class="content">
      <p>
        <router-link to="/">home</router-link>
        <span
          v-for="(name, index) in breadCrumbs"
          :key="index"
          @click="clickHandler(index + 1)">> {{name}}</span>
      </p>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const authorizationUrl = 'https://github.com/login/oauth/authorize';
const clientId = '1cc671b5d3d11ae9ffa2';
const uniqueState = 'hahaha123';
const authorize = `${authorizationUrl}?client_id=${clientId}&state=${uniqueState}`;

export default {
  name: 'App',

  computed: {
    ...mapGetters([
      'profile',
    ]),

    breadCrumbs() {
      return this.$route.path.replace('/contents/', '').split('/');
    },
  },

  methods: {
    ...mapActions([
      'getContents',
      'getProfile',
      'getRepositories',
    ]),

    clickHandler(index) {
      const path = this.breadCrumbs.slice(0, index);
      this.$router.replace(`/contents/${path.join('/')}`);
      this.getContents({ path: `/${path.slice(1).join('/')}` });
    },
  },

  created() {
    if (window.location.href.indexOf('?code=') < 0) {
      window.open(`${authorize}`, '_self');
    } else {
      this.getProfile();
      this.getRepositories();
    }
  },
};
</script>

<style scoped lang="scss">
  @import "./scss/components/_home.scss";
</style>
