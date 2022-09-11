<template>
  <div class="business-dashboard flights-dashboard mb-2">
    <div class="card input-icon p-2">
      <div class="booking-bar column is-5">
        <component
          v-for="input in data$"
          :is="`${input.component}-field`"
          v-model="form[input.model]"
          v-bind="input"
        />
        <!--<DateField range v-model="form.range" @update:modelValue="fetch"></DateField>-->
      </div>
    </div>
  </div>
</template>

<script>
import { object } from "yup/lib/locale";
import dashboard from "./dashboard";

export default {
  name: "Filters",
  mixins: [dashboard],
  data: () => ({
    form: {},
  }),
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.$router.push({ query: newVal });
        this.$emit("refetch", newVal);
      },
    },
  },
};
</script>

<style >

.input-icon .o-icon.o-input__icon-left {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-text);
    left: unset;
    inset-inline-end: 0;
}
</style>
