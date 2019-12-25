<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link v-for="link in links" 
      :key="link.url"
      :to="link.url" 
      :exact="link.exact"
      tag="li" active-class="active"
    >
      <a class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
    
  </ul>
</template>

<!-- ------------------------------------- -->
<script>
import localize from '@/filters/localizeFilter'

export default {
  props: {
    value: {
      type: [Boolean],
      default: true
    }
  },
  data() {
    return {
      links: [
        { title: localize('bill'), url: '/', exact: true },
        { title: localize('history'), url: '/history' },
        { title: localize('planning'), url: '/planning' },
        { title: localize('newRecord'), url: '/record' },
        { title: localize('categories'), url: '/categories' },
      ]
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>