<template>
  <div class="categories">
    
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    
    <Loader v-if="loading" />
    <section v-else>
      <div class="row">
        <div class="col s12 m6">
          <!-- category create component -->
          <CategoryCreate v-on:catCreated="addNewCategory"/>
        </div>
        <div class="col s12 m6">
          <!-- category edit component -->
          <CategoryEdit :categories="categories" 
            v-on:updated="updateLocal"
            :key="categories.length + refresh"
            :editSelected="editSelected"
          />
        </div>
      </div>
    </section>
    
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from '@/components/app/Loader'

export default {
  metaInfo() {
    return {
      title: this.$title('categories')
    }
  },
  data() {
    return {
      categories: [],
      loading: true,
      refresh: 0,
      editSelected: 0
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateLocal(category) {
      let index = this.categories.findIndex(el => el.catId === category.catId)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.refresh++
      this.editSelected = index
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>