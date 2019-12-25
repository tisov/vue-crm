<template>
  <form class="card auth-card" @submit.prevent="onSubmit()">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text"
          v-model.lazy="$v.email.$model"
          :class="{invalid: $v.email.$error}"
        >
        <label for="email"
          :class="{active: this.email.length}"
        >Email</label>
        <small v-if="$v.email.$error" class="helper-text invalid">
          Vvedite korrektnyi email
        </small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
          v-model="$v.password.$model"
          :class="{invalid: $v.password.$error}"
        >
        <label for="password"
          :class="{active: this.password.length}"
        >Пароль</label>
        <small class="helper-text invalid"
          v-if="$v.password.$error"
        >ne menee {{$v.password.$params.minLength.min}} simvolov</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit" :class="{disabled: loading}">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<!-- ------------------------------------- -->
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
import localize from '@/filters/localizeFilter'

export default {
  data() {
    return {
      email: 'a.tilektessov@mail.ru',
      password: '111111',
      loading: false
    }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('signIn', formData)
        this.$router.push('/')
      } catch (err) {

      }
      this.loading = false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  mounted() {
    if (this.$route.query.msg) {
      this.$message(localize(messages[this.$route.query.msg || '']))
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>