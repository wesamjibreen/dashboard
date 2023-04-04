<template>
  <GMapMap
    :center="center$"
    :zoom="zoom"
    map-type-id="terrain"
    ref="gmap"
    style="width: 100%; height: 300px"
  >
    <!--<input class="input controls seach-box-input"-->
    <!--type="text"-->
    <!--ref="searchBoxInput"-->
    <!--:placeholder="trans('search')"/>-->
    <GMapAutocomplete
      class="input controls seach-box-input"
      type="text"
      ref="searchBoxInput"
      @place_changed="setPlace"
      :placeholder="trans('search')"
    >
    </GMapAutocomplete>

    <div class="operation-btn mt-3">
      <vButton
        class="btn is-success mx-1 mb-2"
        @click="addMarker"
        v-if="hasMarkers && (multiple || this.markers.length === 0)"
      >
        {{ trans("add_marker") }}
      </vButton>
      <vButton
        @click="resetMarkers"
        class="mx-1 mb-2"
        v-if="hasMarkers && (multiple || this.markers.length !== 0)"
      >
        {{ trans("reset_markers") }}
      </vButton>
      <vButton
        class="btn is-success mx-1 mb-2"
        @click="addPolygon"
        v-if="hasPolygons && (multiple || this.polygons.length === 0)"
      >
        {{ trans("add_polygon") }}
      </vButton>
      <vButton
        @click="resetPolygons"
        class="mx-1 mb-2"
        v-if="hasPolygons && (multiple || this.polygons.length !== 0)"
      >
        {{ trans("reset_polygons") }}
      </vButton>
    </div>

    <GMapCluster :styles="clusterIcon">
      <GMapMarker
        v-if="hasMarkers"
        v-for="(m, index) in markers"
        :key="`marker_${index}`"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @dragend="onMarkerDragend($event, m, index)"
      />
      <!--@click="center=m.position"-->
      <GMapPolygon
        v-if="hasPolygons"
        v-for="(polygon, index) in polygons"
        :draggable="true"
        :editable="true"
        :options="options"
        :clickable="true"
        :paths="polygon"
        @paths_changed="onPolygonPathUpdate($event, polygon, index)"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script>
import input from "../mixins/input";
import * as axios from "axios";
// import {Axios as axios} from "axios";

const DEFAULT_LAT = 41.01798319831808;
const DEFAULT_LNG = 28.90449804687501;
export default {
  name: "MapField",
  mixins: [input],
  props: {
    coordinates: {
      required: false,
      default: {
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LNG,
      },
    },
    markers: {
      required: false,
      default: null,
    },
    polygon: {
      required: false,
    },
    zoom: {
      required: false,
      default: 10,
    },
    disableMarker: {
      required: false,
      default: false,
    },
    mode: {
      default: "marker", // show, marker, polygon
      required: false,
    },
    multiple: {
      default: false,
      required: false,
    },
  },
  data() {
    return {
      updated: false,
      center: null,
      key: "map_key",
      searchValue: "",
      markers: [],
      polygons: [],
      bounds: {
        north: 33.685,
        south: 33.671,
        east: -116.234,
        west: -116.251,
      },
      options: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,

      },
    };
  },
  methods: {
    onInputCreated() {
      // this.$watch(this.mode === "marker" ? this.markers$ : this.polygons$,
      //     function (newVal) {
      //         alert('newVal');
      //     }.bind(this))
    },

    resetMarkers() {
      this.markers = [];
      this.$nextTick(() => {
        this.touch();
      });
    },

    setPlace(place) {
      let location = _.get(place, "geometry.location");
      let GEOPoint = {
        lat: location.lat(),
        lng: location.lng(),
      };

      if (this.mode === "marker") this.setPlaceMarker(GEOPoint);
      else this.setAreaPolygon(place.name, GEOPoint);


      this.$nextTick(() => {
        this.touch();
        this.setCenterPoint(GEOPoint);
      });
    },

    setCenterPoint(GEOPoint = null) {
      if (this.checkPointIsValid(GEOPoint)) _.set(this, "center$", GEOPoint);

      // if (GEOPoint?.lat && GEOPoint?.lng)
    },

    setPlaceMarker(GEOPoint) {
      if (!(this.multiple || this.markers.length === 0)) return;

      this.addMarker(GEOPoint);
    },

    addMarker(GEOPoint = null) {

      this.markers.push({
        position: this.checkPointIsValid(GEOPoint) ? GEOPoint : this.center$,
      });
      this.$nextTick(() => {
        this.touch();
      });
    },

    checkPointIsValid(point) {
      return point?.lat && point?.lng;
    },

    addPolygon($event, paths = null) {
      paths = paths ?? this.defaultPolygonPaths;
      this.polygons.push(paths instanceof Array ? paths : []);
      this.$nextTick(() => {
        this.touch();
      });
    },

    onMarkerDragend({ latLng }, marker, i) {
      _.set(this.markers, `${i}.position`, {
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
      this.$nextTick(() => {
        this.touch();
      });
    },

    touch() {
      this.$commit(this.committedInput);
    },

    onPolygonPathUpdate(mvcArray, polygon, index) {
      let path = [];
      for (let i = 0; i < mvcArray.getLength(); i++) {
        for (let j = 0; j < mvcArray.getAt(i).getLength(); j++) {
          path.push({
            lat: mvcArray.getAt(i).getAt(j).lat(),
            lng: mvcArray.getAt(i).getAt(j).lng(),
          });
        }
      }
      this.polygons[index] = path;
    },

    resetPolygons() {
      this.polygons = [];
      this.$nextTick(() => {
        this.touch();
      });
    },

    setAreaPolygon(searchValue, searchCoordinates) {
      let coordinates_points = [
        {
          lat: searchCoordinates.lat,
          lng: searchCoordinates.lng,
        },
        {
          lat: searchCoordinates.lat,
          lng: searchCoordinates.lng,
        },
      ];
      const OSMEndPoint = {
        url: `https://nominatim.openstreetmap.org/search.php?q=${searchValue}&polygon_geojson=1&format=json`,
        method: "GET",
      };

      // fetch polygon from OMS API, if available
      const _this = this;
      const countryCode = "ps";
      const url = `https://nominatim.openstreetmap.org/search.php?q=${searchValue}&polygon_geojson=1&format=json&polygon_threshold=0.001&countrycodes=${countryCode}`;
      axios
        .get(url)
        .then(
          function ({ data }) {
            const geojson = data[Object.keys(data)[0]].geojson;
            if (geojson.type === "Polygon" || geojson.type === "polygon") {
              // apply polygon to map
              const polygon = geojson.coordinates[0];
              const gPolygon = [];
              polygon.forEach((polygon) => {
                gPolygon.push({ lat: polygon[1], lng: polygon[0] });
              });
              coordinates_points = gPolygon;
              console.log("MAP final coor", coordinates_points);
              this.resetPolygons();
              this.addPolygon(null, coordinates_points);
            }
          }.bind(this)
        )
        .catch(function (error) {
          // _this.setPolygonPath(coordinates_points);
          // _this.updatePolygonPoints();
        });
    },
  },
  computed: {
    committedInput() {
      // alert('ok committedInput');
      switch (this.mode) {
        case "marker":
          return this.multiple
            ? this._markers
            : _.get(this, "_markers.0", null);
        case "polygon":
          return this.multiple
            ? this.polygons
            : _.get(this, "polygons.0", null);
      }
    },

    hasMarkers() {
      return this.mode === "marker";
    },
    hasPolygons() {
      return this.mode === "polygon";
      // return true;
    },
    defaultPolygonPaths() {
      return [this.center$, this.center$];
    },
    clusterIcon() {
      return [
        {
          width: 30,
          height: 30,
          className: "custom-clustericon-1",
        },
        {
          width: 40,
          height: 40,
          className: "custom-clustericon-2",
        },
        {
          width: 50,
          height: 50,

          className: "custom-clustericon-3",
        },
      ];
    },
    center$: {
      get() {
        if (this.center?.lat && this.center?.lng) return this.center;

        return this.defaultCoordinates;
      },
      set(newVal) {
        this.center = newVal;
      },
    },
    // markers$() {
    //
    //     if (this.coordinates instanceof Array)
    //         return _.map(this.coordinates, (item) => {
    //             return {
    //                 position: {
    //                     lat: Number((parseFloat(item.latitude)).toFixed(7)),
    //                     lng: Number((parseFloat(item.longitude)).toFixed(7)),
    //
    //                 },
    //             }
    //         });
    //     return [
    //         {
    //             position: this.defaultCoordinates,
    //         }
    //     ]
    // },

    // markers$: {
    //     get() {
    //         return this.markers;
    //     },
    //
    //     set(newVal) {
    //         alert('okkk');
    //         console.log('markers', newVal);
    //         this.$commit(newVal);
    //     }
    // },

    _markers() {
      return (this.markers ?? []).map((marker) => {
        return marker.position;
      });
    },

    polygons$: {
      get() {
        return this.polygons;
      },

      set(newVal) {
        // alert('okkk');
        // console.log('markers', newVal);
        this.$commit(newVal);
      },
    },

    defaultCoordinates() {
      return {
        lat: _.get(this, "coordinates.lat", DEFAULT_LAT),
        lng: _.get(this, "coordinates.lng", DEFAULT_LNG),
      };
    },
    paths$() {
      return [
        this.defaultCoordinates,
        {
          lat: 33.55225255,
          lng: 24.34535355,
        },
      ];
      return _.map(_.get(this, "polygon", []), function (point) {
        return {
          lat: point.latitude,
          lng: point.longitude,
        };
      });
    },
  },
  watch: {
    committedInput: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // if (this.updated || !(this.mode === "marker" && this.multiple))
        // if (this.updated)
        //     this.$commit(newVal);
      },
    },
    inputValue: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (!newVal || this.updated) return;

        switch (true) {
          case this.mode === "marker" && this.multiple:
            _.set(
              this,
              "markers",
              _.map(JSON.parse(JSON.stringify(newVal)), (marker) => {
                return {
                  position: marker,
                };
              })
            );
            this.$nextTick(function () {
              this.updated = true;
            });
            break;

          case this.mode === "marker" && !this.multiple:
            // this.center$ = newVal.lat ? newVal : this.defaultCoordinates;
            this.setCenterPoint(newVal);
            this.markers = [{ position: newVal }];
            this.$nextTick(function () {
              this.updated = true;
            });
            break;

          case this.mode === "polygon" && this.multiple:
            this.polygons =
              newVal instanceof Array && newVal[0] instanceof Array
                ? newVal
                : [];
            this.setCenterPoint(_.get(newVal, "0.0", null));
            this.$nextTick(function () {
              this.updated = true;
            });
            break;

          case this.mode === "polygon" && !this.multiple:
            this.addPolygon(null, newVal);
            this.setCenterPoint(_.get(newVal, "0", null));
            this.$nextTick(function () {
              this.updated = true;
            });
            break;
        }
      },
    },
    // paths$: function () {
    //     this.refresh();
    // },
    // markers$: {
    //     immediate: true,
    //     deep: true,
    //     handler(newVal) {
    //
    //     }
    // }
  },
};
</script>

<style lang="scss">
.custom-clustericon-1 {
  span {
    font-size: 16px;
    background-color: #fac800;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0px 0px 20px #fac800bf;
    color: #fff;
    display: inline-block;
    min-width: 28px;
  }
}

.custom-clustericon-2 {
  span {
    font-size: 16px;
    background-color: #fac800;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0px 0px 20px #fac800bf;
    color: #fff;
    display: inline-block;
    min-width: 28px;
  }
}

.custom-clustericon-3 {
  span {
    font-size: 16px;
    background-color: #fac800;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0px 0px 20px #fac800bf;
    color: #fff;
    display: inline-block;
    min-width: 28px;
  }
}

.vue-map {
  min-height: 20rem;
}

input.input.controls.seach-box-input {
  position: absolute;
  top: 3%;
  width: 30%;
  right: 10%;
}
@media (max-width: 900px) {
  input.input.controls.seach-box-input {
    top: 14%;
    width: 94%;
    right: 3%;
  }
}
</style>
