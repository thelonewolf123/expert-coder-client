<template>
  <div class="container">
    <div class="margin-10"></div>
    <ul class="list-group">
      <li
        v-for="video in videos"
        :key="video.id"
        @click="navigateToPlayer(video)"
      >
        <div class="list-group-item">
          {{ video.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    let self = this;
    this.$axios.get("/videos").then(({ data }) => {
      self.videos = data;
    });
  },
  methods: {
    navigateToPlayer(video) {
      this.$router.push({
        name: "VideoPlayer",
        params: {
          id: video.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
ul {
  list-style: none;
}
.margin-10 {
  margin-top: 50px;
}
</style>