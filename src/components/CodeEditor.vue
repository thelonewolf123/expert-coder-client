<template>
  <div>
    <splitpanes
      class="default-theme"
      horizontal
      style="height: calc(100vh - 100px)"
    >
      <pane class="grid-content" max-size="100" min-size="0" size="60">
        <div style="height: 700px">
          <editor
            :title.sync="title"
            :hideTitle="hideTitle"
            :code.sync="pythonCode"
            :showControls="showControls"
            :initCode="code"
          />
        </div>
      </pane>
      <pane class="grid-content" max-size="90" min-size="0" size="30">
        <interpreter :code="pythonCode" :getStdin="getStdin" />
      </pane>
      <pane class="grid-content" max-size="90" min-size="0" size="10">
        <el-input
          v-model="stdin"
          placeholder="Enter your input here / use new line for multiple inputs"
          class="input-box"
          type="textarea"
          :rows="2"
        >
        </el-input>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Interpreter from "./Interpreter.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  props: ["showControls", "code", "title", "hideTitle"],
  components: {
    Editor,
    Interpreter,
    Splitpanes,
    Pane,
  },
  mounted() {
    this.pythonCode = this.code;
  },
  data() {
    return {
      stdin: "",
      pythonCode: "",
    };
  },
  methods: {
    getStdin() {
      return this.stdin;
    },
  },
};
</script>

<style>
.splitpanes.default-theme .splitpanes__pane {
  background-color: #fff;
}
</style>