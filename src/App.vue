<template>
  <div id="app">
    <component :is="currentLayout"></component>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import MainLayout from './layouts/MainLayout'
import EmptyLayout from './layouts/EmptyLayout'

export default {
  data() {
    return {

    }
  },
  computed: {
    currentLayout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    MainLayout,
    EmptyLayout
  }
}
</script>

<!-- ------------------------------------- -->
<style >
</style>
