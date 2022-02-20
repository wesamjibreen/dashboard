<template>
    <div class="radio-list p-0">
        <label v-for="option in optionsData"
               class="radio"
               :class="[
      solid ? 'is-solid' : 'is-outlined',
      square && 'is-square',
      color && `is-${color}`,
      paddingless && 'is-paddingless',
    ]"
        >
            <input type="radio"
                   v-model="input"
                   :name="model$"
                   :value="option[optionValue]"/>
            <span></span>
            {{ option[optionName] }}

        </label>


        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>
    </div>
</template>

<script>
    import input from "../mixins/input";
    import options from "../mixins/options";

    export default {
        name: "RadioField",
        props: {
            solid: Boolean,
            square: Boolean,
            color: {
                required: false,
                default: "primary"
            },
            paddingless: Boolean
        },
        mixins: [input, options],
    }
</script>

<style scoped>

</style>
