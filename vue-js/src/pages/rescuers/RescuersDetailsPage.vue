<template>
  <div>
      <md-card v-if="isRescuersLoaded && !isEditMode" :class="$style.card">
        <div class="md-headline">{{getRescuerDetails.firstName + ' ' + getRescuerDetails.lastName}}</div>

        <div class="md-subheading">{{getRescuerDetails.email}}</div>
        <div class="md-subheading">{{getRescuerDetails.phoneNumber}}</div>
        <div class="md-subheading" v-if="getRescuerDetails.specialities">{{getRescuerDetails.specialities.join(', ')}}</div>
        <div v-show="getRescuerDetails.hasSearchDog" class="md-subheading">Has search dog</div>
        <div class="md-subheading">{{getRescuerDetails.rank}}</div>
        <div class="md-subheading">{{getRescuerDetails.region}}</div>
      </md-card>

      <md-card v-show="isEditMode" :class="$style.card">
        <md-card-header-text>
          <div class="md-title">Edit rescuer</div>
        </md-card-header-text>
        <md-card-content>
          <form novalidate>
            <label>Name</label>

            <md-input-container>
              <label>First name</label>
              <md-input v-model="form.firstName"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Last name</label>
              <md-input v-model="form.lastName"></md-input>
            </md-input-container>

            <label>Address</label>

            <md-input-container>
              <label>City</label>
              <md-input v-model="form.address.city"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Country</label>
              <md-input v-model="form.address.country"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Postal code</label>
              <md-input v-model="form.address.postalCode"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Street name</label>
              <md-input v-model="form.address.street"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Street number</label>
              <md-input v-model="form.address.streetNumber"></md-input>
            </md-input-container>

            <label>Contact</label>

            <md-input-container>
              <label>Email</label>
              <md-input v-model="form.email"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Phone number</label>
              <md-input v-model="form.phoneNumber"></md-input>
            </md-input-container>

            <label>Other</label>

            <md-input-container>
              <label>Rank</label>
              <md-input v-model="form.rank"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Region</label>
              <md-input v-model="form.region"></md-input>
            </md-input-container>
            <div>
              <md-checkbox v-model="form.hasSearchDog">Search dog</md-checkbox>
            </div>

            <label>Schedule</label>

          </form>
        </md-card-content>
      </md-card>

      <md-button
        class="md-fab md-fab-bottom-right"
        v-if="isRescuersLoaded"
        @click.native="toggleEditMode"
      >
        <md-icon v-if="isEditMode" @click.native="formSubmit">save</md-icon>
        <md-icon v-else>edit</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import * as mutationTypes from 'store/mutation-types';
  import specialties from 'enums/specialties';

  export default {
    computed: {
      ...mapGetters([
        'isRescuersLoaded',
        'getRescuerDetails'
      ])
    },

    watch: {
      isRescuersLoaded() {
        this.setRescuerDetails();
        this.form = this.getRescuerDetails;
      }
    },

    methods: {
      ...mapActions([
        'fetchRescuers',
        'patchRescuerDetails'

      ]),

      ...mapMutations([
        mutationTypes.RESCUERS_DETAIL_SET,
        mutationTypes.RESCUERS_DETAIL_EDIT
      ]),

      toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        this.form = this.getRescuerDetails;
      },

      setRescuerDetails() {
        this[mutationTypes.RESCUERS_DETAIL_SET](this.$route.params.id);
      },
      formSubmit() {
        this[mutationTypes.RESCUERS_DETAIL_EDIT](this.form);
        this.patchRescuerDetails();
      }
    },

    data() {
      return {
        specialties,
        isEditMode: false,
        form: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          rank: '',
          region: '',
          hasSearchDog: null,
          specialties: [],
          address: {
            city: '',
            country: '',
            postalCode: '',
            street: '',
            streetNumber: ''
          },
          availablePeriods: []
        }
      };
    },

    created() {
      if (this.isRescuersLoaded) {
        this.setRescuerDetails();
      }
      this.fetchRescuers();
    }
  };
</script>

<style lang="scss" module>
  .card {
    max-width: 500px;
    padding: 20px;
    margin: 20px auto;
  }
</style>
