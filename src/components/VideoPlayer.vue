<template>
  <div>
    <video-player
      v-bind:class="{
        'video-player-box': true,
        'd-flex': !showCode,
        'd-none': showCode,
      }"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      :autoplay="true"
      :controls="true"
      :start-time="startTime"
      @pause="pauseEvent($event)"
      @ready="playerReadied"
    >
    </video-player>
    <div v-if="showCode" class="code-editor-section">
      <code-editor
        :title.sync="title"
        :code.sync="code"
        :hideTitle="true"
        :showControls="false"
      />
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
import { videoPlayer } from "vue-video-player";
import CodeEditor from "@/components/CodeEditor.vue";

export default {
  props: ["id", "showCode"],
  components: {
    videoPlayer,
    CodeEditor,
  },
  watch: {
    id() {
      this.initPlayer();
    },
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        techOrder: ["html5"],
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        width: 900,
        sources: [],
      },
      code: "",
      data: null,
      title: null,
      startTime: 0,
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  mounted() {
    this.initPlayer();
  },
  methods: {
    playerReadied(player) {
      console.log("the player is readied", player);
    },
    initPlayer() {
      let self = this;

      this.$axios.get(`/video/${this.id}`).then(({ data }) => {
        self.playerOptions.sources = [
          {
            type: "video/webm",
            src: data.url,
          },
        ];
        self.data = data;
        self.title = data.title;
      });
    },
    pauseEvent(player) {
      console.log("pause event", player);
      let currentTime = player.currentTime();
      console.log("currentTime", currentTime);
      let currentTimeInt = parseInt(currentTime);
      console.log("currentTimeInt", currentTimeInt);
      this.startTime = currentTimeInt;
      let self = this;
      JSON.parse(this.data.code_json).forEach((item) => {
        if (item.time === currentTimeInt) {
          self.code = item.code;
          console.log("code", self.code);
        }
      });
    },
  },
};
</script>

<style scoped>
.code-editor-section {
  width: 900px;
}
</style>
