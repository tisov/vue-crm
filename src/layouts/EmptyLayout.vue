<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import messages from '@/utils/messages'

export default {
  data() {
    return {

    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$message(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>