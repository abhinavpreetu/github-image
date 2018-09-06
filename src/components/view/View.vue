<template>
<div>
  <ul v-if="isFolder">
    <li v-for="content in contents"
      :key="content.path"
      @click="contentClickHandler(content)">
      {{content.name}}
    </li>
  </ul>
  <pre v-else>{{getFileContent}}</pre>
</div>
</template>

<script>
import view from './index';

export default view;
</script>

<style scoped>

</style>
