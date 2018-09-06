import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'View',

  computed: {
    ...mapGetters([
      'contents',
      'repoSelected',
    ]),

    contents: () => ([
      'abcd',
      'pqrs',
      'ssdf',
      'wefef',
      'asdf',
    ]),

    isFolder() {
      return Array.isArray(this.contents);
    },

    getFileContent() {
      return atob(this.contents);
    },
  },

  methods: {
    ...mapActions([
      'setContentSelected',
      'getContents',
    ]),

    contentClickHandler(content) {
      this.setContentSelected(content);
      this.getContents({ path: `/${content.path}` });
      this.$router.push(`/contents/${this.repoSelected.name}/${content.path}`);
    },
  },
};
