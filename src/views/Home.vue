<template>
  <div class="home">
    <div class="content-item">内容1</div>
    <div
      class="activebg fisrtbg"
      id="pic1"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY1+'px' }"
    ></div>
    <div class="content-item">内容2</div>
    <div
      class="activebg secondbg"
      id="pic2"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY2+'px' }"
    ></div>
    <div class="content-item">内容3</div>
    <div
      class="activebg thirdbg"
      id="pic3"
      :style="{'background-position-x' :positionX,'background-position-y' :positionY3+'px' }"
    ></div>
    <div class="content-item">内容4</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
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
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.positionY1 = this.Y1 - scrollTop * this.ratio;
      this.positionY2 = this.Y2 - scrollTop * this.ratio;
      this.positionY3 = this.Y3 - scrollTop * this.ratio;
    }
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
  line-height: 400px;
  text-align: center;
  font-size: 30px;
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
}

.fisrtbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/profile.jpg);
  background-size: 100%;
}

.secondbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/abg.jpg);
}

.thirdbg {
  background-image: url(https://alphacamp.github.io/personal-site-demo/images/portfolio/work-3.jpg);
}
</style>
