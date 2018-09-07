<template>
  <div class="input-container">
    <div class="user-input">
      <p>enter your github username</p>
      <input type="text" v-model="userName" @keyup.enter="goClickHandler" autofocus>
      <!-- comapring to null if user not found -->
      <span v-if="userNotFound" class="error">github account not found</span>
      <button @click="goClickHandler">go</button>
    </div>
  </div>
</template>

<script>
import username from './index';

export default username;
</script>

<style scoped lang="scss">
  @import "../../scss/components/username";
</style>
