<template>
  <div>
    RES DETS

  </div>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
      };
    },

    created() {
      console.log(this.$route.params.id);
      // this.getRescuerDetails(this.$route.params.id);
    }
  };
</script>

<style lang="scss" module>
</style>
