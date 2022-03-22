<template>
    <!--<form class="form-layout" @submit.prevent>-->
    <form :class="['form-layout', isLoading && '--loading']" @submit.prevent="onSubmit">
        <!--<v-form class="form-layout" :validation-schema="schema" @submit="onSubmit" v-slot="{values}">-->
        <div class="form-outer">
            <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
                <div class="form-header-inner">
                    <div class="left">
                        <h3>{{ formTitle }}</h3>
                    </div>
                    <div class="right">
                        <div class="buttons">
                            <VButton icon="lnir lnir-arrow-left rem-100" @click.prevent="onCancel" light
                                     dark-outlined>
                                {{ trans('cancel') }}
                            </VButton>
                            <VButton color="primary" type="submit" raised :loading="loading">
                                {{ trans('save') }}
                            </VButton>
                        </div>
                    </div>
                </div>
            </div>
            <VLoader size="small" :active="isLoading" class="loading-overlay">
                <div class="form-body form-separator">
                    <Fieldset v-for="fieldset in fieldSets$" v-bind="fieldset" :formModule="formModule$"/>
                </div>
            </VLoader>
        </div>
    </form>

</template>


<script>
    import {useWindowScroll} from '@vueuse/core'
    import Fieldset from "./Fieldset";
    import formBuilder from "./mixins/formBuilder";
    import {useVuelidate} from "@vuelidate/core";
    import {required} from "@vuelidate/validators";
    import {SET_SUBMITTED, UPDATE_VALIDATOR} from "../../store/modules/form.module";
    // import {mapState} from "vuex";
    // import formModule, {BUSY_FIELDS, SUBMIT_FORM,} from "../../store/modules/form.module";
    const {y} = useWindowScroll();

    export default {
        name: "FormLayout",
        provide() {
            return {formModule: this.formModule}
        },
        setup() {
            return {v$: useVuelidate()}
        },
        mixins: [formBuilder],
        components: {
            Fieldset,
        },
        data: () => ({
            validations: {},
        }),
        created() {
            this.validations = this.prepareValidations();
        },
        methods: {
            prepareValidations() {
                let result = {};
                _.forEach(this.fieldSets$, (fieldSet) => {
                    _.forEach(fieldSet.inputs, (input) => {
                        let rules = {};
                        _.forEach(input.rules, (value, key) => {
                            if (value)
                                rules[key] = this.rules[key];
                        });
                        result[input.model] = rules;
                    });
                });

                return {
                    form: result
                };
            },
            onSubmit() {
                this.isSubmitted = true;

                if (this.v$.$silentErrors.length > 0)
                    return this.errorNotify(this.trans('enter_valid_data'));
                else
                    this.submit();
            },
            onCancel() {
                this.$emit('cancel');

                if (!this.isCrud)
                    this.$router.go(-1);
            }
        },
        computed: {
            isStuck() {
                return y.value > 30;
            },
            rules() {
                return {
                    required,
                }
            },
            isSubmitted: {
                set(newVal) {
                    this.$store.commit(`${this.formModule}/${SET_SUBMITTED}`, newVal);
                },
                get() {
                    return this.form?.isSubmitted
                }
            }
        },
        watch: {
            "v$.$silentErrors": {
                deep: true,
                handler: function (newVal) {
                    if (this.$store.hasModule(this.formModule))
                        this.$store.commit(`${this.formModule}/${UPDATE_VALIDATOR}`, newVal)
                }
            }
        },
        validations() {
            return this.validations;
        }
    }
</script>

<style lang="scss">
    @import '../../scss/abstracts/_mixins.scss';
    @import '../../scss/pages/generic/_forms.scss';


    .form-layout {
        max-width: initial !important;
        margin: 0 auto;
    }

    input.input.is-invalid {
        border: solid 1px #ff2f20;
    }

    .field-container.is-invalid input {
        border: solid 1px #ff2f20;
    }

    .field-container.is-invalid textarea {
        border: solid 1px #ff2f20;
    }

    .multiselect.input.is-invalid {
        border: solid 1px #ff2f20;
    }

    .field > label {
        font-size: 1.0rem !important;
    }

    .v-loader-wrapper.is-active {
        background-color: white;
        z-index: 999;
    }
</style>
