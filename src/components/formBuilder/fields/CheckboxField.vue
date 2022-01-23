<template>
    <div class="checkbox-list">
        <label v-if="!single"
               v-for="(option) in optionsData"
               :class="`checkbox is-outlined is-${color}`"
               :for="`check_box_${model$}_${option[optionValue]}`"
        >
            <input
                    :id="`check_box_${model$}_${option[optionValue]}`"
                   v-model="input"
                   :name="model$"
                   :value="option[optionValue]"
                   type="checkbox">
            <span></span>
            {{ trans(option[optionName]) ?? option[optionName] }}
        </label>

        <label v-if="single" class="checkbox " :for="`check_box_${model$}`">
            <input :id="`check_box_${model$}`" v-model="input" :name="model$" :value="value" type="checkbox">
            <span></span>
            {{ trans(label$ )}}
        </label>
    </div>
</template>

<script>

    import input from "../mixins/input";
    import options from "../mixins/options";

    export default {
        name: "CheckboxField",
        mixins: [input, options],
        props: {
            single: {
                required: false,
                default: false
            },
            color: {
                required: false,
                default: "primary"
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
                return !this.single ? [] : null;
            },
        },
        methods: {
            /**
             * this method called to passing input value to commit function
             * it can be overwritten in the input component
             * default will return parsed newVal
             * @author Mahmoud
             */
            passingInput(newVal) {
                return newVal ? newVal : [];
            },

            onInputCreated() {
                this.input = this.input ?? this.defaultValue;
            },
        },
    }

</script>

<style scoped>

</style>
