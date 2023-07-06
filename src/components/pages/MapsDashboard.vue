<template>
    <MapBox :title="title" :rows="rows" :map-type="type" :access-token="accessToken"/>
</template>

<script>
import MapBox from "../MapBox.vue";

export default {
    name: "MapsDashboard",
    props: {
        title: String,
        type: {
            type: String,
            default: "FeatureCollection"
        },
        rows: {
            type: Array,
            default: []
        },
    },
    components: {MapBox},
    computed: {
        accessToken() {
            return this.appConfig("mapbox.key")
        }
    }
}
</script>
