<template>
  <VLoader size="small" :active="loading">
    <div v-for="(component, index) in components" :key="index">
      <component
        :is="component.component"
        v-bind="component"
        :resource="resource"
      />
    </div>
  </VLoader>
</template>

<script>
import Statistic from "./dashboard/Statistic";
import Table from "./dashboard/Table";
import Card from "./dashboard/Card";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: { Card, Statistic, Table },
  props: {
    loading: {
      default: false,
    },
    components: {
      default: [],
    },
    resource: String,
  },
  setup() {
    const route = useRoute();
    const id = computed(() => route.params.id);

    return {
      id,
    };
  },
  data() {
    return {
      loading: false,
      components: [],
    };
  },
  mounted() {
    this.loading = true;
    this.request(
      this.$endPoint(`${this.resource}.find`, this.id),
      {},
      function ({ data }) {
        this.components = data.data;
        this.loading = false;
      }.bind(this),
      function (err) {
        this.loading = false;
      }.bind(this)
    );
  },
  computed: {
  },
  methods: {},
};
</script>
