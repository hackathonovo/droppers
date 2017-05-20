<template>
  <div>
    <md-toolbar>
      <md-button
        class="md-icon-button"
        @click.native="toggleSidenav"
      >
        <md-icon>menu</md-icon>
      </md-button>

      <h2 :class="[$style.title, 'md-title']">HGSS - Admin dashboard</h2>
      <md-button
        class="md-icon-button"
        v-if="session.user"
        @click.native="logoutCurrentUser">
        <md-icon>exit_to_app</md-icon>
      </md-button>
    </md-toolbar>


    <md-sidenav
      ref="sidenav"
      class="md-left"
    >
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Menu</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link exact :to="'/home'">
            <md-icon>home</md-icon> <span>Home</span>
          </router-link>
        </md-list-item>
        <md-list-item>
          <router-link exact :to="'/rescuers'">
            <md-icon>directions_run</md-icon> <span>Rescuers</span>
          </router-link>
        </md-list-item>

      <!--  <md-list-item>
          <router-link exact :to="'home'">
           <md-icon>delete</md-icon> <span>Trash</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link exact :to="'home'">
            <md-icon>error</md-icon> <span>Spam</span>
          </router-link>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>-->
      </md-list>
    </md-sidenav>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapState([
        'session'
      ])
    },
    data() {
      return {
      };
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      toggleSidenav() {
        this.$refs.sidenav.toggle();
      },

      logoutCurrentUser() {
        this.logout();
        this.$router.push({
          name: 'login'
        });
      }
    }
  };
</script>

<style lang="scss" module>
.title {
  flex: 1;
}
</style>
