import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'username',

  data: () => ({
    userName: '',
  }),

  computed: {
    ...mapGetters([
      'userNotFound',
    ]),
  },

  methods: {
    ...mapActions([
      'setUserName',
    ]),

    goClickHandler() {
      this.setUserName(this.userName);
    },
  },
};
