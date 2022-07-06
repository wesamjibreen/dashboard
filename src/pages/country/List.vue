<template>
    <VList v-bind="list"></VList>
</template>

<script>
import * as list from "./partials/list";

export default {
  name: "List",
  data() {
    return {
      list,
      endPoint: () => {
        return {
          name: "country.list",
        };
      },
    };
  },
  created() {
    // alert('list');
  },
};
</script>

<style scoped>
</style>