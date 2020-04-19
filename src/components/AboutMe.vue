<template>
  <section class="about_me" id="about">
    <div class="container col-11">
      <div class="summary shadow">
        <div class="col-10">
          <div class="avatar">
            <img :src="user.image" alt="avatar" />
          </div>
        </div>

        <div class="personal col-12">
          <div class="personal-info">
            <p class="name">
              Name：
              <span>{{ user.name }}</span>
            </p>

            <p class="email">
              Email：
              <span>a0988426059@gmail.com</span>
            </p>

            <p>
              Github 網址：
              <a :href="user.url" target="_blank">{{ user.url }}</a>
            </p>

            <p class="repositories">
              Repositories：
              <router-link :to="{ name: 'Home', hash: '#repositories'}">{{ user.repos }}</router-link>
            </p>

            <p class="followers">
              Followers：
              <span>{{ user.followers }}</span>
            </p>

            <p class="following">
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
  width: 100%;
}

.summary {
  padding: 30px 0;
}

.personal {
  display: flex;
  align-items: center;
  margin-top: 50px;
}

.personal-info {
  text-align: left;
}
</style>