<template>
  <md-card :class="$style.card">
    <md-card-header-text>
      <div class="md-title">Login</div>
    </md-card-header-text>
    <md-card-content>
      <form novalidate @submit.prevent="loginSubmit">
        <md-input-container :class="{'md-input-invalid': invalidLogin}">
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-input-container>

        <md-input-container :class="{'md-input-invalid': invalidLogin}">
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
          <span v-show="invalidLogin" class="md-error">Username or password incorrect</span>
        </md-input-container>
        <md-button class="md-warn md-raised" type="submit">Submit</md-button>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    components: {},
    props: {},
    computed: {},
    watch: {},
    methods: {
      ...mapActions([
        'login'
      ]),

      loginSubmit() {
        this.invalidLogin = false;

        this.login({
          username: this.username,
          password: this.password
        }).then(() => {
          const nextPage = this.$store.state.session.nextPathName || 'home';
          this.$router.push({
            name: nextPage
          });
        }).catch(() => {
          this.invalidLogin = true;
        });
      }
    },
    data() {
      return {
        username: '',
        password: '',
        invalidLogin: false
      };
    }
  };
</script>

<style lang="scss" module>
.card {
  max-width: 600px;
  padding: 20px;
  margin: 50px auto;
}
</style>
