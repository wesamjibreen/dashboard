<template>
    <VSwitchBlock  v-model="input" :color="color" thin/>
</template>

<script>
    import input from "../mixins/input";

    export default {
        name: "SwitchField",
        mixins: [input],
        props : {
          color : {
              default : "success"
          }
        },
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