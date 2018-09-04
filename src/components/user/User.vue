<template>
  <div>
    <div class="profile">
      <img :src="profile.image" alt="user profile icon">
      <p>{{profile.name}}</p>
      <p>{{profile.bio}}</p>
    </div>
    <div class="hello">
      <ul>
        <li
          v-for="{ name, id } in repositories"
          :key="id"
          @click="getContents(name)">{{name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import user from './index';

export default user;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
