import {BUSY_FIELDS, SET_BUSY_FIELDS, SET_INPUT} from "../../../store/modules/form.module";
import {mapState} from "vuex";
import * as VeeValidate from 'vee-validate'
import {useField} from 'vee-validate'

export default {
    setup(props) {
        // const props = defineProps();
        const {errorMessage, meta, value} = useField(props.model);
        return {
            errorMessage,
            meta,
            value
        };
    },
    props: {
        component: String,
        value: {
            required: false
        },
        modelValue: {
            required: false
        },
        model: {
            required: true
        },
        formModule: {
            required: true
        },
        label: {
            required: true
        },
        endPoint: {
            required: false
        },
        rows: {
            required: false,
            default: 3
        },
        rules: {
            required: false
        },
        repeater: {
            required: false
        },
        multiLang: Boolean,
        locale: String
    },
    components: {
        VForm: VeeValidate.Form,
        VeeField: VeeValidate.Field,
        ErrorMessage: VeeValidate.ErrorMessage,
    },
    ready() {
        // alert(this.model$);
    },
    data() {
        return {
            // input: this.defaultValue,
            repeaterFieldValue: this.defaultValue,
            // repeaterFieldValue: null
            detectChanges: false,
            generatedKey: Math.random()
        };
    },
    created() {
        this.$bus.off(`on-form-fetch-${this.formModule}`);
        this.$bus.on(`on-form-fetch-${this.formModule}`, this.onFetch);

        /**
         * calling overwritten onInputCreated method
         * @author WeSSaM
         */
        this.onInputCreated();

        const interval = this.isEdit ? 2000 : 500;
        setTimeout(
            function () {
                this.detectChanges = true;
            }.bind(this),
            interval
        );


    },
    mounted() {
        /**
         * calling overwritten onInputMounted method
         * @author WeSSaM
         */
        this.onInputMounted();
    },
    methods: {
        setInputDefaultValue(value = null) {
            this.input = value || this.defaultValue;
        },

        /**
         * this method used to commit new value to vuex module
         * parameters is model : current input key  , value :  the new parsed value
         *
         * @author WeSSaM
         */
        $commit(newVal) {
            let model = this.model;
            let locale = this.locale$;
            let value = this.passingInput(newVal);

            if (this.fromModule)
                this.$store.commit(`${this.formModule}/${SET_INPUT}`, {
                    model,
                    locale,
                    value
                });
            else
                this.$emit('update:modelValue', value);
        },

        /**
         * this method called to passing input value to commit function
         * it can be overwritten in the input component
         * default will return parsed newVal
         * @author Mahmoud
         */
        passingInput(newVal) {
            return newVal;
        },

        /**
         * this method called directly when created hook gets fired
         * @author WeSSaM
         */
        onInputCreated() {
            /* @Todo, you can override the method then customize it as you want */
        },

        /**
         * this method called directly when mounted hook gets fired
         * @author WeSSaM
         */
        onInputMounted() {
            /* @Todo, you can override the method then customize it as you want */
        },

        onFetch() {

        }
    },
    computed: {
        locale$() {
            return this.multiLang && this.locale ? this.locale : null;
        },
        isEdit() {
            /**
             * computed property returns if current state is edit
             * check if route params has resource id
             *
             * @author WeSSaM
             */
            return this.$route && this.$route.params && this.$route.params["id"];
        },
        defaultValue() {
            /**
             * computed property returns default input value
             * used to init input by this value
             *
             * @author WeSSaM
             */
            return null;
        },

        model$() {
            /**
             * computed property returns current input key (model)
             *
             * @author WeSSaM
             */
            if (this.fromModule)
                return this.model;

            return `${this.model}_${this.generatedKey}`;
        },

        type$() {
            /**
             * computed property returns input type
             * default is text
             *
             * @author WeSSaM
             */
            return "text";
        },

        label$() {
            /**
             * computed property return label
             *
             * @author WeSSaM
             */
            return this.label ? this.label : this.model;
        },

        placeholder$() {
            /**
             * computed property return translated placeholder
             *
             * @author WeSSaM
             */
            switch (this.component) {
                case "select":
                    return this.placeholder ? this.trans(this.placeholder) : `${this.trans("select")} ${this.trans(this.label$)}`;
                case "attachment":
                    return this.placeholder ? this.trans(this.placeholder) : `${this.trans("choose")} ${this.trans(this.label$)}`;
                default:
                    return this.placeholder ? this.trans(this.placeholder) : `${this.trans("enter")} ${this.trans(this.label$)}`;
            }
        },

        // modelValue: {
        //     get() {
        //         return this.input
        //     },
        //     set() {
        //
        //     }
        // },

        input: {
            /**
             * computed property using setter and getter
             * setter : place new value for this input to vuex form module directly without using local variables
             * getter : get the current value from module using mapState based on current input model
             *
             * @author WeSSaM
             */
            get() {
                if (this.locale$)
                    return _.get(this.inputValue, this.locale$, this.defaultValue);

                return this.inputValue ?? this.defaultValue;
            },
            set(newVal) {
                this.$commit(newVal);
            }
        },

        busyField: {
            get: function () {
                const busyFields =
                    this.$store.state[`${this.formModule}`][`${BUSY_FIELDS}`] || [];

                // if (busyFields.length === 0) return false;
                const found = busyFields.find(
                    element => element === this.busyFieldModel
                );
                return found ? true : false;
            },
            set: function (newVal) {
                const busyFields =
                    this.$store.state[`${this.formModule}`][`${BUSY_FIELDS}`] || [];

                const busyIndex = busyFields.indexOf(this.busyFieldModel);

                if (newVal) {
                    // add field to busy fields
                    if (busyIndex < 0) {
                        // console.log("push busy field");
                        busyFields.push(this.busyFieldModel);
                    }
                } else {
                    // remove field from busy fields
                    if (busyIndex > -1) {
                        // console.log("splice busy field");
                        busyFields.splice(busyIndex, 1);
                    }
                }

                this.$store.commit(`${this.formModule}/${SET_BUSY_FIELDS}`, busyFields);
            }
        },
        busyFieldModel() {
            let busyModel = this.model;
            if (this.repeater) {
                busyModel += this.repeater.rowIndex;
            }
            return busyModel;
        },

        properties() {
            /**
             * computed property returns original props
             *
             * @author WeSSaM
             */
            return {
                model: this.$model,
                component: this.component
            };
        },

        rules$() {
            /**
             * computed property returns validation rules
             *
             * @author WeSSaM
             */
            return this.rules ? this.rules : {};
        },


        validator$() {
            // .filter({$property : this.model$})
            return _.get(this.form, 'validator', {});
        },

        $error() {
            return _.find(this.validator$, (error) => {
            // return _.find(this.validator$.$silentErrors, (error) => {
                return error.$property === this.model$;
            })
        },

        hasError() {
            return this.$error?.$message && this.form?.isSubmitted;
        },

        inputValue: function () {
            /**
             * computed property used to bind current value to current input getter
             *
             * @author WeSSaM
             */
            if (this.fromModule)
                return _.get(this.form, this.model$, this.defaultValue);
            else
                return this.modelValue;
        },

        fromModule() {
            return !!this.formModule;
        },

        errorsBag() {
            return _.get(this.form, `errors.${this.model$}`, [])
        },

        hasErrors() {
            return this.errorsBag.length > 0;
        },

        ...mapState({
            /**
             * computed property returns object form from vuex form module
             *
             * @author WeSSaM
             */
            form: function (state) {
                return _.get(state, this.formModule, {});
            }
        })
    },
    // watch: {
    //     modelValue: {
    //         deep: true,
    //         immediate: true,
    //         handler(newVal) {
    //             if (!this.fromModule) {
    //                 console.log('setModel modelValue', this.input, newVal);
    //
    //                 this.input = newVal;
    //             }
    //         }
    //     }
    // }
    // }
};
