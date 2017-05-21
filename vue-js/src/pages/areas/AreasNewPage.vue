<template>
  <div>
    <div id="map" :class="$style.map"></div>
    <md-button class="md-warn md-raised" @click.native="onSave">Save</md-button>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapGetters} from 'vuex';

  import * as mutationTypes from 'store/mutation-types';

  export default {
    computed: {
      ...mapGetters([
        'actions',
        'isActionsLoaded'
      ])
    },

    methods: {
      ...mapMutations([
        mutationTypes.AREA_DETAIL_SET
      ]),

      ...mapActions([
        'sendAreaDetails'
      ]),

      initMap() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 45.84, lng: 15.894},
          zoom: 8,
          mapTypeId: 'terrain'
        });

        const currAction = this.actions.find((action) => {
          return action.id === this.features.rescueId;
        });

        if (currAction.rescuers) {
          currAction.rescuers.forEach((rescuer) => {
            if (rescuer && rescuer.lat && rescuer.lng) {
              const marker = new window.google.maps.Marker({
                position: {lat: rescuer.latitude, lng: rescuer.longitude},
                map: this.map,
                animation: window.google.maps.Animation.DROP,
                title: rescuer.status || 'Rescuer'
              });

              const infowindow = new window.google.maps.InfoWindow({
                content: rescuer.status || 'Rescuer'
              });

              marker.setMap(this.map);

              marker.addListener('click', function() {
                infowindow.open(this.map, marker);
              });
            }
          });
        }



        if (!currAction.areas) {
          const drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon']
            }
          });
          drawingManager.setMap(this.map);

          window.google.maps.event.addListener(drawingManager, 'polygoncomplete', (poly) => {
            const lines = poly.getPaths().b[0].b;
            const polygon = [];

            lines.forEach((line) => {
              polygon.push([
                line.lng(),
                line.lat()
              ]);
            });

            this.features.coordinates = [polygon];
          });
        } else {
          const polyCoords = currAction.areas[0].coordinates[0].map((coord) => {
            return {
              lng: coord[0],
              lat: coord[1]
            };
          });

          const polygon = new window.google.maps.Polygon({
            paths: polyCoords
          });
          polygon.setMap(this.map);
        }
      },

      onSave() {
        this[mutationTypes.AREA_DETAIL_SET](this.features);
        this.sendAreaDetails();

        this.$router.push({
          path: '/actions'
        });
      },

      onFInish() {
        this[mutationTypes.AREA_DETAIL_SET](this.features);
        this.sendAreaDetails();

        this.$router.push({
          path: '/actions'
        });
      }
    },

    data() {
      return {
        map: null,
        features: {
          rescueId: this.$route.params.id,
          coordinates: []
        }
      };
    },

    mounted() {
      if (!this.isActionsLoaded) {
        this.$router.push({
          path: '/actions'
        });
      }
      this.initMap();
    }
  };
</script>

<style lang="scss" module>
  .map {
    height: 600px;
    width: 750px;
    margin: 50px auto
  }
</style>
