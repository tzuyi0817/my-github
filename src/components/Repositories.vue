<template>
  <div>
    <template>
      <section class="repos" id="repositories">
        <div class="container">
          <div class="repo row mt-5 shadow" v-for="(repo, index) in repos" :key="index">
            <div class="col-12">
              <div>
                <h3>
                  <router-link
                    :to="{ name: 'Repo', params: { name: repo.name }}"
                    class="link"
                  >{{ repo.name }}</router-link>
                </h3>
              </div>
            </div>

            <div class="ml-2">
              <b-button v-b-toggle="repo.name" class="m-1">more</b-button>
              <b-collapse :id="repo.name" class="mt-2">
                <div class="col-12">
                  <p class="description">{{ repo.description }}</p>
                </div>
              </b-collapse>
            </div>

            <div class="col-12 mt-3">
              <p>{{ repo.language }} - Updated on {{ repo.pushed_at | date}}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import { apiHelper, Toast } from "../utils/helpers";
import { dateFilter } from "../utils/mixins";
import Spinner from "../components/Spinner";

export default {
  mixins: [dateFilter],
  components: {
    Spinner
  },
  data() {
    return {
      repos: [],
      count: 0,
      isLoading: true,
      bottom: false
    };
  },
  created() {
    this.fetchRepos();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    async fetchRepos() {
      try {
        this.isLoading = true;

        const { data, statusText } = await apiHelper.get("/repos");

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        if (this.count > data.length - 1) {
          this.isLoading = false;
          Toast.fire({
            icon: "warning",
            title: "已無更多的 repository"
          });
          return;
        }

        this.repos.push(data[this.count]);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試"
        });
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.count++;
        this.fetchRepos();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.repo {
  border-bottom: 3px solid #e6f0ff;
}

.link {
  font-weight: bold;
}

p {
  padding: 5px 0;
  font-weight: normal;
}

h3 {
  padding: 30px 0;
}

.description {
  color: black;
}

.m-1 {
  background-color: #3333ff;
  &:hover {
    background-color: #6666ff;
  }
}
</style>