import { mapGetters, mapActions } from 'vuex';

import loader from '../loader';
import fileIcon from '../../assets/file.svg';
import dirIcon from '../../assets/folder.svg';

const sortingByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export default {
  name: 'View',

  components: {
    loader,
  },

  computed: {
    ...mapGetters([
      'contents',
      'repoSelected',
      'showLoader',
    ]),

    sortedContents() {
      const { contents } = this;
      return [
        ...contents.filter(content => content.type === 'dir').sort(sortingByName),
        ...contents.filter(content => content.type === 'file').sort(sortingByName),
      ];
    },

    isFolder() {
      return Array.isArray(this.contents);
    },

    getFileContent() {
      return atob(this.contents);
    },

    fileIcon: () => fileIcon,

    dirIcon: () => dirIcon,
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
