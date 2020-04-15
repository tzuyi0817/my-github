<template>
  <section class="about_me" id="about">
    <div class="container">
      <h2>about me</h2>

      <div class="summary row mt-5">
        <div class="col-md-6">
          <div class="avatar">
            <img :src="user.image" alt="avatar" />
          </div>
        </div>

        <div class="col-md-6 mt-4">
          <div class="personal-info">
            <p>
              Name：
              <span>{{ user.name }}</span>
            </p>

            <p>
              Email：
              <span>a0988426059@gmail.com</span>
            </p>

            <p>
              Github 網址：
              <a :href="user.url" target="_blank">{{ user.url }}</a>
            </p>

            <p>
              Repositories：
              <span>{{ user.repos }}</span>
            </p>

            <p>
              Followers：
              <span>{{ user.followers }}</span>
            </p>

            <p>
              Following：
              <span>{{ user.following }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 70%;
}
</style>