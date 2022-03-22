<template>
    <div class="field-container">
        <VLoader size="small" :active="loading" class="loading-overlay permission">
            <div class="columns is-multiline">
                <div class="column is-4 is-md-12" v-for="( module, key) in permissions">
                    <div class="card-permission">
                        <div class="header-permission">
                            <label :class="`checkbox is-outlined is-primary`" :for="`permissions_${key}`">
                                <input :id="`permissions_${key}`"
                                       :name="selected"
                                       :value="key"
                                       :checked="(selected[key]??[]).length > 0"
                                       @change="onParentUpdate($event,key,module)"
                                       type="checkbox">
                                <span></span>
                                {{ trans(key) ?? key }}
                            </label>
                        </div>
                        <div class="body-permission">
                            <label v-for="(option, i) in module"
                                   :class="`checkbox is-outlined is-primary`"
                                   :for="`check_box_${option}_${key}_${i}`">
                                <input :id="`check_box_${option}_${key}_${i}`"
                                       @input="onChildUpdate($event, key, module)"
                                       :name="`${key}[]`"
                                       :value="option"
                                       :checked="(selected?.[key] ?? []).includes(option)"
                                       type="checkbox">
                                <span></span>
                                {{ trans(option) ?? option }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </VLoader>
    </div>
</template>


<script>
    import input from "../mixins/input";

    export default {
        name: "PermissionField",
        props: {
            endPoint: Object
        },

        mixins: [input],

        data: () => ({
            airport: [],
            loading: true,
            permissions: [],
        }),

        methods: {
            onInputCreated() {
                this.fetchPermissions();
            },
            onInputMounted() {
                this.selected = JSON.parse(JSON.stringify(this.input)) ?? {};
            },
            onChildUpdate($event, key, permissions) {
                let value = $event.target.value;
                let moduleArr = _.get(this, `selected.${key}`, []);
                if (moduleArr.includes(value))
                    moduleArr = moduleArr.filter((item) => item !== value);
                else
                    moduleArr.push(value);

                _.set(this, `selected.${key}`, moduleArr);

                // this.$nextTick(() => {
                //     this.$commit(this.selected);
                // });
            },
            onParentUpdate($event, key, permissions) {
                let value = $event.target.value;
                if ($event.target.checked)
                    _.set(this, `selected.${key}`, permissions);
                else
                    _.set(this, `selected.${key}`, []);


                // this.$nextTick(() => {
                //     this.$commit(this.selected);
                // })
            },
            fetchPermissions() {
                this.loading = true;
                this.request(
                    this.permissionsEndPoint,
                    {},
                    ({data}) => {
                        this.permissions = data.data;
                        this.selected = JSON.parse(JSON.stringify(this.input)) ?? {};
                    },
                    () => {

                    },
                    () => {
                        this.loading = false;
                    }
                );

            }
        },
        computed: {
            selected: {
                set(newVal) {
                    this.input = newVal;
                },


                get() {
                    return this.input ?? {}
                }
            },
            permissionsEndPoint() {
                if (this.endPoint?.name)
                    return this.$endPoint(this.endPoint?.name, this.endPoint?.params ?? {})
                return this.$endPoint('role.permissions');
            }
        }
    };
</script>

<style>

</style>
