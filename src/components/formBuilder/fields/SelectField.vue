<template>
    <div class="field-container">

        <!--@search-change="onSearch"-->
        <treeselect :placeholder="placeholder$" :class="{ 'form-control custom-treeselect form-control-custome': true,
         'is-invalid': invalid && validated,
         'cselect': true }"
                    v-model="input"
                    :multiple="isMultiple"
                    :options="optionsData"
                    :normalizer="normalizer$"
                    :loadOptions="loadOptions"
                    search-nested
                    :async="async"
                    :auto-load-root-options="false"


        />

        <!--1        @search-change="asyncFind"-->

        <!--v-model="input" :multiple="multiple" :options="optionsData"-->


        <!--<Multiselect v-model="input" :class="{'input' : true}"-->
        <!--v-bind="getAttributes({})"-->
        <!--:close-on-select="!multiple"-->
        <!--:searchable="true"-->
        <!--:loading="loading"-->
        <!--limit="200"-->
        <!--:valueProp="optionValue"-->
        <!--:trackBy="optionValue"-->
        <!--:label="optionName"-->
        <!--:placeholder="placeholder$"-->
        <!--:multiple="multiple"-->
        <!--:options="optionsData">-->
        <!--<template #multiplelabel="{ values }">-->
        <!--<div class="multiple-label">-->
        <!--<span class="value-label" v-for="(value , index) in  values">-->
        <!--{{ value?.[optionName] }}-->
        <!--<i class="close-label fas fa-times" @click="removeItem(value,index)"></i>-->
        <!--</span>-->
        <!--</div>-->
        <!--</template>-->
        <!--</Multiselect>-->

        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>

    </div>
</template>


<script>
    import input from "../mixins/input";
    import options from "../mixins/options";
    // import Multiselect from '@vueform/multiselect'
    import Treeselect from 'vue3-treeselect'
    import 'vue3-treeselect/dist/vue3-treeselect.css'

    const sleep = d => new Promise(r => setTimeout(r, d))
    let called = false;
    export default {
        name: "SelectField",
        components: {
            // Multiselect,
            Treeselect
        },
        mixins: [input, options],
        data: () => ({
            q: null,
            loading: false
        }),
        methods: {
            // hasAddNew(input) {
            //     if (!this.repeater) return false;
            //     return input.addNew && input.addNew.component;
            // },
            // addNewRecord(input) {
            //     this.__showDialog({
            //         title: input.label,
            //         ...input.addNew,
            //         input,
            //     });
            // },
            normalizer$(node) {
                if (this.normalizer && this.normalizer instanceof Function)
                    return this.normalizer(node);
                return {
                    id: _.get(node, this.optionValue),
                    label: node?.[this.optionName],
                    children: node.children,
                };
            },
            // asyncFind(searchQuery,id){
            //     // console.log('sssss',searchQuery,id);
            // },

            /**
             * this method removes the empty
             * child from the object
             * @param options
             * @return {*[]|*}
             * @author WeSSaM
             */
            sanitizer(options) {
                if (!(options instanceof Array)) return options;
                return options.map(this.childrenMap);
            },


            /**
             *  check if the object's children array
             *  is empty or not
             *  if so remove it, otherwise
             *  call method again 'till removing
             *  the all empty children
             *
             * @param child
             * @return {*}
             * @author WeSSaM
             */
            removeEmptyChild(child) {
                if (!child.children || child.children.length == 0) {
                    delete child["children"];
                    return child;
                }
                child.children = child.children.map(this.childrenMap);
                return child;
            },
            /**
             * the body of removeEmptyChild and sanitizer
             * map function
             *
             * @param item
             */
            childrenMap: function (item) {
                return this.removeEmptyChild(item);
            },
            // loadOptions({ action, searchQuery, callback }) {
            //   if (action === ASYNC_SEARCH) {
            //     _.debounce(function (searchQuery) {
            //       console.log("searchQuery" ,searchQuery )
            //     },1000)
            //
            //     this.request(
            //       this.route$(this.endPoint.route),
            //       {
            //         params: { ...this.endPoint.params, searchQuery },
            //       },
            //       function ({ data }) {
            //         callback(null, data.data);
            //       },
            //       function () {
            //         callback(null, []);
            //       }
            //     );
            //   }
            // },

            async loadOptions({action, callback, searchQuery}) {
                callback(null, this.options);

                this.request(
                    this.$endPoint(this.endPoint.name),
                    {
                        params: {q: searchQuery},
                    },
                    ({data}) => {
                        this.options = data.data;
                        // callback(null, this.options);
                        console.log('loadOptions', callback, this.options);
                    },
                    () => {
                        callback(null, []);
                    }
                );
                // alert(action);
                // this.options = ['a', 'b', 'c', 'd', 'e'].map(id => ({
                //     id,
                //     name: `option-${id}`,
                // }));
                // callback(null, this.options)
                // console.log('loadOptions', action, this.options)
                // if (action === 'LOAD_ROOT_OPTIONS') {
                //     if (!called) {
                //         // First try: simulate an exception.
                //         await sleep(2000) // Simulate an async operation.
                //         called = true
                //         throw new Error('Failed to load options: test.')
                //     } else {
                //         // Second try: simulate a successful loading.
                //         await sleep(2000);
                //
                //     }
                // }
            },
            // loadOptions: _.debounce(async function ({action, searchQuery, callback}) {
            //
            //     this.options = ['a22', 'b22', 'c22', 'd22', 'e22'].map(id => ({
            //         id,
            //         name: `option-${id}`,
            //     }));
            //     callback(null, this.options);
            //     console.log('loadOptions', action, this.options)
            //
            //
            //     // this.q = searchQuery;
            //     // await this.fetchOptions();
            //     // callback(null, []);
            //
            //     // if (action === ASYNC_SEARCH) {
            //     // ...this.endPoint.params,
            //
            //     // alert(action);
            //
            //     // this.request(
            //     //     this.$endPoint(this.endPoint.name),
            //     //     {
            //     //         params: {  q : searchQuery  },
            //     //     },
            //     //     function ({ data }) {
            //     //         console.log('loadOptions',callback, data);
            //     //         callback(null, data.data);
            //     //     },
            //     //     function () {
            //     //         callback(null, []);
            //     //     }
            //     // );
            //     // }
            // },500 ),


        },
        computed: {
            isMultiple() {
                return this.multiple !== undefined && this.multiple != null
                    ? this.multiple
                    : true;
            },
            selectFieldRepeaterInput() {
                if (!this.repeater) return null;
                return this.repeater.repeaterRef.inputs$.find(
                    (input) => input.model === this.model
                );
            },
            // ...mapState({
            //     currentLanguage: (state) => state.setting.currentLanguage,
            // }),
        },
        watch: {
            // currentLanguage(newVal) {
            // this.dispatchUpdateOptionsAction();
            // },
            // input:function (newVal){
            // this.$root.$emit('change-select-value',newVal)
            // },
        },
        // methods: {
        //
        //     removeItem(item, index) {
        //         this.input = (this.input ?? []).filter((option) => {
        //             return option !== item?.[this.optionValue];
        //         });
        //     },
        //     getAttributes(field) {
        //         if (this.multiple)
        //             field['mode'] = 'multiple';
        //
        //         return field;
        //     }
        // },

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

    span.invalid {
        color: var(--danger) !important;
        font-size: 14px !important;
        font-family: 'Cairo', serif !important;
    }

    .vue-treeselect__placeholder.vue-treeselect-helper-zoom-effect-off {
        font-family: 'CAIRO',serif;
        font-size: 13px;
        margin: 0 25px;
    }

    .vue-treeselect__single-value {
        font-family: 'CAIRO',serif;
        font-size: 15px;
        margin: 0 25px;

    }
    .vue-treeselect__menu {
        font-family: 'CAIRO',serif;
        font-size: 15px !important;
    }
</style>
