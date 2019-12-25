<template>
  <div class="record">
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    
    <p v-else-if="!categories.length" class="center">
      Категории не найдены.
      <router-link to="/categories">Добавить категорию</router-link>
    </p>
    
    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="cat in categories"
            :key="cat.catId"
            :value="cat.catId"
          >{{cat.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <!-- radio buttons -->
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" 
            value="income" v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" 
          />
          <span>Расход</span>
        </label>
      </p>
      <!-- input fields -->
      <div class="input-field">
        <input id="amount" type="number"
          v-model="$v.amount.$model"
          :class="{invalid: $v.amount.$error}"
        >
        <label for="amount">Сумма</label>
        <span v-if="$v.amount.$error" 
          class="helper-text invalid"
        >Введите сумму</span>
      </div>

      <div class="input-field">
        <input id="description" type="text"
          v-model="$v.description.$model"
          :class="{invalid: $v.description.$error}"
        >
        <label for="description">Описание</label>
        <span class="helper-text invalid"
          v-if="$v.description.$error" 
        >Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import Loader from '@/components/app/Loader'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$title('newRecord')
    }
  },
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      current: '',
      type: 'income',
      amount: 1,
      description: ''
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      if (this.canCreateRecord) {
        try {
          let newBill = this.type === 'income'
            ? this.info.bill + +this.amount
            : this.info.bill - +this.amount

          let res = await this.$store.dispatch('createRecord', {
            type: this.type,
            description: this.description,
            amount: +this.amount,
            catId: this.current,
            date: new Date().toJSON()
          })

          await this.$store.dispatch('updateInfo', {
            newBill: +newBill
          })
          this.$message('Запись успешно создана')
          this.clearFields()
        } catch (err) {
          throw err
        }
      } else {
        this.$message('Недостаточно средств на счете')
      }
    },
    // Clear fields
    clearFields() {
      this.description = ''
      this.amount = 1
      this.$v.$reset()
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (!this.current) {
      this.current = this.categories[0].catId
    }
  },
  updated() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    description: { required },
    amount: {
      minValue: minValue(1)
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>