<template>
  <div class="wrapper"></div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  height: 100vh;
  background-image: url('../assets/3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.wrapper::after {
  content: '';
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
}
</style>
