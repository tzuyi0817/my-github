<template>
  <div class="home">
    <div class="content-item"></div>

    <div
      class="activebg fisrtbg"
      id="pic1"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY1+'px' }"
    >
      <h1 class="resume">Hello, I Am Tzuyi</h1>
    </div>

    <div
      class="activebg secondbg"
      id="pic2"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY2+'px' }"
    >
      <div class="about-left"></div>

      <h1 style="color: #3333ff; text-align: center;">ABOUT ME</h1>

      <div class="about">
        <Spinner v-if="isLoading" />
        <template v-else>
          <div class="content-item" style="text-align: center;">
            <AboutMe :user="user" />
          </div>
        </template>
      </div>
    </div>

    <div
      class="activebg thirdbg"
      id="pic3"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY3+'px' }"
    >
      <div class="repo-left">
        <div>
          <p>個人 Side Project - 採用無限滾動加載方式呈現，每次增加一筆資料，可點擊 more 按鈕查看專案描述；點擊專案標題會連結到專案各別詳細資訊頁面。</p>
        </div>
      </div>

      <div class="repo-middle"></div>

      <h1 class="repo-title" style="color: #6666ff; text-align: center;">REPOSITORIES</h1>
    </div>

    <div class="repositories">
      <div class="content-item">
        <Repositories />
      </div>
    </div>
  </div>
</template>

<script>
import AboutMe from "../components/AboutMe";
import Repositories from "../components/Repositories";
import Spinner from "../components/Spinner";
import { apiHelper, Toast } from "../utils/helpers";

export default {
  name: "Home",
  components: {
    AboutMe,
    Repositories,
    Spinner
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
      Y3: 0,
      isLoading: true
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

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
@mixin respond-between($lower, $upper, $height) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    height: $height;
    @content;
  }
}

@mixin respond-and($upper, $height) {
  @media screen and (max-width: $upper) {
    height: $height;
    @content;
  }
}

.home {
  height: 100%;
  overflow: hidden;
}

.content-item {
  background-color: #fff;
  width: 100%;
}

.activebg {
  position: relative;
  background: #fff;
  background-attachment: fixed;
  background-position: center 0;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  align-items: center;
}

.fisrtbg {
  background-image: url("https://alphacamp.github.io/personal-site-demo/images/profile.jpg");
  background-size: cover;
  justify-content: center;
  height: 600px;
  margin-top: 250px;
}

.secondbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/abg.jpg);
  justify-content: space-between;
  height: 770px;
  margin-top: 150px;
  @include respond-between(992px, 1200px, 650px);
  @include respond-between(768px, 992px, 545px);
  @include respond-and(768px, 550px);
}

.thirdbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/portfolio/work-3.jpg);
  height: 770px;
  @include respond-between(992px, 1200px, 650px);
  @include respond-between(768px, 992px, 545px);
  @include respond-and(768px, 550px);
}

.resume {
  text-align: center;
  color: #fff;
}

.about-left,
.repo-middle {
  width: 0;
  height: 0;
  border-bottom: 770px solid #fff;
  border-right: 200px solid transparent;
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.repo-left {
  width: 200px;
  height: 770px;
  background-color: #fff;
  display: flex;
  align-items: center;
  @include respond-between(992px, 1200px, 650px) {
    width: 170px;
  }
  @include respond-between(768px, 992px, 545px) {
    width: 145px;
  }
  @include respond-and(768px, 550px) {
    width: 120px;
    padding: 10px;
  }
}

.about {
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}

.repo-title {
  transform: translateX(30px);
}
</style>
