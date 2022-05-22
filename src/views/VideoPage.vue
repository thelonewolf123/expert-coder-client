<template>
  <div class="video-view">
    <div class="video-code-switch">
      <el-button @click="switchToCode" v-if="!showCode"> Code </el-button>
      <el-button @click="switchToVideo" v-else> Video </el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <video-player class="video-container" :id="id" :showCode="showCode"></video-player>
      </el-col>
      <el-col :span="12">
        <question-panel v-if="showCode" class="question-section"></question-panel>
        <div class="video-list">
          <ul class="list-group">
            <li
              v-for="video in videos"
              :key="video.id"
              @click="navigateToPlayer(video)"
            >
              <div
                class="list-group-item"
                :class="{ 'background-highlight': video.id == id }"
              >
                {{ video.title }}
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import QuestionPanel from "@/components/QuestionPanel.vue";

export default {
  components: {
    VideoPlayer,
    QuestionPanel,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      videos: [],
      showCode: false,
    };
  },
  mounted() {
    let self = this;
    this.$axios.get("/videos").then(({ data }) => {
      self.videos = data;
    });
  },
  methods: {
    switchToCode() {
      console.log("switchToCodeOrVideo, showCode -> ", this.showCode);
      this.showCode = true;
    },
    switchToVideo() {
      console.log("switchToCodeOrVideo, showCode -> ", this.showCode);
      this.showCode = false;
    },
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
.question-section {
  padding: 5px;
  padding-top: 20px;
}
.video-code-switch{
    padding: 20px;
}
.video-list {
  padding-top: 20px;
  padding: 10px;
}

.video-container {
  padding: 20px;
}
.background-highlight {
  background: skyblue;
}
.list-group-item {
  cursor: pointer;
}
ul {
  list-style: none;
}
</style>