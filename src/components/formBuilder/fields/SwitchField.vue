<template>
    <VSwitchBlock color="success" thin :checked="input"/>
</template>

<script>
    import input from "../mixins/input";

    export default {
        name: "SwitchField",
        mixins: [input],
        computed: {
            defaultValue() {
                /**
                 * computed property returns default input value
                 * used to init input by this value
                 *
                 * @author WeSSaM
                 */
                return false;
            },
        },
    };
</script>

<style scoped>

</style>