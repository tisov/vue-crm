<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | date('date')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown"
            ref="dropdownTrigger"
            @click.prevent=""
          >
            {{userInfo.name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="black-text" @click.prevent="signOut">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<!-- ------------------------------------- -->
<script>
export default {
  data() {
    return {
      date: new Date(),
      dropdown: null,
      // dateInterval: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.info || ''
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('signOut')
      this.$router.push('/login?msg=logout')
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdownTrigger, {
      constrainWidth: false,
      alignment: 'right'
    })

    // this.dateInterval = setInterval(() => {
    //   this.date = new Date()
    // }, 1000);
  },
  beforeDestroy() {
    // clearInterval(this.dateInterval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<!-- ------------------------------------- -->
<style lang='sass'>

</style>