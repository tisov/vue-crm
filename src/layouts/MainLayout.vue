<template>
  <!-- <Loader v-if="loading" /> -->
  
  <div class="app-main-layout">
    
    <Navbar @click="isOpen = !isOpen" />
    
    <Sidebar v-model="isOpen" :key="locale" />
    
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import Sidebar from '@/components/app/Sidebar'
import Navbar from '@/components/app/Navbar'
import messages from '@/utils/messages'

export default {
  data() {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.$store.commit('clearLoadingUserInfo')
    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$message(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>