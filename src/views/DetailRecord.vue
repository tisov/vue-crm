<template>
  <div class="detail-record">
    <Loader v-if="loading" />
    
    <div v-else-if="Object.keys(record).length">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          История
        </router-link>
        <a class="breadcrumb">
          {{record.recType}}
        </a>
      </div>
      
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.recColor">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency}}</p>
              <p>Категория: {{record.catName}}</p>
              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <p v-else class="center">Запись не найдена</p>
  </div>

</template>

<!-- ------------------------------------- -->
<script>
export default {
  metaInfo() {
    return {
      title: this.$title('detailRecord')
    }
  },
  data() {
    return {
      loading: true,
      record: {}
    }
  },
  async mounted() {
    let recId = this.$route.params.id
    let record = await this.$store.dispatch('fetchRecordById', recId)
    let category = await this.$store.dispatch('fetchCategoryById', record.catId)

    this.record = {
      ...record,
      catName: category.title,
      recType: record.type === 'income' ? 'Доход' : 'Расход',
      recColor: record.type === 'income' ? 'green' : 'red'
    }
    this.loading = false
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>