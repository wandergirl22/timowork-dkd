<template>
  <div style="display: inline-block">
    <span>{{ title }}</span>
    <el-input
      class="input"
      style="padding: 0 10px"
      :placeholder="placeholder"
      :value="value"
      @input="handleinput"
    ></el-input>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => ''
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleinput(value) {
      //父组件在绑定v-model时，其实就绑定的input事件，因此父组件不需要再声明事件了
      this.$emit('input', value)
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {}
}
</script>
<style lang="scss" scoped>
.input {
  width: 200px !important;
}
</style>
