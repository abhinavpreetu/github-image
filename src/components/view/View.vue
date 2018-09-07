<template>
<loader v-if="showLoader" />
<div class="content-list" v-else>
  <div v-if="isFolder">
    <div v-for="content in sortedContents"
      :key="content.path"
      class="content-item"
      @click="contentClickHandler(content)">
      <img
        :src="content.type === 'file' ? fileIcon : dirIcon"
        class="content-icon" alt="content icon">
      <span class="name">{{content.name}}</span>
    </div>
  </div>
  <div v-else >
    <p class="note">hint: right click and click on save link to download file.</p>
    <a :href="url">download</a>
    <pre class="file-content">{{getFileContent}}</pre>
  </div>
</div>
</template>

<script>
import view from './index';

export default view;
</script>

<style scoped lang="scss">
@import "../../scss/components/view";
</style>
