<template>
    <FormLayout v-bind="form"></FormLayout>
</template>

<script>
    import form from  "./partials/form";
    export default {
        data() {
            return {
                form
            }
        },
        created(){
            alert('FormLayout')
        },
    }
</script>
