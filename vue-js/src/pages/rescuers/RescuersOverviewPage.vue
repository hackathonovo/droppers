<template>
  <div>
    <div
      :class="$style.loader"
      v-if="isRescuersLoading"
    >
      <md-spinner md-indeterminate class="md-warn"></md-spinner>
    </div>
    <div v-else>
      <md-table-card :class="$style.card">
        <md-table md-sort="firstName" @sort="reOrder">
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="firstName">First name</md-table-head>
              <md-table-head md-sort-by="lastName">Last name</md-table-head>
              <md-table-head md-sort-by="phoneNumber">Phone number</md-table-head>
              <md-table-head md-sort-by="email">Email</md-table-head>
              <md-table-head md-sort-by="adress">Adress</md-table-head>
              <md-table-head md-sort-by="speciality">Speciality</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row
              :key="res.id"
              :class="$style.row"
              v-for="res in orderedRescuers"
              @click.native.prevent="rowSelected(res.id)"
            >
              <md-table-cell md-sort-by="res.firstName">{{res.firstName}}</md-table-cell>
              <md-table-cell>{{res.lastName}}</md-table-cell>
              <md-table-cell>{{res.phoneNumber}}</md-table-cell>
              <md-table-cell>{{res.email}}</md-table-cell>
              <md-table-cell v-if="res.address">{{res.address.street + ' ' + res.address.streetNumber}}</md-table-cell>
              <md-table-cell v-else>No info</md-table-cell>
              <md-table-cell v-if="res.specialties">{{res.specialties.join(', ')}}</md-table-cell>
              <md-table-cell v-else>No info</md-table-cell>
            </md-table-row>
          </md-table-body>

        </md-table>
      </md-table-card>

      <router-link :to="'/rescuers/new'">
        <md-button
          class="md-fab md-fab-bottom-right"
        >
          <md-icon>add</md-icon>
        </md-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import orderBy from 'lodash.orderby';

  export default {
    computed: {
      ...mapGetters([
        'isRescuersLoading',
        'rescuers'
      ]),

      orderedRescuers() {
        return orderBy(this.rescuers, this.orderField, this.direction);
      }
    },

    methods: {
      ...mapActions([
        'fetchRescuers'
      ]),

      rowSelected(index) {
        this.$router.push({
          path: `/rescuers/details/${index}`
        });
      },

      reOrder(object) {
        this.orderField = object.name;
        this.direction = object.type;
      }
    },

    data() {
      return {
        orderField: 'id',
        direction: 'asc'
      };
    },

    created() {
      this.fetchRescuers();
    }
  };
</script>

<style lang="scss" module>
  .card {
    max-width: 1200px;
    padding: 20px;
    margin: 20px auto;
  }

  .loader {
    display: flex;
    width: 100%;
  }

  .row {
    cursor: pointer;
  }
</style>
