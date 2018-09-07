<template>
  <user-input v-if="!userName" />
  <main v-else class="home-container">
    <loader v-if="showLoader && !repositories.length"/>
    <div id="app" class="home" v-else>
      <div class="profile" v-cloak>
        <img :src="profile.image" alt="user profile icon">
        <p>{{profile.name}}</p>
        <p>{{profile.bio}}</p>
      </div>
      <div class="content">
        <p class="breadcrumb-container">
          <span @click="homeClickHandler()" class="breadcrumb">home</span>
          <span
            v-for="(name, index) in breadCrumbs"
            :key="index"
            class="breadcrumb"
            @click="clickHandler(index + 1)">/{{name}}</span>
        </p>
        <router-view/>
      </div>
    </div>
  </main>
</template>

<script>
import app from './app';

export default app;
</script>

<style scoped lang="scss">
  @import "./scss/components/_home.scss";
</style>
