<template>
  <div>
    <div
      :class="$style.loader"
      v-if="isHistoryLoading"
    >
      <md-spinner md-indeterminate class="md-warn"></md-spinner>
    </div>
    <div v-else>
      <md-table-card :class="$style.card">
        <md-table md-sort="description" @sort="reOrder">
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="description">Description</md-table-head>
              <md-table-head md-sort-by="injuredContact">Injured person contact</md-table-head>
              <md-table-head md-sort-by="personWhoCalledContact">Incident reporter contact</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row
              :key="act.id"
              :class="$style.row"
              v-for="act in orderedActions"
              @click.native.prevent="rowSelected(act.id)"
            >
              <md-table-cell>{{act.description}}</md-table-cell>
              <md-table-cell>{{act.injuredContact}}</md-table-cell>
              <md-table-cell>{{act.personWhoCalledContact}}</md-table-cell>
            </md-table-row>
          </md-table-body>

        </md-table>
      </md-table-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import orderBy from 'lodash.orderby';

  export default {
    computed: {
      ...mapGetters([
        'isHistoryLoading',
        'history'
      ]),

      orderedActions() {
        return orderBy(this.history, this.orderField, this.direction);
      }
    },

    methods: {
      ...mapActions([
        'fetchHistory'
      ]),

      rowSelected(id) {
        // this.$router.push({
        //   path: `/areas/new/${id}`
        // });
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
      this.fetchHistory();
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
