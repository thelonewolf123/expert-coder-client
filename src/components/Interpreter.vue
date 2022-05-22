<template>
  <div class="interpreter">
    <div class="grid-content">
      <el-button type="danger" @click="clearOutput">
        Clear
      </el-button>
      <el-button
        @click="executeScript"
        v-if="isPythonLoaded"
        type="success"
        icon="el-icon-caret-right"
      >
        Run
      </el-button>
      <el-button type="primary" :loading="!isPythonLoaded" v-else>
        Loading
      </el-button>
    </div>
    <el-row class="output">
      <div v-for="res in output" :key="res.id">
        <div v-if="res.result">
          {{ res.result }}
        </div>
        <div v-else class="error">
          {{ res.error }}
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { v4 } from "uuid";
import runPythonCode from "../lib/pythonInterpereter";

export default {
  props: ["code", "getStdin"],
  data() {
    return {
      isPythonLoaded: true,
      output: [],
      inputData: null,
    };
  },
  methods: {
    async executeScript() {
      this.isPythonLoaded = false;
      let { error, output, stderr } = await runPythonCode(this.code, this.getStdin(), "");
      if (!error) {
        this.output = output.map((out) => {
          return { id: v4(), result: out };
        });
      } else {
        this.output = stderr.map((err) => {
          return { id: v4(), error: err };
        });
      }
      this.isPythonLoaded = true;
    },
    clearOutput() {
      this.output = [];
    },
  },
};
</script>

<style scoped>
.interpreter {
  overflow-y: auto;
  height: calc(100vh - 600px);
  background-color: #fafafa;
  position: relative;
}

.input-area {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.output {
  padding-top: 10px;
  margin: 5px;
}

.error {
  color: red;
}
</style>
