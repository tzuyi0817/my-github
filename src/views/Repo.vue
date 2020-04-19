<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="overlay"></div>
      <div class="repo shadow">
        <b-card text-variant="black" :title="repo.name" class="card">
          <b-card-text style="padding: 50px 10px;">{{ repo.description }}</b-card-text>
          <p class="date">{{ repo.language }} - Updated on {{ repo.pushed_at | date }}</p>
          <p class="commits">{{ commits.length }} 個 commits</p>
          <p class="branches">{{ branches.length }} 個 branches</p>
          <a :href="repo.html_url" target="_blank" class="btn btn-secondary">前往 Github 頁面</a>
        </b-card>
      </div>
    </template>
  </div>
</template>>

<script>
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";
import { dateFilter } from "../utils/mixins";
import axios from "axios";

export default {
  mixins: [dateFilter],
  components: {
    Spinner
  },
  data() {
    return {
      repo: {},
      commits: [],
      isLoading: true
    };
  },
  created() {
    const { name } = this.$route.params;
    this.fetchRepo({ name });
  },
  beforeRouteUpdate(to, from, next) {
    const { name } = to.params;
    this.fetchRepo({ name });
    next();
  },
  methods: {
    async fetchRepo({ name }) {
      try {
        const [repo, commits, branches] = await Promise.all([
          axios.get(`https://api.github.com/repos/tzuyi0817/${name}`),
          axios.get(
            `https://api.github.com/repos/tzuyi0817/${name}/commits?per_page=150`
          ),
          axios.get(`https://api.github.com/repos/tzuyi0817/${name}/branches`)
        ]);

        if (repo.statusText !== "OK" || commits.statusText !== "OK") {
          throw new Error(repo.statusText || commits.statusText);
        }

        this.repo = repo.data;
        this.commits = commits.data;
        this.branches = branches.data;
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
.overlay {
  height: 150px;
}

.btn {
  background-color: #3333ff;
  padding: 10px;
  &:hover {
    background-color: #6666ff;
  }
}

.date {
  padding: 0 10px;
}

.commits,
.branches {
  color: black;
  padding: 0 10px;
}
</style>