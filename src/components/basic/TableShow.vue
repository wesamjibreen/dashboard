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

export default {
  components: { Statistic, Table },
  props: {
    loading: {
      default: false,
    },
    components: {
      default: [],
    },
    resource: String,
  },
  data() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>
