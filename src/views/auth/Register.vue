<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <!-- email input field -->
      <div class="input-field">
        <input id="email" type="text"
          v-model="$v.email.$model"
          :class="{invalid: $v.email.$error}"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$error" class="helper-text invalid">
          Vvedite korrektnyi email
        </small>
      </div>
      <!-- password input field -->
      <div class="input-field">
        <input id="password" type="password"
          v-model="$v.password.$model"
          :class="{invalid: $v.password.$error}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
          v-if="$v.password.$error"
        >ne menee {{$v.password.$params.minLength.min}} simvolov</small>
      </div>
      <!-- name input field -->
      <div class="input-field">
        <input id="name" type="text"
          v-model="$v.name.$model"
          :class="{invalid: $v.name.$error}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
          v-if="$v.name.$error"
        >Vvedite imya, ne menshe 3 simvolov</small>
      </div>
      <!-- terms / conditions agree -->
      <p>
        <label>
          <input type="checkbox" v-model="$v.agree.$model"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<!-- ------------------------------------- -->
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
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
    },
    name: {
      required,
      minLength: minLength(3)
    },
    agree: {
      checked: v => v
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>