<template>
  <div id="login">
    <div class="login-box">
      <SwitchDark />
      <div class="left-box">
        <img src="@/assets/images/login_left.svg" alt="" />
      </div>
      <div class="right-form">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="login"></script>
<style scoped lang="scss">
@use "./index.scss";
</style>
