<script>
import * as list from "./partials/list";

export default {
  name: "List",
  template: `<VList v-bind="list"></VList>`,
  data() {
    return {
      list,
    }
  }
}
</script>

<style scoped>

</style>
