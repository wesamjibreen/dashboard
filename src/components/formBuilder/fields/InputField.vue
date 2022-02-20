<template>
    <div :class="{'field-container' : true}">
        <input v-model="input" class="input" :type="type$" :placeholder="placeholder$" />
        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>
    </div>

</template>


<script>
    import input from "../mixins/input";
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "InputField",
        mixins: [input],
        setup(props) {
            return {
                ...useInputField(props)
            };
        },
    };
</script>

<style>

</style>
