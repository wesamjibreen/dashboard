<template>
    <div class="business-dashboard flights-dashboard mb-5">
        <div class="booking-bar-wrapper">
            <img class="travel-illustration light-image" src="/panel/images/illustrations/dashboards/flights/travel.svg"
                 alt=""/>
            <div class="booking-bar-info">
                <i aria-hidden="true" class="lnil lnil-plane-alt"></i>
                <div class="inner">
                    <h2 class="booking-bar-heading">
                        Paris
                        <small>[PAR]</small>
                        - New York
                        <small>[NY]</small>
                    </h2>
                    <p class="booking-bar-sub-heading">1 adult - Business</p>
                </div>
            </div>
            <div class="booking-bar column is-4">
                <component v-for="input in data$"
                           :is="`${input.component}-field`"
                           v-model="form[input.model]"
                           v-bind="input"/>
                <!--<DateField range v-model="form.range" @update:modelValue="fetch"></DateField>-->
            </div>
        </div>
    </div>
</template>

<script>
    import dashboard from "./dashboard";

    export default {
        name: "Filters",
        mixins: [dashboard],
        data: () => ({
            form: {

            }
        }),
        watch: {
            form: {
                deep: true,
                immediate: true,
                handler(newVal) {
                    this.$router.push({query : newVal})
                    // this.$emit('on-filter', newVal);
                }
            }
        }
    }
</script>

<style scoped>

</style>