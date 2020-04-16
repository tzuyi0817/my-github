<template>
  <div>
    <Spinner v-if="isLoading" />
    <template>
      <section class="repos" id="repositories">
        <div class="container">
          <div class="repo row mt-5 shadow" v-for="repo in sortRepos" :key="repo.id">
            <div class="col-12">
              <div>
                <h3>
                  <router-link to="/" class="link">{{ repo.name }}</router-link>
                </h3>
              </div>
            </div>

            <div class="col-12">
              <p class="description">{{ repo.description }}</p>
            </div>

            <div class="col-12">
              <p>{{ repo.language }} - Updated on {{ repo.updated_at | date}}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
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
      isLoading: true
    };
  },
  computed: {
    sortRepos() {
      return this.repos.sort((a, b) => b.id - a.id); // eslint-disable-line
    }
  },
  created() {
    this.fetchRepos();
  },
  methods: {
    async fetchRepos() {
      try {
        const { data, statusText } = await apiHelper.get("/repos");

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.repos = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試"
        });
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
</style>