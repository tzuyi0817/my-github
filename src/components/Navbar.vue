<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/home">
        <img
          src="https://cdn3.iconfinder.com/data/icons/ultimate-social/150/48_github-512.png"
          class="logo"
        />
        <span class="navbar-title ml-3" style="color: white;">My Github</span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.prevent.stop="checked"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarSupportedContent" class="navbar-collapse collapse">
        <div class="ml-auto d-flex align-items-center">
          <ul class="nav">
            <li>
              <router-link :to="{ name: 'Home', hash: '#about'}">about</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Home', hash: '#repositories'}">repositories</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <ul v-show="open" class="checked-nav">
      <li @click.prevent.stop="checked">
        <router-link to="/home">home</router-link>
      </li>
      <li @click.prevent.stop="checked">
        <router-link :to="{ name: 'Home', hash: '#about'}">about</router-link>
      </li>
      <li @click.prevent.stop="checked">
        <router-link :to="{ name: 'Home', hash: '#repositories'}">repositories</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  methods: {
    checked() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss" scoped>
%delay {
  -webkit-transition: all 0.4s linear;
  -moz-transition: all 0.4s linear;
  -ms-transition: all 0.4s linear;
  -o-transition: all 0.4s linear;
  transition: all 0.4s linear;
}

.navbar-toggler {
  min-width: 50px;
  margin-right: 0;
}

.nav {
  top: 40px;
  left: 0;
  width: 100%;
}

.nav li {
  a {
    color: #fff;
    text-decoration: none;
    padding: 20px 18px;
    text-align: center;
    &:after {
      display: inline-block;
      z-index: 1;
      left: 0px;
      bottom: 0px;
      height: 3px;
      width: 100%;
      background-color: white;
      content: "";
      transform: scalex(0);
      transform-origin: center;
      @extend %delay;
    }
    &:hover:after {
      transform: scalex(1);
      color: white;
    }
  }
}

nav.bg-dark {
  padding: 17px 16px 5px;
  background: linear-gradient(-40deg, #6666ff, #3333ff) !important;
}

.navbar-brand {
  font-size: 19px;
  padding: 0;
  max-width: 100px;
}

.logo,
.navbar-title {
  width: 50%;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
    @extend %delay;
  }
}

.checked-nav {
  position: fixed;
  z-index: 100;
  border: 1xp solid black;
  display: block;
  margin-top: 70px;
  margin-right: 15px;
  list-style-type: none;
  background: linear-gradient(-100deg, #6666ff, #3333ff) !important;
  width: 100%;
  padding: 25px;
  text-align: center;
  li {
    margin-top: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid white;
    padding: 10px;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: red;
      @extend %delay;
    }
  }
}
</style>