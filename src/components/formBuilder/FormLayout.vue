<template>
    <!--<form class="form-layout" @submit.prevent>-->
    <v-form v-slot="{ handleSubmit ,values}" as="div">
        <form class="form-layout" @submit="handleSubmit($event, onSubmit)">

            <!--<v-form class="form-layout" :validation-schema="schema" @submit="onSubmit" v-slot="{values}">-->
            <div class="form-outer">
                <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
                    <div class="form-header-inner">
                        <div class="left">
                            <h3>
                                <!--Request a Demo-->
                                {{ formTitle }}
                            </h3>
                        </div>
                        <div class="right">
                            <div class="buttons">
                                <VButton icon="lnir lnir-arrow-left rem-100" @click.prevent="onCancel" light
                                         dark-outlined>
                                    <!--Cancel-->
                                    {{ trans('cancel') }}
                                </VButton>
                                <VButton color="primary" type="submit" raised :loading="loading">
                                    <!--@click.prevent="submit"-->
                                    <!--Submit-->
                                    {{ trans('save') }}
                                </VButton>

                                <!--<button>Submit</button>-->

                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-body">
                    <!--<v-field name="name" type="input" value=""></v-field>-->
                    <!--<error-message name="name"></error-message>-->


                    <VLoader size="small" :active="find_loading">
                        <Fieldset v-for="fieldset in fieldSets$" v-bind="fieldset" :formModule="formModule$"/>
                    </VLoader>
                </div>
            </div>

        </form>
    </v-form>
</template>


<script>
    import {useWindowScroll} from '@vueuse/core'
    import Fieldset from "./Fieldset";
    import formBuilder from "./mixins/formBuilder";
    import * as VeeValidate from "vee-validate";
    // import {defineRule} from "vee-validate";
    // import * as yup from 'yup';


    // import * as rules from '../../utils/rules';
    // Object.keys(rules).forEach(rule => {
    //     console.log('rule',rule);
    //     defineRule(rule, rules[rule]);
    // });
    // import {mapState} from "vuex";
    // import formModule, {BUSY_FIELDS, SUBMIT_FORM,} from "../../store/modules/form.module";
    const {y} = useWindowScroll();
    // defineRule('required', value => {
    //     console.log('defineRule', value);
    //
    //     if (value) {
    //         return true;
    //     }
    //
    //     return 'This field is required';
    //     // if (!value || !value.length) {
    //     //     return 'This field is required';
    //     // }
    //     // return true;
    // });
    // defineRule('email', value => {
    //     // Field is empty, should pass
    //     if (!value || !value.length) {
    //         return true;
    //     }
    //     // Check if email
    //     if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    //         return 'This field must be a valid email';
    //     }
    //     return true;
    // });
    export default {
        name: "FormLayout",
        provide()  {
            return {formModule: this.formModule}
        },
        // provide : [']
        // components: {Fieldset},
        mixins: [formBuilder],
        // setup() {
        //     const { handleSubmit } = useForm();
        //     function onInvalidSubmit({ values, errors, results }) {
        //         console.log(values); // current form values
        //         console.log(errors); // a map of field names and their first error message
        //         console.log(results); // a detailed map of field names and their validation results
        //     }
        //     const onSubmit = handleSubmit(values => {
        //         alert(JSON.stringify(values, null, 2));
        //     }, onInvalidSubmit);
        //     return {
        //         onSubmit,
        //     };
        // },
        components: {
            // Components were renamed to avoid conflicts of HTML form element without a vue compiler
            Fieldset,
            VForm: VeeValidate.Form,
            VField: VeeValidate.Field,
            ErrorMessage: VeeValidate.ErrorMessage,
        },
        data() {
            return {}
        },
        methods: {
//             onError() {
// alert('onError')
//             },
            onSubmit(values, actions) {
                console.log('onSubmit', values, actions);
                this.submit()
                // alert('submitted');
                // console.log(JSON.stringify(values, null, 2));
                // actions.setFieldError('name', 'this field is already been taken !! ');
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
</style>