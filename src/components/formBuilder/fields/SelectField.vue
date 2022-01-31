<template>
    <div class="field-container">
        <VeeField v-model="input" :name="model$" v-slot="{ field  }">
            <Multiselect :class="{'input' : true, 'is-invalid' : errorMessage && meta.touched}"
                         v-bind="getAttributes({})"
                         v-model="input"
                         :close-on-select="!multiple"
                         :searchable="true"
                         :valueProp="optionValue"
                         :trackBy="optionValue"
                         :label="optionName"
                         :placeholder="placeholder$"
                         :multiple="multiple"
                         :options="optionsData">
                <template #multiplelabel="{ values }">
                    <div class="multiple-label">
                        <span class="value-label" v-for="(value , index) in  values">
                            {{ value[optionName] }}
                            <i class="close-label fas fa-times" @click="removeItem(value,index)"></i>
                        </span>
                    </div>
                </template>


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
            removeItem(item, index) {
                this.input = (this.input ?? []).filter((option) => {
                    return option !== item?.[this.optionValue];
                });
            },
            getAttributes(field) {
                if (this.multiple)
                    field['mode'] = 'multiple';

                return field;
            }
        },

    };
</script>

<style>
    .multiple-label {
        position: absolute;
    }

    span.value-label {
        background-color: #f0f0f0;
        padding: 5px;
        margin-left: 5px;
        margin-right: 6px;
        font-size: 14px;
        border-radius: 5px;
    }

    i.close-label {
        margin: 0 5px;
    }

</style>
