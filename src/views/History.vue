<template>

  <div class="history">
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    
    <Loader v-if="loading" />
    
    <p v-else-if="!records.length" class="center">
      Записей пока нет. 
      <router-link to="/record">Добавить новую запись</router-link>
    </p>
    
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate v-model="page"
        :page-count="pageCount"
        :click-handler="paginateHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :page-class="'waves-effect'"
        :container-class="'pagination'">
      </Paginate>
    </section>
  </div>

</template>

<!-- ------------------------------------- -->
<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'

export default {
  metaInfo() {
    return {
      title: this.$title('history')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: []
    }
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(rec => {
        return {
          ...rec,
          catName: categories.find(cat => cat.catId === rec.catId).title,
          recType: rec.type === 'income' ? 'Доход' : 'Расход',
          typeClass: rec.type === 'income' ? 'green' : 'red'
        }
      }))

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [{
          label: 'Расходы',
          data: categories.map(cat => {
            return this.records.reduce((total, rec) => {
              if (rec.catId === cat.catId && rec.type === 'outcome') {
                return total += rec.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    let categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>
.pagination
  user-select: none
  li a:focus
    outline: none
    
</style>