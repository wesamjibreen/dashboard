<template>
    <div class="asset-category card py-5">
        <div class="category" v-for="category in data$" @click="onClick(category)">
            <div class="asset">
                <div class="asset-logo">
                    <i aria-hidden="true" :class="$get(category, iconKey)"></i>
                </div>
            </div>
            <div class="asset-name"> {{ $get(category, textKey)}}</div>
        </div>
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-gold-bar"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Gold</div>-->
        <!--</div>-->
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-apartment"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Real Estate</div>-->
        <!--</div>-->
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-leaves"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Food</div>-->
        <!--</div>-->
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-laptop-alt-switch"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Technology</div>-->
        <!--</div>-->
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-capsule"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Healthcare</div>-->
        <!--</div>-->
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-atom"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Research</div>-->
        <!--</div>-->
        <!--<div class="category">-->
        <!--<div class="asset">-->
        <!--<div class="asset-logo">-->
        <!--<i aria-hidden="true" class="lnil lnil-diamond-alt"></i>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="asset-name">Finance</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import dashboard from "./dashboard";

    export default {
        name: "Category",
        mixins: [dashboard],
        methods: {
            onClick(category) {
                if (category.to)
                    this.$router.push(category.to)
            }
        }
    }
</script>

<style scoped>

</style>
