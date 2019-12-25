<template>
  <div>
    <div class="page-title">
      <h3>{{'profile' | localize}}</h3>
    </div>
    
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input id="description" type="text" 
          v-model="$v.name.$model"
          :class="{invalid: $v.$error}"
        >
        <label for="description">{{'name' | localize}}</label>
        <span v-if="$v.$error" 
          class="helper-text invalid"
        >{{'enterName' | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="lang">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<!-- ------------------------------------- -->
<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('profile')
    }
  },
  data() {
    return {
      name: '',
      lang: true
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  watch: {
    info(val) {
      this.name = val.name
      this.lang = val.locale === 'ru-RU' ? true : false
    }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const formData = {
        name: this.name,
        locale: this.lang ? 'ru-RU' : 'en-US'
      }

      try {
        await this.$store.dispatch('updateInfo', formData)
      } catch (err) {
        throw err
      }
    }
  },
  updated() {
    M.updateTextFields()
  },
  validations: {
    name: { required }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>
.switch
  margin-bottom: 2rem
</style>