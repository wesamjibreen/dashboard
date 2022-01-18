<template>
    <div class="field-container">
        <VeeField v-model="input" :name="model$" v-slot="{ field  }">
            <Multiselect :class="{'input' : true, 'is-invalid' : errorMessage && meta.touched}"
                         v-bind="getAttributes({})"
                         v-model="input"
                         :valueProp="optionValue"
                         :trackBy="optionValue"
                         :label="optionName"
                         :placeholder="placeholder$"
                         :multiple="multiple"
                         :options="optionsData">
            </Multiselect>
        </VeeField>

        <span class="invalid" v-if="invalid">
        {{ errorMessage }}
        </span>
    </div>
</template>


<script>
    import input from "../mixins/input";
    import options from "../mixins/options";
    import Multiselect from '@vueform/multiselect'
    import {useInputField} from "../composable/useInputField";

    export default {
        name: "SelectField",
        components: {
            Multiselect,
        },
        setup(props) {
            return {
                ...useInputField(props)
            };
        },
        mixins: [input, options],
        methods: {
            getAttributes(field) {
                if (this.multiple)
                    field['mode'] = 'tags';

                return field;
            }
        },

    };
</script>

