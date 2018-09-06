<template>
  <div class="repoList">
    <div class="repos"
        v-for="repo in repositories"
        :key="repo.id"
        @click="repoClickHandler(repo)">
      <p class="name">{{repo.name}}</p>
      <p class="description">{{repo.description}}</p>
      <p class="date">{{formatDate(repo.createdAt)}}</p>
    </div>
  </div>
</template>

<script>
import user from './index';

export default user;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../scss/components/repo";
</style>
