<template>
    <div :key="`${resource}_${slug}_${key}`">
        <SwitchField v-model="localInput" @update:modelValue="onSwitchChanged"/>
    </div>
</template>

<script>

    // import SwitchField from "../../formBuilder/fields/SwitchField";
    export default {
        name: "SwitchStatus",
        props: {
            row: {
                default: {}
            },
            column: {
                default: {}
            },
            resource: String,
            slug: String
        },
        data: () => ({
            key: "",
            localInput: null
            // input: null
        }),
        created() {
            this.localInput = this.row[this.slug];
        },
        methods: {
            onSwitchChanged($event) {
                let params = {};
                params[this.slug] = $event;
                this.request(
                    this.updateEndPoint,
                    params,
                    ({data}) => {
                        this.successNotify(data.message)
                    },
                    (xhr) => {
                        this.errorNotify(xhr.message)

                    },
                    () => {

                    }
                )
            }
        },
        computed: {
            updateEndPoint() {
                let route = this.column.route ?? `${this.resource}.status`;
                return this.$endPoint(route, this.rowId) ?? {}
            },
            rowId() {
                return _.get(this, 'row.id', 0);
            },
            value() {
                return this.row[this.slug];
            }
        },
        watch: {
            "value": {
                handler(newVal) {
                    this.localInput = newVal;
                }
            }
        }
        // methods: {
        //     onChange() {
        //
        //     }
        // }
        // components: {SwitchField},
    }
</script>

<style scoped>

</style>