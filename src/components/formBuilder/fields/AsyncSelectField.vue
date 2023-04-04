<template>
    <div class="field-container">
        <a-select v-model:value="input" :mode="multiple ? 'multiple' : null"
                  allow-clear
                  show-search
                  size="large"
                  :placeholder="placeholder$"
                  style="width: 100%"
                  :fieldNames="{label : optionName,value : optionValue}"
                  :filter-option="!async ? filterOption : false"
                  :not-found-content="async && loading ? undefined : null"
                  @search="loadOptions"
                  :options="optionsArr">
            <template v-if="async && loading" #notFoundContent>
                <a-spin :indicator="indicator"/>
            </template>
        </a-select>
        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>
    </div>
</template>


<script>
import input from "../mixins/input";
import options from "../mixins/options";
import {LoadingOutlined} from '@ant-design/icons-vue';
import {h} from 'vue';
import {useRoute} from "vue-router";

export default {
    name: "AsyncSelectField",
    props: {
        asyncOptionsKey: String,
        asyncOptions: {
            required: false,
            default: []
        },
    },
    data: () => ({
        q: null,
        loading: false,
        value: [],
        key: 0,
        valuaae: null,
        options: [],
    }),
    mixins: [input, options],
    computed: {
        asyncOptionsKey$() {
            return this.asyncOptionsKey ?? `${this.model}_options`
        },
        isMultiple() {
            return this.multiple ?? true;
        },
        selectFieldRepeaterInput() {
            if (!this.repeater) return null;
            return this.repeater.repeaterRef.inputs$.find(
                (input) => input.model === this.model
            );
        },
        defaultValue() {
            /**
             * computed property returns default input value
             * used to init input by this value
             *
             * @author WeSSaM
             */
            return [];
        },

        asyncOptions$() {
            if (this.asyncOptions.length > 0)
                return this.asyncOptions;
            return this.currentRow?.[this.asyncOptionsKey$] ?? (this.form?.[this.asyncOptionsKey$] ?? []);
        },
        optionsArr() {
            let filteredAsyncOptions = [];
            if (this.input instanceof Array)
                filteredAsyncOptions = this.asyncOptions$.filter((el) => {
                    return this?.input.includes(el?.id)
                });
            else
                filteredAsyncOptions = this.asyncOptions$.filter((el) => {
                    return this?.input === el?.id;
                });


            return _.concat(this.optionsData, filteredAsyncOptions.filter((el) => {
                return !this.optionsData.find((innerEl) => innerEl.id === el.id)?.id
            }));

        }
    },
    methods: {
        filterOption(input, option) {
            return this.getValueByLocale(option[this.optionName]).toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        loadOptions: _.debounce(function (searchQuery) {
            this.options = [];
            this.loading = true;
            this.request(
                this.$endPoint(this.endPoint.name),
                {params: {q: searchQuery, ...this.endPoint?.params, ...this.route.query}},
                ({data}) => {
                    this.loading = false;


                    this.options = data.data;

                },
                () => {
                    this.loading = false;
                    this.options = [];
                }
            );
        }, 200),
    },
    setup() {
        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: '24px',
            },
            spin: true,
        });
        const route = useRoute();
        return {
            route,
            indicator,
        };
    },
};
</script>


<style>
span.invalid {
    color: var(--danger) !important;
    font-size: 14px !important;
    font-family: "Cairo", serif !important;
}

.ant-select-item-option-content {
    font-family: "CAIRO", serif;
    font-size: 15px !important;
}
</style>
