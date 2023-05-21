<template>
  <div
    id="water-mark"
    v-waterMarker="{ text: 'Vue-Pcerame', font: '20px Microsoft JhengHei', textColor: 'rgba(180, 180, 180, 0.2)' }"
  >
    <h4 v-for="item in 30" :key="item">水印指令</h4>
  </div>
</template>
<script setup lang="ts" name="waterMark"></script>
<style scoped lang="scss">
#water-mark {
  min-height: 100%;
  line-height: 40px;
}
</style>
