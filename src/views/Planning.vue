<template>

  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill}}<span>&#8376;</span></h4>
    </div>
    
    <Loader v-if="loading" />
    
    <section v-else>
      <div v-for="cat in categories" :key="cat.catId">
        <p>
          <strong>{{cat.title}}</strong>
          {{cat.spend}} <small>&#8376;</small> из 
          {{cat.limit}} <small>&#8376;</small>
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div class="determinate" 
            :class="cat.progressColor"
            :style="{width: cat.progressPercent+'%'}"
          ></div>
        </div>
      </div>
    </section>
    
  </div>

</template>

<!-- ------------------------------------- -->
<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currencyFilter'

export default {
  metaInfo() {
    return {
      title: this.$title('planning')
    }
  },
  data() {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    let records = await this.$store.dispatch('fetchRecords')
    let categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      let spend = records.filter(rec => rec.catId === cat.catId)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, rec) => {
          return total += +rec.amount
        }, 0)

      let percent = 100 * spend / cat.limit
      let progressPercent = percent > 100 ? 100 : percent
      let progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      let tooltipValue = cat.limit - spend
      let tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        spend,
        percent,
        progressPercent,
        progressColor,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>