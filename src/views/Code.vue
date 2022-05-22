<template>
  <el-container>
    <el-main>
      <code-editor :showControls="true" :title="title" :code="code"/>
    </el-main>
  </el-container>
</template>

<script>
import CodeEditor from "@/components/CodeEditor.vue";

export default {
  components: {
    CodeEditor,
  },
  mounted() {
    if (this.$route.name === "Code") {
      this.$route.params.id && this.getCode(this.$route.params.id);
    }
    this.title = "Introduction to python";
  },
  data() {
    return {
      title: null,
      code: "print('hello, world')",
    };
  },
  methods: {
    async getCode(id) {
      let { data } = await this.$axios.get(`/code/${id}`);
      console.log(data);
      this.title = data.title;
      this.code = data.code;
    },
  },
};
</script>