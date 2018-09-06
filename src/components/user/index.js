import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'user',

  computed: {
    ...mapGetters([
      'repositories',
      'contents',
    ]),
  },

  methods: {
    ...mapActions([
      'setRepoSelected',
    ]),

    repoClickHandler(repo) {
      this.setRepoSelected(repo);
      this.$router.push(`/contents/${repo.name}`);
    },

    formatDate(data) {
      const date = new Date(data);
      return `${date.toString().toLowerCase() !== 'Invalid Date'.toLowerCase() ?
        date.toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }) : ''}`;
    },
  },
};
