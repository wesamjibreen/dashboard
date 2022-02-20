<template>
    <div class="field-container">
        <o-timepicker :placeholder="placeholder$"
                      class="input"
                      icon="clock"
                      @update:modelValue="onSelect"
                      :modelValue="computedInput"
                      :enable-seconds="enableSeconds"
                      :hour-format="hourFormat"
                      :locale="locale"></o-timepicker>


        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>
    </div>
</template>
<script>
    import input from "../mixins/input";

    export default {
        name: "TimeField",
        mixins: [input],
        data() {
            return {
                hourFormat: undefined, // Browser locale
                enableSeconds: false,
                locale: undefined // Browser locale
            }
        },
        methods: {
            timeFormatter(date) {
                return date ? (new Date(date)).toString().substr(16, 8) : null;
            },
            onSelect(value) {
                let time = value ?? null;
                this.$commit(this.timeFormatter(time));
            }
        },
        computed: {
            computedInput() {
                return this.input ? new Date(`1970-01-01 ${this.input}`) : null;
            }
        }
    }
</script>