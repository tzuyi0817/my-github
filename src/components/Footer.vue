<template>
  <div class="footer-content">
    <p>&copy; 2020 My Github | All Rights Reserved.</p>

    <router-link to="/home">
      <img
        src="https://www.shareicon.net/data/2015/09/15/101512_logo_512x512.png"
        class="logo ml-5"
      />
    </router-link>

    <div class="footer-social-icon"></div>
  </div>
</template>

<style lang="scss" scoped>
.footer-content {
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

p {
  color: rgba(63, 64, 65, 0.7);
}

.logo {
  width: 35px;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
    -webkit-transition: all 0.4s linear;
    -moz-transition: all 0.4s linear;
    -ms-transition: all 0.4s linear;
    -o-transition: all 0.4s linear;
    transition: all 0.4s linear;
  }
}
</style>