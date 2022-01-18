<template>
    <div :class="{'field-container' : true}">
        <!--<VeeField v-model="input" :name="model$" v-slot="{ field  }">-->
        <!--<input :class="{'input' : true, 'is-danger' : errorMessage && meta.touched}"-->
        <!--:type="type$"-->
        <!--:placeholder="placeholder$"-->
        <!--v-bind="field"-->
        <!--/>-->
        <!--</VeeField>-->
        <!--{{model$ }}-->
        <input v-model="input"
               :class="{
               'input' : true,
               'is-danger' : errorMessage && meta.touched
               }"
               :type="type$"
               :placeholder="placeholder$" />

        <span v-if="errorMessage && meta.touched" class="icon is-right has-text-danger">
            <i class="fa fa-warning"></i>
        </span>

        <!--<span class="invalid" v-if="errorMessage && meta.touched">-->
            <!--{{ errorMessage }}-->
        <!--</span>-->
        <!---->
        <div v-if="hasErrors">
            <span  class="invalid"  v-for="error in errorsBag"> {{ error}}</span>
        </div>


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
