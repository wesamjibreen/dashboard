<!--<template>-->
    <!--&lt;!&ndash;<FormLayout v-bind="form"></FormLayout>&ndash;&gt;-->
    <!--<Test></Test>-->
<!--</template>-->

<script>
    import form from "./partials/form";
    // import Test ,{} from "./Test";

    export default {
        template : "<FormLayout v-bind=\"form\"></FormLayout>",
        data() {
            return {
                form
            }
        },
        created(){
          // alert('create')
        },
        // components : {
        //     Test,
        // },
    }
</script>
