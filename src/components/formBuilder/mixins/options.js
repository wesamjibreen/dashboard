import {mapState} from "vuex";
// import { FETCH_OPTIONS, UPDATE_OPTIONS } from "../../../store/setting.module";

export default {
    props: {
        data: {
            required: false,
            default: null
        },
        option_name: {
            required: false,
            default: "name"
        },
        option_value: {
            required: false,
            default: "id"
        },
        translated_labels: {
            required: false,
            default: false
        },
        normalizer: Function,
        filter: Function,
        multiple: Boolean,
        async: Boolean
    },
    data: () => ({
        loading: false,
        options: [],
        q: null,
    }),
    created() {
        // this.onInputCreated();
        // this.onInputChanges();
        // this.dispatchFetchOptionsAction();
        if (this.endPoint && !this.async)
            this.fetchOptions();

        // this.$root.$on(
        //   "form-dialog-success",
        //   function() {
        //     this.$store.dispatch(`setting/${UPDATE_OPTIONS}`, this);
        //   }.bind(this)
        // );
        // this.fetchOptions();
    },
    methods: {
        dispatchFetchOptionsAction() {
            if (this.endPoint) {
                // this.$store.dispatch(`setting/${FETCH_OPTIONS}`, this);
            }
        },
        dispatchUpdateOptionsAction() {
            if (this.endPoint) {
                // this.$store.dispatch(`setting/${UPDATE_OPTIONS}`, this);
            }
        },

        async fetchOptions() {
            /**
             * refresh options by sending new request to end point
             * @author WeSSaM
             */

            if (!this.endPoint?.name)
                return;

            // console.log('on search', {
            //     q: this.q,
            //     ...this.endPoint?.params ?? {},
            // })
            this.loading = true;
            await this.request(
                this.$endPoint(this.endPoint?.name, this.endPoint?.params),
                {
                    params: {
                        q: this.q,
                        ...this.endPoint?.params ?? {},
                    }
                },
                ({data}) => {
                    if (data.data.data != undefined) this.options = data.data.data;
                    else
                        this.options = data.data;
                    // Bus.$emit(_this.field + '-data-fetched');
                    // if (_this['value'] !== undefined) {
                    //     if (_this.oldValue[_this.model] != undefined) {
                    //         _this.input = _this.oldValue[_this.model];
                    //     }
                    //     if (_this['value'] != undefined) {
                    //         _this.input = _this['value'];
                    //     }
                    //     // _this.options.forEach((item) => {
                    //     //     if (_this.oldValue[_this.model] == item.id) {
                    //     //         _this.input = item[_this.option_value];
                    //     //     }
                    //     // })
                    // }
                },
                () => {
                    this.options = [];
                },
                () => {
                    this.loading = false;
                }
            );
        },

        __findSelectOption(model, value, options) {
            if (options && options.length == 0) {
                throw null;
            }
            return _.find(options, item => {
                return item[model] === value;
            });
        },
        /**
         * this method is used to return the initialized
         * value if properties don't have any
         * just throw exception with null value
         *
         * @author WeSSaM
         */
        __getTheDefaultValue() {
            if (this.oldValue && this.oldValue.hasOwnProperty(this.model))
                return this.oldValue[this.model];
            else if (this.hasOwnProperty("value")) return this.value;
            else throw null;
        },
        /**
         * this function is used to set the first element
         * as a default value for the select
         * @author WeSSaM
         */
        __setDefaultOption(options) {
            try {
                /**
                 * searchedModel: object's attribute user has provided
                 * to make select deal with
                 *
                 * searchedValue: the value of object's attribute component
                 * looks for
                 *
                 * @note: if __findSelectOption throws exception means that there
                 * is no initialized value
                 * @type {default.computed.option_value|(function(): *)}
                 */
                let searchedModel = this.option_value;
                let searchedValue = this.__getTheDefaultValue();
                this.input = this.__findSelectOption(
                    searchedModel,
                    searchedValue,
                    options
                )[searchedModel];
            } catch (e) {
                // if (options && options.length > 0 && options[0].hasOwnProperty(this.optionValue))
                //     this.input = (this.input) ? this.input : options[0][this.option_value];
            }
        },
        /**
         * this function is used to
         * remove the attributes may object owns
         * which 'cause Json circular error
         *
         * @param options
         * @return {*}
         * @private
         * @author WeSSaM
         */
        sanitize(options) {
            // by pass the next operations if array has no elements
            if (!options || options.length === 0) return options;
            // walk through the elements
            options.forEach(item => {
                delete item.parent; /* remove this attribute because it has no effect on the options */
                delete item.children /* remove this attribute my 'cause problems to the for sibmiting operation*/;
            });
            return options;
        },
        isNumber(n) {
            /**
             * check if parameter is number or string
             * using regex test
             * @param n
             * @return {*}
             * @private
             * @author WeSSaM
             */
            return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
        },


        onSearch: _.debounce(function (q) {
            this.q = q;
            if (this.async)
                this.fetchOptions();
        }, 1000),

    },

    computed: {
        optionName: function () {
            /**
             * return the default option text key
             * @author WeSSaM
             */
            return this.option_name !== undefined ? this.option_name : "name";
        },
        optionValue: function () {
            /**
             * return the default option value key
             * @author WeSSaM
             */
            return this.option_value !== undefined ? this.option_value : "id";
        },
        optionsData: function () {
            let options = this.options$;

            // if (this.async) {
            //     return [];
            // }

            // /**
            //  * check if properties has End Point
            //  * if this condition true then options will be loaded after sending ajax request to this end point
            //  * @author WeSSaM
            //  */
            // if (this.hasOwnProperty('endPoint')) {
            //     options = this.options;
            // }
            // if (this.filter && this.filter instanceof Function) {
            //     options = this.vuex.filter(this.$store.getters[this.getterPath]);
            /**
             * remove the unnecessary attributes
             * @author WeSSaM
             */
            // options = this.sanitize(options);
            /**
             * set the first element as the selected options
             * @author WeSSaM
             */
            // this.__setDefaultOption(options);

            if (this.filter instanceof Function)
                options = this.filter.bind(this)(options, this);


            if (this.translated_labels)
                options = _.map(options, (option) => {
                    option[this.optionName] = this.trans(option?.[this.optionName]);
                    return option;
                });
            else
                options = _.map(JSON.parse(JSON.stringify(options)), (option) => {
                    option[this.optionName] = this.getValueByLocale(option?.[this.optionName]);
                    return option;
                });


            return options;
        },
        options$() {
            if (this.endPoint?.name) {
                return this.options;
            }
            return this.data ? this.data : [];
        },
        optionsKey() {
            return `${
                this.endPoint ? this.endPoint.name.split(".")[0] : this.model$
                }Options`;
        },
        vuexOptions() {
            return this.setting && this.setting[this.optionsKey]
                ? this.setting[this.optionsKey]
                : [];
            // console.log('vuexOptions', state.setting[this.optionsKey],this.optionsKey)
            // return _.get(state, `setting.${this.optionsKey}`, [])
        },
        ...mapState({
            /**
             *  return options array from vuex
             * @returns {array}
             */
            setting(state) {
                return state.setting;
            },


            form(state) {
                return state?.[this.formModule] ?? {}
            }

            // options$$: state => state.setting[`${this.endPoint.name.split(".")[0]}Options`],
        }),
    },
    watch: {
        // setting: {
        //     handler: function (newVal, oldVal) {
        //
        //         alert('ff');
        //         if (newVal && newVal[this.optionsKey])
        //             this.options = newVal[this.optionsKey]
        //     },
        //     deep: true,
        //     immediate: true,
        // },
    }
};
