export default {
  name: 'HelloWorld',
  data() {
    return {
      repositories: [],
      contents: [],
      profile: {},
    };
  },

  methods: {
    getProfile() {
      fetch('https://api.github.com/users/abhinavpreetu')
        .then(res => res.json())
        .then(({ avatar_url: image, name, bio }) => {
          this.profile = {
            image,
            name,
            bio,
          };
          console.log(this.profile); //eslint-disable-line
        })
        .catch((err) => {
          throw err;
        });
    },

    getRepositories() {
      fetch('https://api.github.com/users/abhinavpreetu/repos')
        .then(res => res.json())
        .then((response) => {
          this.repositories = [
            ...response.filter(({ name, id, created_at: createdAt }) => ({ //eslint-disable-line
              name,
              id,
              createdAt,
            })),
          ];
        })
        .catch((err) => {
          throw err;
        });
    },

    getContents(name) {
      fetch(`https://api.github.com/repos/abhinavpreetu/${name}/contents`)
        .then(res => res.json())
        .then((response) => {
          this.contents = [
            ...response,
          ];
          console.log(this.contents); //eslint-disable-line
        })
        .catch((err) => {
          throw err;
        });
    },
  },

  created() {
    this.getProfile();
  },

  mounted() {
    this.getRepositories();
  },
};
