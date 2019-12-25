<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="cat in categories"
            :key="cat.catId"
            :value="cat.catId"
          >
            {{cat.title}}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>
      
      <div class="input-field">
        <input id="name" type="text"
          v-model="$v.title.$model"
          :class="{invalid: $v.title.$error}"
        >
        <label for="name">Название</label>
        <small class="helper-text invalid"
          v-if="$v.title.$error"
        >Введите новое название</small>
      </div>
      
      <div class="input-field">
        <input id="name" type="text"
          v-model.number="$v.limit.$model"
          :class="{invalid: $v.limit.$error}"
        >
        <label for="name">Лимит</label>
        <small class="helper-text invalid"
          v-if="$v.limit.$error"
        >Введите новый лимит</small>
      </div>      

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: {
    categories: [Array],
    editSelected: [Number]
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: ''
    }
  },
  watch: {
    current(val) {
      let newCurrent = this.categories.find(el => el.catId == val)
      this.title = newCurrent.title
      this.limit = newCurrent.limit
    }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      // send request
      try {
        let data = {
          catId: this.current,
          title: this.title,
          limit: this.limit
        }
        console.log(data)
        await this.$store.dispatch('updateCategory', data)
        this.$message('Категория обновлена')
        this.$emit('updated', data)
      } catch (err) {
        throw err
      }
    }
  },
  validations: {
    title: { required },
    limit: {
      required,
      minValue: minValue(100)
    }
  },
  created() {
    let firstCat = this.categories[this.editSelected]
    this.current = firstCat.catId
    this.title = firstCat.title
    this.limit = firstCat.limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>