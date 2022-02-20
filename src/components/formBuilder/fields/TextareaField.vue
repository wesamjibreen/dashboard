<template>
    <div :class="{'field-container' : true, 'is-invalid' : errorMessage && meta.touched}">
        <textarea :name="model$"
                  v-model="input"
                  :class="{'textarea' : true}"
                  rows="4"
                  :placeholder="placeholder$"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="true"></textarea>

        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>
    </div>
</template>


<script>
    import input from "../mixins/input";

    export default {
        name: "TextareaField",
        mixins: [input],
    };
</script>

<style>

</style>

