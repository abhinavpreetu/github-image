import { mapGetters, mapActions } from 'vuex';
import loader from './components/loader';
import userInput from './components/inputBox/userInput';

const authorizationUrl = 'https://github.com/login/oauth/authorize';
const clientId = '1cc671b5d3d11ae9ffa2';
const uniqueState = 'hahaha123';
const authorize = `${authorizationUrl}?client_id=${clientId}&state=${uniqueState}`;

export default {
  name: 'App',

  components: {
    loader,
    userInput,
  },

  computed: {
    ...mapGetters([
      'profile',
      'showLoader',
      'repositories',
      'userName',
    ]),

    breadCrumbs() {
      const { path } = this.$route;
      return path === '/' ? [] : path.replace('/contents/', '').split('/');
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

    homeClickHandler() {
      this.$router.replace('/');
    },
  },

  created() {
    if (window.location.href.indexOf('?code=') < 0) {
      window.open(`${authorize}`, '_self');
    }
  },
};
