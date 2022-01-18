<template>
    <div class="field-container">
        <v-date-picker v-model="input" mode="time" :model-config="modelConfig">
            <template v-if="!inline" #default="{ inputValue, inputEvents }">
                <input class="input"
                       :class="{'is-invalid' : errorMessage && meta.touched}"
                       type="text"
                       :placeholder="placeholder$"
                       :value="input"
                       v-on="inputEvents"/>
            </template>
        </v-date-picker>
        <span class="invalid" v-if="errorMessage && meta.touched">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script>
    import input from "../mixins/input";
    import {DatePicker} from 'v-calendar';
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "TimeField",
        mixins: [input],
        components: {
            "v-date-picker": DatePicker
        },
        props: {
            inline: {
                default: false
            }
        },
        data() {
            return {
                modelConfig: {
                    type: 'string',
                    mask: 'HH:mm:ss', // Uses 'iso' if missing
                },
            }
        },
        setup(props) {
            return {
                ...useInputField(props)
            };
        },
        computed: {
            defaultValue() {
                return "00:00:00"
            }
        }

    }
</script>

<style>

</style>
