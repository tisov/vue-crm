<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="onSubmit">
      <!-- category name input -->
      <div class="input-field">
        <input id="name" type="text"
          v-model="$v.title.$model"
          :class="{invalid: $v.title.$error}"
        >
        <label for="name">Название</label>
        <span class="helper-text invalid"
          v-if="$v.title.$error"
        >Введите название</span>
      </div>
      
      <!-- category limit input -->
      <div class="input-field">
        <input id="limit" type="number"
          v-model.number="$v.limit.$model"
          :class="{invalid: $v.limit.$error}"
        >
        <label for="limit">Лимит (минимум 100 т)</label>
        <span class="helper-text invalid"
          v-if="$v.limit.$error"
        >Минимальная величина 100 тенге</span>
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
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      title: '',
      limit: 100
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
        let res = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.clearInputFields()
        this.$message('Категория создана')
        this.$emit('catCreated', res)
      } catch (err) { }
    },
    // clear input fields
    clearInputFields() {
      this.title = ''
      this.limit = 100
      this.$v.$reset()
    }

  },
  mounted() {
    M.updateTextFields()
  },
  validations: {
    title: { required },
    limit: {
      required,
      minValue: minValue(100)
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>