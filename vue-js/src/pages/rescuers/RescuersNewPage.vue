<template>
  <md-card :class="$style.card">
    <md-card-header-text>
      <div class="md-title">New rescuer</div>
    </md-card-header-text>
    <md-card-content>
      <form novalidate @submit.prevent="formSubmit">
        <label>Name</label>

        <md-input-container>
          <label>First name</label>
          <md-input v-model="form.firstName"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Last name</label>
          <md-input v-model="form.lastName"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Password</label>
          <md-input type="password" v-model="form.password"></md-input>
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
          <md-input type="tel" v-model="form.phoneNumber"></md-input>
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
        <md-input-container>
          <label>Specialties</label>
          <md-select multiple v-model="form.specialties">
            <md-subheader>Specialties</md-subheader>
            <md-option v-for="spec in specialties" :key="spec.name" :value="spec.name">{{spec.label}}</md-option>
          </md-select>
        </md-input-container>
        <div>
          <md-checkbox v-model="form.hasSearchDog">Search dog</md-checkbox>
        </div>

        <label>Weekly schedule</label>
        <md-input-container :class="$style.dayInput">
          <label>Hour Start</label>
          <md-input type="number" v-model="form.availablePeriods[0].startHour"></md-input>
        </md-input-container>
        <md-input-container :class="$style.dayInput">
          <label>HourEnd</label>
          <md-input type="number" v-model="form.availablePeriods[0].endHour"></md-input>
        </md-input-container>
        <md-button class="md-warn md-raised" type="submit">Submit</md-button>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  import specialties from 'enums/specialties';
  import * as mutationTypes from 'store/mutation-types';


  export default {
    components: {
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      ...mapMutations([
        mutationTypes.RESCUERS_DETAIL_EDIT
      ]),
      ...mapActions([
        'sendRescuerDetails'
      ]),

      formSubmit() {
        this[mutationTypes.RESCUERS_DETAIL_EDIT](this.form);
        this.sendRescuerDetails();

        this.$router.push({
          path: '/rescuers'
        });
      }
    },
    data() {
      return {
        specialties,
        form: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          rank: '',
          region: '',
          hasSearchDog: null,
          specialties: [],
          password: '',
          address: {
            city: '',
            country: '',
            postalCode: '',
            street: '',
            streetNumber: ''
          },
          availablePeriods: [{
            day: 'ALL',
            startHour: null,
            endHour: null
          }]
        }
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
