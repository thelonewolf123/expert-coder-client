<template>
  <div class="recorder" v-if="!hideBlock">
    <el-button type="primary" v-if="!isRecording" @click="startRecord">
      Record
    </el-button>
    <el-button type="danger" v-else @click="stopRecord"> Stop </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      recorder: null,
      stream: null,
      hideBlock: true,
    };
  },
  mounted() {
    if (this.$route.query.pass && this.$route.query.pass === "charlie") {
      this.hideBlock = false;
    }
  },
  methods: {
    async startRecord() {
      let videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });
      let audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      this.stream = new MediaStream([
        ...videoStream.getTracks(),
        ...audioStream.getTracks(),
      ]);
      this.recorder = new MediaRecorder(this.stream);

      const chunks = [];
      this.recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      this.recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        this.$emit("recordEvent", { state: true, data: blob });
        // console.log("data -> ", blob);
        // const videoURL = URL.createObjectURL(blob);
        // this.video = videoURL;
        this.isRecording = false;
      };
      this.recorder.start();
      this.isRecording = true;
      this.$emit("recordEvent", { state: false, blob: null });
    },
    stopRecord() {
      this.recorder.stop();
      this.stream.getTracks().forEach((track) => track.stop());
      this.isRecording = false;
    },
  },
};
</script>

<style>
.recorder {
  margin-right: 10px;
}
</style>