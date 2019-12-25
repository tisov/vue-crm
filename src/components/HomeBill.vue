<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>

      <p class="currency-line"
        v-for="curr in currencies" :key="curr"
      >
        <span>{{getCurrency(curr) | currency(curr)}}</span>
      </p>
    </div>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['KZT', 'EUR', 'USD']
    }
  },
  computed: {
    base() {
      let userBill = this.$store.getters.info.bill
      return userBill / (this.rates['KZT'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return (+this.base * this.rates[currency]).toFixed(2)
    }
  }
  // watch: {
  //   base(val) {
  //     console.log(val)
  //   }
  // }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>