<template>
    <div class="form-fieldset" v-show="isDisplayed({show})">
        <div class="fieldset-heading columns">
            <div class="column is-6">
                <h4>{{ translatedTitle }}</h4>
                <p> {{ translatedDescription }}</p>
            </div>
            <div v-if="hasMultiLangInputs" class="column is-6 tabs is-toggle is-toggle-rounded">
                <ul class="floating-tabs">
                    <li :class="{'is-active' : currentLanguage === language.locale}" v-for="language in languages">
                        <a href="javascript:;" @click="currentLanguage = language.locale">
                            <span>{{ language.symbol}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="columns is-multiline">
            <div v-for="input in multiLangInputs" :class="`column is-${input.cols ?? 12}`" v-show="isDisplayed(input)">
                <VField>
                    <label> {{ getInputLabel(input) }} ({{ currentLanguage.toUpperCase() }})</label>
                    <VControl icon="feather:user" :model="input.model">
                        <component :is="`${input.component}-field`" :formModule="formModule" :locale="currentLanguage"
                                   v-bind="input"/>
                    </VControl>
                </VField>
            </div>
        </div>
        <div class="columns is-multiline">
            <div v-for="input in nonMultiLangInputs" :class="`column is-${input.cols ?? 12}`"
                 v-show="isDisplayed(input)">
                <VField>
                    <label>{{ getInputLabel(input) }} </label>
                    <VControl :icon="input.icon" :model="input.model">
                        <component :is="`${input.component}-field`" :formModule="formModule" v-bind="input"/>
                    </VControl>
                </VField>
            </div>
        </div>
    </div>
</template>

<script>
    import * as VeeValidate from 'vee-validate'
    import {mapState} from "vuex";

    export default {
        name: "Fieldset",
        props: {
            title: String,
            description: String,
            formModule: String,
            inputs: {
                type: Array,
                default: []
            },
            show: {
                default: null
            }
        },
        components: {
            VForm: VeeValidate.Form,
            VeeField: VeeValidate.Field,
            ErrorMessage: VeeValidate.ErrorMessage,
        },
        data() {
            return {
                currentLanguage: null
            }
        },
        created() {
            if (!this.currentLanguage)
                this.currentLanguage = _.get(this, 'languages.0.value', "ar");
        },
        methods: {
            getInputLabel(input) {
                return this.trans(input.label ?? input.model);
            },
            isDisplayed(item) {
                switch (typeof item.show) {
                    case  "string" :
                        return eval(item.show);
                    case "function" :
                        return item.show.bind(this).call();

                    default :
                        return true;
                }
            }
        },
        computed: {
            translatedTitle() {
                return this.title ? this.trans(this.title) : "";
            },
            translatedDescription() {
                return this.description ? this.trans(this.description) : "";
            },
            computedInputs() {
                return this.inputs;

                // return _.map(JSON.parse(JSON.stringify(this.inputs)), (input) => {
                //     input.label = this.trans(input.label);
                //     return input;
                // });
            },
            multiLangInputs() {
                return _.filter(this.computedInputs, (input) => {
                    return input.multiLang;
                })
            },
            nonMultiLangInputs() {
                return _.filter(this.computedInputs, function (input) {
                    return !input.multiLang;
                })
            },

            hasMultiLangInputs() {
                return this.multiLangInputs.length > 0;
            },
            ...mapState({
                form: function (state) {
                    /**
                     * computed property returns object form from vuex form module
                     *
                     * @author WeSSaM
                     */
                    return _.get(state, this.formModule, {});
                },
                languages: state => state.setting.languages
            }),
            // languages() {
            //     return [
            //         {
            //             symbol: "AR",
            //             locale: "ar",
            //             label: 'العربية',
            //         },
            //         {
            //             symbol: "EN",
            //             locale: "en",
            //             label: 'English',
            //         },
            //         {
            //             symbol: "TR",
            //             locale: "tr",
            //             label: 'Turkish',
            //         },
            //     ];
            // }
        }
    }
</script>

<style>
    .floating-tabs {
        float: right;
    }

    .form-fieldset {
        max-width: 800px !important;
    }

    span.invalid {
        color: #ff1100;
    }
</style>