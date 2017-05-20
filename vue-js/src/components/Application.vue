<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">My App</h2>
    </md-toolbar>


    <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
    </md-sidenav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      toggleSidenav() {
        this.$refs.sidenav.toggle();
      }
    }
  };
</script>

<style lang="scss" module>
</style>
