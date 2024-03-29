<template>
  <div>
    <div class="wrapper">
      <h1 v-if="!hideTitle">{{ title }}</h1>
      <div class="share-code" v-if="showControls">
        <record-control @recordEvent="recordEvent" />
        <div v-if="shareCodeVisible">
          <el-button type="primary" @click="changeTitle">
            Change Title
          </el-button>
          <el-button type="success" @click="shareCode"> Share </el-button>
        </div>
      </div>
    </div>
    <vue-ace-editor
      editor-id="editor"
      :content="code"
      v-on:change-content="codeUpdated"
    ></vue-ace-editor>
    <el-dialog
      title="Title"
      :show-close-icon="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input placeholder="Title" v-model="titleInput"> </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleDone">Done</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueAceEditor from "./VueAceEditor.vue";
import RecordControl from "./RecordControl.vue";

export default {
  props: ["title", "code", "showControls", "hideTitle"],
  components: {
    VueAceEditor,
    RecordControl,
  },
  data: () => ({
    lineNumbers: true,
    dialogVisible: false,
    titleInput: null,
    shareCodeVisible: true,
    codeTimeFrame: null,
    startingTime: null,
    videoData: null,
    timer: null,
    count: 0,
  }),
  mounted() {
    this.$emit("update:code", this.code);
    this.titleInput = this.title;
  },
  methods: {
    codeUpdated(code) {
      this.$emit("update:code", code);
    },
    changeTitle() {
      this.titleInput = this.title;
      this.dialogVisible = true;
    },
    handleDone() {
      this.$emit("update:title", this.titleInput);
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async recordEvent({ state, data }) {
      this.shareCodeVisible = state;
      this.videoData = data;
      if (state) {
        console.log("recording completed");
        let formData = new FormData();
        formData.append("fname", this.title);
        formData.append("data", this.videoData);
        let { data } = await this.$axios.post("/file", formData);
        let videoData = JSON.stringify({
          title: this.title,
          code_json: JSON.stringify(this.codeTimeFrame),
          video_id: data.id,
        });
        await this.$axios.post("/video", videoData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.$notify({
          type: "success",
          title: "Video",
          message: "Video saved on the server",
        });
        clearInterval(this.timer);
        this.timer = null;
        this.count = 0;
      } else {
        this.codeTimeFrame = [];
        this.timer = setInterval(() => {
          this.codeTimeFrame.push({
            time: this.count,
            code: this.code,
          });
          this.count++;
        }, 1000);
      }
    },
    async shareCode() {
      const { data } = await this.$axios.post(
        "/code",
        { title: this.title, code: this.code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        console.log(data);
      } else {
        return;
      }
      let self = this;
      const url = window.location.origin + "/code/" + data.id;
      navigator.clipboard.writeText(url).then(
        function () {
          self.$notify({
            type: "success",
            title: "Share Code",
            message: "Url Copied to clipboard",
          });
          self.$router.push({ path: "/code/" + data.id });
        },
        function () {
          self.$notify({
            type: "error",
            title: "Share Code",
            message: "Url Copy to clipboard failed",
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapper > h1 {
  flex: 1;
}
h1 {
  text-align: left;
}
.share-code {
  display: flex;
}
</style>
