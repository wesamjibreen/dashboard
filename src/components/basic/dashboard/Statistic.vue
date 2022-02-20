<template>
    <div class="business-dashboard company-dashboard">
        <div class="company-header is-dark-card-bordered is-dark-bg-6">
            <div class="header-item is-dark-bordered-12" v-for="item in data$">
                <div class="item-inner">

                    <Icon v-if="isIconify($get(item,iconKey))" :icon="$get(item,iconKey)" class="is-dark-primary"/>
                    <i  v-else aria-hidden="true" :class="`is-dark-primary ${$get(item,iconKey)} `"></i>

                    <span class="dark-inverted">
                        {{  $get(item,valueKey) }}
                    </span>
                    <p>
                        {{ $get(item,textKey) }}
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import dashboard from "./dashboard";

    export default {
        name: "Statistics",
        mixins: [dashboard],
        methods: {

        },

    }
</script>

<style scoped>

</style>