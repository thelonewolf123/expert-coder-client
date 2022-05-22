<template>
  <el-container>
    <el-row class="home-page">
      <el-col :span="12">
        <question-panel class="question-section"></question-panel>
      </el-col>
      <el-col :span="12" class="code-editor-section">
        <code-editor :showControls="true" :title="title" :code="code" />
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
// @ is an alias to /src
import CodeEditor from "@/components/CodeEditor.vue";
import QuestionPanel from "../components/QuestionPanel.vue";
export default {
  name: "Home",
  components: {
    CodeEditor,
    QuestionPanel
  },
  data() {
    return {
      title: "Introduction to Python",
      code: "print('hello world')",
    };
  },
};
</script>
<style>
.home-page {
  padding: 20px;
  width: 100%;
}
.code-editor-section {
  padding: 5px;
}
.question-section {
  padding: 5px;
}
</style>