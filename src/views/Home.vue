<template>
  <Loader v-if="loadingUserInfo" />
  <div v-else class="home">
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    
    <div v-else class="row">
      <div class="col s12 m6 l4">
        <HomeBill :rates="currency.rates"/>
      </div>
      <div class="col s12 m6 l8">
        <HomeCurrency 
          :rates="currency.rates"
          :date="currency.date"
        />
      </div>
    </div>
  </div>

</template>

<!-- ------------------------------------- -->
<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import Loader from '@/components/app/Loader'

export default {
  metaInfo() {
    return {
      title: this.$title('bill')
    }
  },
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  computed: {
    loadingUserInfo() {
      return this.$store.getters.loadingUserInfo
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>