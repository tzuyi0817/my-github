<template>
  <div class="home">
    <div class="content-item"></div>

    <div
      class="activebg fisrtbg"
      id="pic1"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY1+'px' }"
    >
      <div class="overlay"></div>
      <h1 class="about">ABOUT ME</h1>
    </div>

    <div class="content-item" style="text-align: center;">
      <AboutMe :user="user" />
    </div>

    <div
      class="activebg secondbg"
      id="pic2"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY2+'px' }"
    >
      <div class="overlay"></div>
      <h1 class="repositories">REPOSITORIES</h1>
    </div>

    <div class="content-item">
      <Repositories />
    </div>

    <div
      class="activebg thirdbg"
      id="pic3"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY3+'px' }"
    ></div>
  </div>
</template>

<script>
import AboutMe from "../components/AboutMe";
import Repositories from "../components/Repositories";
import { apiHelper, Toast } from "../utils/helpers";

export default {
  name: "Home",
  components: {
    AboutMe,
    Repositories
  },
  data() {
    return {
      user: {
        name: "",
        url: "",
        image: "",
        repos: -1,
        followers: -1,
        following: -1
      },
      repos: [],
      ratio: 0.05,
      positionX: "50%",
      positionY1: 30,
      positionY2: 100,
      positionY3: 150,
      Y1: 0,
      Y2: 0,
      Y3: 0
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const { data, statusText } = await apiHelper.get();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.user = {
          name: data.name,
          url: data.html_url,
          image: data.avatar_url,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試"
        });
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.positionY1 = this.Y1 - scrollTop * this.ratio;
      this.positionY2 = this.Y2 - scrollTop * this.ratio;
      this.positionY3 = this.Y3 - scrollTop * this.ratio;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    window.onload = () => {
      let pic1 = document.getElementById("pic1");
      let pic2 = document.getElementById("pic2");
      let pic3 = document.getElementById("pic3");

      this.positionY1 = this.Y1 = pic1.offsetTop * this.ratio;
      this.positionY2 = this.Y2 = pic2.offsetTop * this.ratio;
      this.positionY3 = this.Y3 = pic3.offsetTop * this.ratio;
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.content-item {
  background-color: #fff;
  width: 100%;
  font-weight: bold;
}

.activebg {
  position: relative;
  width: 100%;
  height: 600px;
  background: #fff;
  background-attachment: fixed;
  background-position: center 0;
  background-repeat: no-repeat;
  margin-top: 150px;
}

.fisrtbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/portfolio/work-6.jpg);
  background-size: 100%;
}

.secondbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/abg.jpg);
}

.thirdbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/portfolio/work-3.jpg);
}

.overlay {
  height: 300px;
}

.about,
.repositories {
  text-align: center;
  color: white;
}

.repositories {
  color: #0047b3;
}
</style>
