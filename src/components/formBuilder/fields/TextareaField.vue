<template>
    <div :class="{'field-container' : true, 'is-invalid' : errorMessage && meta.touched}">
        <VeeField v-model="input" :name="model$" v-slot="{ field  }">
                <textarea :name="model$"
                          v-bind="field"
                          :class="{'textarea' : true}"
                          rows="4"
                          :placeholder="placeholder$"
                          autocomplete="off"
                          autocapitalize="off"
                          spellcheck="true"></textarea>
        </VeeField>
        <span class="invalid" v-if="errorMessage && meta.touched">
            {{ errorMessage }}
        </span>
    </div>
</template>


<script>
    import input from "../mixins/input";
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "TextareaField",
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

