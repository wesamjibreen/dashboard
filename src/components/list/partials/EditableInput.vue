<template>
    <div class="editable-component">
        <input type="text" class="input" v-model="localInput" @input="hasChanges = true"/>
        <div class="btn-overlay" v-if="hasChanges">
            <VButton @click="edit" :loading="loading">
                <i class="fa fa-edit"></i>
            </VButton>
        </div>
    </div>
</template>

<script>
    // import InputField from "../../formBuilder/fields/InputField";
    import {getValueByLocale} from "../../../utils/helper";

    export default {
        name: "EditableInput",
        props: {
            column: {
                default: []
            },
            row: {
                default: {}
            },
            slug: String,
            resource: String
        },
        data: () => ({
            localInput: "",
            loading: false,
            hasChanges: false,

        }),
        created() {
            this.localInput = this.value;
        },
        methods: {
            edit() {
                this.loading = true;
                let data = {};
                data[this.key] = this.localInput;
                this.request(
                    this.saveEndPoint,
                    data,
                    ({data}) => {
                        this.successNotify(data.message);
                        this.$emit('success', this.row, this.localInput);
                        this.hasChanges = false;
                    },
                    ({data}) => {
                        this.errorNotify(data.message);
                        // _this.__showToast('error', data.message);
                    },
                    (xhr) => {
                        this.loading = false;
                    },
                );
            }
        },
        computed: {
            key() {
                return _.get(this.column, 'value', null);
            },
            value() {
                return getValueByLocale(_.get(this.row, this.key, null));
            },
            saveEndPoint() {
                let route = _.get(this, 'column.route', null) ?? `${this.resource}.update`;
                return this.$endPoint(route, this.__getId) ?? {};
            },
            __getId() {
                return _.get(this, 'row.id', 0);
            },
        }
    }
</script>

<style scoped lang="scss">
    .editable-component {
        position: relative;

        .btn-overlay {
            position: absolute;
            top: 1px;
            z-index: 1;
        }

        .button.v-button {
            border: 0;
            padding: 9px 11px;
            height: 36px;
            font-size: 14px;
            background: #f3f6f9;
            width: 37px;

            i {
                color: var(--primary);
            }

            &.is-loading {
                i {
                    display: none;
                }

                &:after {
                    border-color: var(--primary);
                    border-right-color: transparent;
                    border-top-color: transparent;
                }
            }
        }
    }

    html[dir="rtl"]{
        .editable-component {
            .btn-overlay {
                left: 1px;
            }
        }
    }
    html[dir="ltr"]{
        .editable-component {
            .btn-overlay {
                right: 1px;
            }
        }
    }
</style>
