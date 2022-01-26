const DEFAULT_FORM = "default";
import formModule, {GET_FORM, SET_ERRORS, SET_FORM, SET_INPUT, SUBMIT_FORM} from "../../../store/modules/form.module";
import form from "./form";
import {useRoute} from "vue-router";

export default {
    mixins: [form],
    props: {
        data: {
            required: false,
            default: []
        },
        inputs: {
            required: false,
            default: []
        },
        values: {
            required: false,
            default: {}
        },
        config: {
            required: false,
            default: {
                resource: DEFAULT_FORM,
                editKey: "id",
                redirectTo: null,
                titleKey: "name",
                fieldSets: false,
                isCrud: false
            }
        }
    },
    data: () => {
        return {
            find_loading: false,
            loading: false,
        }
    },

    created() {
        /**
         * registering form module in vuex
         * @author WeSSaM
         */
        this.registerFormModule();

        /**
         * if form is edit call find method to get resource from endpoint
         * @author WeSSaM
         */
        if (this.isEdit && !this.isCrud) this.find();

        /**
         * calling overwritten onCreated method
         * @author WeSSaM
         */
        this.onCreated();

        /**
         * init form events
         * @author WeSSaM
         */
        this.initEvents();

        /**
         * set default redirection route if it's not exist
         * @author WeSSaM
         */
        // if (!this.redirectTo) this.redirectTo = this.defaultRedirectRoute;
    },

    mounted() {
        /**
         * reset form to initial state
         * @author WeSSaM
         */
        // this.resetForm();
        /**
         * calling overwritten onMounted method
         * @author WeSSaM
         */
        this.onMounted();

        /**
         * calling overwritten onMounted method
         * @author WeSSaM
         */

        this.$emitEvent('mounted', this);

        /**
         * check if form has values props to be set
         * @author WeSSaM
         */
        setTimeout(() => {
            if (this.values)
                this.setForm(this.values);
        }, 400)
    },

    methods: {
        submit() {
            // this.$emitEvent('form-success', this.form);
            // if (this.isFormBusy) {
            //     return;
            // }
            return new Promise((resolve, reject) => {
                // alert(this.v$.$invalid);
                // if (this.v$.$invalid)
                //     return reject();
                // this.validateForm().then(
                //     function (valid) {
                //         if (valid && checkMultiLang && this.hasEmptyMultiLangFields) {
                //             this.multiLangDialog = true;
                //             return;
                //         }

                // if (valid) {
                // Bus.emit(
                //     `before-form-submit-${this.formModule$}`,
                //     this.formModule$
                // );
                this.loading = true;
                this.$emitEvent('before-submit', this.form);
                this.$store.dispatch(`${this.formModule$}/${SUBMIT_FORM}`, {
                    data: this.form,
                    formContext: this,
                    endPoint: this.submitEndPoint(),
                }).then(
                    function (data) {
                        this.$emitEvent('form-success', data);
                        this.successNotify(data.message);
                        this.onSubmitSuccess(data);
                        if (!this.isCrud)
                            this.redirect();
                        resolve(data);
                    }.bind(this)
                ).catch(
                    function (xhr) {
                        this.loading = false;
                        let errors = _.get(xhr, 'data.data', {});
                        this.attachErrors(errors);
                        this.$emitEvent('form-error', xhr);
                        let message = _.get(
                            xhr,
                            "data.message",
                            this.trans("error_while_processing")
                        );
                        this.errorNotify("error", message);
                        this.onSubmitError(xhr);
                        reject(xhr);
                    }.bind(this)
                ).finally(() => (this.loading = false));
                //             } else this.__showToast("error", this.__trans("validation_error"));
                //         }.bind(this)
                //     );
            });
        },

        setFindLoading(value = false) {
            /**
             * set find loading to passed value
             * @author WeSSaM
             */
            this.find_loading = value;
        },

        redirect() {
            this.$router.push({name: `${this.resource}.all`});
        },


        $emitEvent(eventName, ...args) {
            Bus.emit(`on-${eventName}-${this.formModule$}`, ...args);
            this.$emit(eventName, ...args);
        },

        getForm(form = null) {
            /**
             * this method is used to get form object based on registered form module in vuex
             * default resource is {default}

             * @author WeSSaM
             */
            form = form || this.formModule$;
            return this.$store.getters(`${form}/${GET_FORM}`);
        },


        setForm(newVal, form = null) {
            /**
             * this method is used to  assign new values to form
             * by committing form to vuex module according to used resource
             * default resource is {current resource}
             *
             *
             * @author WeSSaM
             */
            form = form || this.formModule$;
            this.$store.commit(`${form}/${SET_FORM}`, newVal);
        },


        $setValue(model, value, form = null) {
            /**
             * this method is used to  set model's value to vuex form
             * @author WeSSaM
             */
            form = form || this.formModule$;
            this.$store.commit(`${form}/${SET_INPUT}`, {model, value});
        },


        setErrors(errors, form = null) {
            form = form || this.formModule$;
            this.$store.commit(`${form}/${SET_ERRORS}`, errors);
        },


        resetForm(form = null) {
            /**
             * re-init form values to initial state
             * default resource is {default}
             *
             * @author WeSSaM
             */
            form = form || this.formModule$;
            if (this.$store.hasModule(form))
                this.$store.unregisterModule(form);
        },

        find() {
            /**
             * fetch resource's data from api
             * @author WeSSaM
             */
            this.setFindLoading(true);
            this.request(
                this.findEndPoint,
                {
                    params: {
                        default: true
                    }
                },
                function ({data}) {
                    this.setForm(data.data);
                    this.$emitEvent('form-fetch', data.data);
                    this.afterFetch(data);
                }.bind(this),
                null,
                () => {
                    this.setFindLoading(false);
                }
            );
        },

        registerFormModule() {
            /**
             * check if this form is already exist to be unregistered
             */
            if (this.$store.hasModule(this.formModule$))
                this.$store.unregisterModule(this.formModule$);

            /**
             * register new module for this form with basic state
             */
            this.$store.registerModule(this.formModule$, formModule);
        },

        getFormResourceKey(resource) {
            /**
             * concatenating resource with unique form delimiter
             */
            return `${resource}Form`;
        },


        getConfig(key, defaultVal) {
            /**
             *  return config key from form's config object
             *  @author WeSSaM
             */
            return _.get(this.config, key, defaultVal);
        },


        attachErrors(errors) {
            console.log('attachErrors', errors)
            this.setErrors(errors);

        },


        onCreated() {
            /**
             * this method called directly when created hook gets fired
             * @author WeSSaM
             */
            /* @Todo, you can override the method then customize it as you want */
        },


        onMounted() {
            /**
             * this method called directly when mounted hook gets fired
             * @author WeSSaM
             */
            /* @Todo, you can override the method then customize it as you want */
        },


        onSubmitSuccess(data) {
            /**
             * this method called after submitting success response
             * it can be overwritten to be customized
             * @author WeSSaM
             */
            /* @Todo, you can override the method then customize it as you want */
        },

        onSubmitError(data) {
            /**
             * this method called after submitting error response
             * it can be overwritten to be customized
             * @author WeSSaM
             */
            /* @Todo, you can override the method then customize it as you want */
        },


        afterFetch(data) {
            /**
             * this method called after submitting error response
             * it can be overwritten to be customized
             * @author WeSSaM
             */
            /* @Todo, you can override the method then customize it as you want */
        },

        onFormSet() {
            /**
             * init set form
             * @author WeSSaM
             */
            Bus.off(`set-form-value-${this.formModule$}`);
            Bus.on(`set-form-value-${this.formModule$}`, (form) => {
                this.setForm(form);
            });
        },

        initEvents() {
            /**
             * init form events
             * @author WeSSaM
             */
            this.onFormSet();
        }
    },
    computed: {

        formModule() {
            /**
             * computed property returns registered form module key
             * @author WeSSaM
             */
            return this.getFormResourceKey(this.resource);
        },

        formModule$() {
            /**
             * computed property returns registered form module key
             * @author WeSSaM
             */
            return this.formModule;
        },

        resource() {
            /**
             * computed property returns form's resource
             * @author WeSSaM
             */
            return this.getConfig('resource', DEFAULT_FORM);
        },

        editKey() {
            /**
             * computed property returns form's editKey
             * @author WeSSaM
             */
            return this.getConfig('editKey', "id");
        },


        redirectTo() {
            /**
             * computed property returns form's redirectTo
             * @author WeSSaM
             */
            return this.getConfig('redirectTo', null);
        },


        titleKey() {
            /**
             * computed property returns form's titleKey
             * @author WeSSaM
             */
            return this.getConfig('titleKey', null);
        },

        isCrud() {
            /**
             * computed property returns form's titleKey
             * @author WeSSaM
             */
            return this.getConfig('isCrud', false);
        },

        submitEndPoint() {
            /**
             * computed property returns function to manipulate end point
             * if this form is edit returns update endpoint based on resource
             * otherwise will returns create end point
             *
             * @author WeSSaM
             */
            return function () {
                if (this.isEdit)
                    return this.$endPoint(`${this.resource}.update`, this.__getId);
                return this.$endPoint(`${this.resource}.store`);
            }.bind(this);
        },

        /**
         * computed property returns current resource id
         * @author WeSSaM
         */
        __getId() {
            if (this.isCrud)
                return _.get(this, `values.${this.editKey}`, 0);

            let route = useRoute();
            return _.get(route, `params.${this.editKey}`, 0);
        },

        /**
         * computed property returns find end point
         * @author WeSSaM
         */
        findEndPoint() {
            return this.$endPoint(`${this.resource}.find`, this.__getId);
        },

        /**
         * computed property returns if current state is edit
         * check if route params has resource id
         *
         * @author WeSSaM
         */
        isEdit() {
            return !!this.__getId
        },


        hasFieldSets() {
            return this.data.length > 0;
        },


        fieldSets$() {
            /**
             * computed property returns array of fieldSets
             *
             * @author WeSSaM
             */
            return this.hasFieldSets ? this.data : [{inputs: this.inputs ?? []}];
        },


        formTitle() {
            return this.trans(`${this.resource}.${this.isEdit ? 'edit' : 'create'}`)
        },


        defaultRedirectRoute() {
            /**
             * computed property returns default route for redirection after submitting form
             * @author WeSSaM
             */
            return {name: `${this.resource.replace("_", "-")}.all`};
        },
    },


    unmounted() {
        this.resetForm();
    }
    // watch: {
    //     values: {
    //         deep: true,
    //         // immediate: true,
    //         handler(newVal) {
    //             // alert('set form');
    //             // console.log('form watcher', form);
    //             let form = JSON.parse(JSON.stringify(newVal)) ?? {};
    //             this.setForm(form);
    //         }
    //     }
    // }
}
