import { mapActions } from 'vuex';

export default {
  name: 'username',

  data: () => ({
    userName: '',
  }),

  methods: {
    ...mapActions([
      'setUserName',
    ]),

    goClickHandler() {
      this.setUserName(this.userName);
    },
  },
};
