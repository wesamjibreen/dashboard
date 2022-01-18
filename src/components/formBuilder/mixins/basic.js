// import KTCodePreview from "@common/view/content/CodePreview.vue";
// import {EMPTY_FORM, GET_FORM, SET_FORM, SET_INPUT} from "@common/store/form.module";
import {mapState} from "vuex";
import {GET_FORM, SET_FORM, SET_INPUT} from "../../../store/modules/form.module";
import {SET_DIALOG_DISPLAYED, SET_DIALOG_NAME} from "../../../store/modules/dialog.module";
// import {SET_DIALOG_DISPLAYED, SET_DIALOG_NAME} from "@common/store/dialog.module";
// import * as _ from "lodash";
// import {UPDATE_OPTIONS} from "@common/store/setting.module";

const DEFAULT_FORM = "default";
export default {
    created() {
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
        if (!this.redirectTo) this.redirectTo = this.defaultRedirectRoute;
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
         * if form is edit call find method to get resource from endpoint
         * @author WeSSaM
         */
        if (this.isEdit && !this.hasDialog) this.find();
    },
    data() {
        return {
            // resource: DEFAULT_FORM,
            editKey: "id",
            redirect: true,
            redirectTo: null,
            titleKey: "name",
        };
    },
    methods: {
        find() {
            this.$emitLoading(true);
            this.request(
                this.findEndPoint,
                {
                    params: {
                        default: true
                    }
                },
                function ({data}) {
                    this.setForm(data.data);
                    Bus.emit(`form-data-fetched-${this.formModule$}`, data.data);
                    this.afterFetch(data);
                }.bind(this),
                null,
                () => {
                    this.$emitLoading(false);
                }
            );
        },

        $emitLoading(value) {
            Bus.emit(`form-fetch-loading-${this.formModule$}`, value)
        },

        /**
         * this method is used to get form object based on registered form module in vuex
         * default resource is {default}

         * @author WeSSaM
         */
        getForm(form = null) {
            form = form || this.formModule$;
            return this.$store.getters(`${form}/${GET_FORM}`);
        },

        /**
         * this method is used to  assign new values to form
         * by committing form to vuex module according to used resource
         * default resource is {current resource}
         *
         *
         * @author WeSSaM
         */
        setForm(newVal, form = null) {
            form = form || this.formModule$;
            this.$store.commit(`${form}/${SET_FORM}`, newVal);
        },

        /**
         * this method is used to  set model's value to vuex form
         * @author WeSSaM
         */
        $setValue(model, value, form = null) {
            form = form || this.formModule$;
            this.$store.commit(`${form}/${SET_INPUT}`, {model, value});
        },

        /**
         * re-init form values to initial state
         * default resource is {default}
         *
         * @author WeSSaM
         */
        resetForm(form = null) {
            form = form || this.formModule$;
            // if (!this.$store.hasModule(form))
            //     this.$store.unregisterModule(form);

            // this.$store.commit(`${form}/${EMPTY_FORM}`, this)
        },

        /**
         * this method used to init on-form-success event based on formModule
         * @author WeSSaM
         */
        initOnFormSuccess() {
            Bus.off(`on-form-success-${this.formModule$}`);
            Bus.on(`on-form-success-${this.formModule$}`,
                function (formModule, data, isFromCrud = false) {
                    if (this.redirect && !this.hasDialog && !isFromCrud)
                        this.$router.push(this.redirectTo);

                    if (this.hasDialog) {
                        this.$store.commit(SET_DIALOG_DISPLAYED, false);
                        Bus.emit(`form-dialog-success-${formModule}`, formModule, data);
                    }

                    // if (isFromCrud)
                    //     this.$root.$emit(
                    //         `crud-dialog-success-${formModule}`,
                    //         formModule,
                    //         data
                    //     );

                    // if (this.setting && this.setting[this.optionsKey])
                    //     this.$store.dispatch(`setting/${UPDATE_OPTIONS}`, this);

                    this.resetForm();
                    this.onSubmitSuccess(data);
                }.bind(this)
            );
        },

        /**
         * this method used to init on-form-error event based on formModule
         * @author WeSSaM
         */
        initOnFormError() {
            console.log("subscribe to " + `${this.formModule$}`);
            Bus.off(`on-form-error-${this.formModule$}`);
            Bus.on(
                `on-form-error-${this.formModule$}`,
                function (xhr) {
                    this.onSubmitError(xhr);
                }.bind(this)
            );
        },

        /**
         * this method used to init form-destroyed event based on formModule
         * @author WeSSaM
         */
        initOnFormDestroyed() {
            Bus.off(`form-destroyed-${this.formModule$}`);
            Bus.on(
                `form-destroyed-${this.formModule$}`,
                function (formModule) {
                    if (this.$store.hasModule(formModule) && this.hasDialog) {
                        this.$store.unregisterModule(formModule);
                    }
                }.bind(this)
            );
        },

        /**
         * init form event listeners
         * @author WeSSaM
         */
        initEvents() {
            /**
             * initialization of initOnFormDestroyed event
             * @author WeSSaM
             */
            this.initOnFormDestroyed();

            /**
             * initialization of initOnFormSuccess event
             * @author WeSSaM
             */
            this.initOnFormSuccess();

            /**
             * init initOnFormError event
             * @author WeSSaM
             */
            this.initOnFormError();
        },

        /**
         * this method called directly when created hook gets fired
         * @author WeSSaM
         */
        onCreated() {
            /* @Todo, you can override the method then customize it as you want */
        },

        /**
         * this method called directly when mounted hook gets fired
         * @author WeSSaM
         */
        onMounted() {
            /* @Todo, you can override the method then customize it as you want */
        },

        /**
         * this method called after submitting success response
         * it can be overwritten to be customized
         * @author WeSSaM
         */
        onSubmitSuccess(data) {
            /* @Todo, you can override the method then customize it as you want */
        },

        /**
         * this method called after submitting error response
         * it can be overwritten to be customized
         * @author WeSSaM
         */
        onSubmitError(data) {
            /* @Todo, you can override the method then customize it as you want */
        },

        /**
         * this method called after submitting error response
         * it can be overwritten to be customized
         * @author WeSSaM
         */
        afterFetch(data) {
            /* @Todo, you can override the method then customize it as you want */
        },

        watchInputChanges(model, callback, form = "form") {
            this.$watch(`${form}.${model}`, callback, {
                // immediate: true,
                // deep: true
            });
        },

        findByModel(array, model) {
            let input;
            _.forEach(array, function (object) {
                if (object.inputs && object.inputs.length > 0)
                    input = _.find(object.inputs, function (nestedInput) {
                        return nestedInput.model === model;
                    });

                if (object.model === model) input = object;
            });
            return input;
        },

        findInput(inputs, model) {
            return _.find(inputs, {model: model});
        },
        onBuilderMounted() {
        }
    },

    computed: {
        getResource() {
            /**
             * overwritten computed property returns form's resource
             * this property may overwritten with new value in other builder mixins
             *
             * @author WeSSaM
             */
            return this.resource;
        },
        formModule$() {
            /**
             * overwritten computed property returns formModule
             * this property may overwritten with new value in other builder mixins
             *
             * @author WeSSaM
             */
            return this.formModule;
        },
        isEdit() {
            /**
             * computed property returns if current state is edit
             * check if route params has resource id
             *
             * @author WeSSaM
             */
            return (
                this.$route && this.$route.params && this.$route.params[this.editKey]
            );
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
                return this.isEdit ? this.$endPoint(`${this.getResource}.update`, this.__getId)
                    : this.$endPoint(`${this.getResource}.store`);
            }.bind(this);
        },

        __getId() {
            /**
             * computed property returns current resource id
             * @author WeSSaM
             */
            return this.isEdit ? this.$route.params[this.editKey] : 0;
        },

        findEndPoint() {
            /**
             * computed property returns find end point
             * @author WeSSaM
             */
            return this.$endPoint(`${this.getResource}.find`, this.__getId);
        },

        title$() {
            /**
             * computed property returns translated page title based on resource
             * @author WeSSaM
             */
            if (this.isEdit) return this.trans(`${this.getResource}.edit`) + this.objectTitle;
            return this.trans(`${this.getResource}.create`);
        },

        objectTitle() {
            // return _.get(this.getForm(), 'name', "");
            return "";
        },

        defaultRedirectRoute() {
            /**
             * computed property returns default route for redirection after submitting form
             * @author WeSSaM
             */
            return {name: `${this.getResource.replace("_", "-")}.all`};
        },

        dialogFormModule() {
            return `${_.get(this.dialogInput, "dialogResource")}Form`;
        },
        dialogInput() {
            return _.find(this.inputs, {dialog: true});
        },
        optionsKey() {
            return `${this.getResource}Options`;
        },
        endPoint() {
            return {
                route: `${this.getResource}.index`,
                params: {
                    no_pagination: true
                }
            };
        },
        ...mapState({
            /**
             * binding  setting state object with computed property
             * @returns {Object}
             * @author WeSSaM
             */
            setting: state => state.setting,

            /**
             * Check if page has full screen dialog
             * @returns {boolean}
             */
            hasDialog: state => state.dialog.displayed,
            /**
             * computed property returns object form from vuex form module
             *
             * @author WeSSaM
             */
            form: function (state) {
                return _.get(state, this.formModule$, {});
            },
            /**
             * computed property returns object form from vuex form module
             *
             * @author WeSSaM
             */
            dialogForm: function (state) {
                return _.get(state, this.dialogFormModule, {});
            }
        })
    }
};
