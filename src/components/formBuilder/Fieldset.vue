<template>
    <div class="form-fieldset" v-if="isDisplayed({show : show ?? null})">
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
            <div v-for="input in multiLangInputs" :class="`column is-${input.cols ?? 12}`">
                <VField v-if="isDisplayed(input)" :classes="getFieldClass(input.component)">
                    <label> {{ getInputLabel(input) }} ({{ currentLanguage.toUpperCase() }})</label>
                    <VControl :icon="input.icon" :model="input.model">
                        <component :is="`${input.component}-field`"
                                   :formModule="formModule"
                                   :locale="currentLanguage"
                                   v-bind="input"/>
                    </VControl>
                </VField>
            </div>
        </div>
        <div class="columns is-multiline">
            <div v-for="(input,index) in nonMultiLangInputs" :class="`column is-${input.cols ?? 12}`">
                <VField v-if="isDisplayed(input)" :classes="getFieldClass(input.component)">
                    <label> {{ getInputLabel(input) }} </label>
                    <VControl :icon="input.icon" :model="input.model">
                        <component :is="`${input.component}-field`"
                                   :key="input.component != 'select' ? `${input.model}_${input.component}_${index}` : `${input.model}_${input.component}_${key * index}` "
                                   :formModule="formModule"
                                   v-bind="input"/>
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
            },
            loading: {
                default: true
            }
        },
        components: {
            VForm: VeeValidate.Form,
            VeeField: VeeValidate.Field,
            ErrorMessage: VeeValidate.ErrorMessage,
        },
        data() {
            return {
                currentLanguage: null,
                key: 1
            }
        },
        created() {
            if (!this.currentLanguage)
                this.currentLanguage = _.get(this, 'languages.0.value', "ar");
        },
        methods: {
            getFieldClass(component) {
                switch (component) {
                    case "repeater":
                    case "crud":
                        return 'form-repeater';
                    case "file" :
                        return "form-upload";
                    default :
                        return ""
                }
            },
            getInputLabel(input) {
                return this.trans(input.label ?? input.model);
            },
            isDisplayed(item) {
                let type = item?.show;
                switch (typeof type) {
                    case  "string" :
                        return eval(type);
                    case "function" :
                        return type.bind(this).call();
                    default :
                        return true;
                }
            }
        },
        watch: {
            loading: {
                immediate : true,
                handler(newVal) {
                    // alert(newVal);
                    this.key += Math.random();
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
