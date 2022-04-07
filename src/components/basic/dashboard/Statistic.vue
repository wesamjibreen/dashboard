<template>
    <!-- <div class="columns is-multiline">
        <div class="column is-6 is-md-12">
            <div class="company-dashboard">
                <div class="company-header list-row">
                    <div class="columns is-multiline">
                        <div class="column is-3 p-3">
                            <h4>Name : </h4>
                        </div>
                        <div class="column is-9  p-3">
                            <h4>Ahmed Mohammed</h4>
                        </div>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-3 p-3">
                            <h4>Name : </h4>
                        </div>
                        <div class="column is-9  p-3">
                            <h4>Ahmed Mohammed</h4>
                        </div>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-3 p-3">
                            <h4>Name : </h4>
                        </div>
                        <div class="column is-9  p-3">
                            <h4>Ahmed Mohammed</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-6 is-md-12">
            <div class="company-dashboard">
                <div class="company-header list-row">
                    <div class="columns is-multiline">
                        <div class="column is-3 p-3">
                            <h4>Name : </h4>
                        </div>
                        <div class="column is-9  p-3">
                            <h4>Ahmed Mohammed</h4>
                        </div>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-3 p-3">
                            <h4>Name : </h4>
                        </div>
                        <div class="column is-9  p-3">
                            <h4>Ahmed Mohammed</h4>
                        </div>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-3 p-3">
                            <h4>Name : </h4>
                        </div>
                        <div class="column is-9  p-3">
                            <h4>Ahmed Mohammed</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->


    <!--  -->


    <!-- <div class="permission">
        <div class="columns is-multiline">
            <div class="column is-4 is-md-12">
                <div class="card-permission">
                    <div class="header-permission">
                        <CheckboxField :data="data" />
                    </div>
                    <div class="body-permission">
                        <CheckboxField :data="data_2" />
                    </div>
                </div>
            </div>
            <div class="column is-4 is-md-12">
                <div class="card-permission">
                    <div class="header-permission">
                        <CheckboxField :data="data" />
                    </div>
                    <div class="body-permission">
                        <CheckboxField :data="data_2" />
                    </div>
                </div>
            </div>
            <div class="column is-4 is-md-12">
                <div class="card-permission">
                    <div class="header-permission">
                        <CheckboxField :data="data" />
                    </div>
                    <div class="body-permission">
                        <CheckboxField :data="data_2" />
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <div class="business-dashboard company-dashboard">
        <div class="company-header is-dark-card-bordered is-dark-bg-6">
            <div class="header-item is-dark-bordered-12" v-for="item in data$">
                <div class="item-inner">

                    <Icon v-if="isIconify($get(item,iconKey))" :icon="$get(item,iconKey)" class="is-dark-primary"/>
                    <i  v-else aria-hidden="true" :class="`is-dark-primary ${$get(item,iconKey)} `"></i>

                    <span class="dark-inverted">
                        {{  $get(item,valueKey) }}
                    </span>
                    <p>

                        {{   getValueByLocale(item.textKey) }}


                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import dashboard from "./dashboard";
    import base from "../../list/mixins/base";

    // import CheckboxField from "../../formBuilder/fields/CheckboxField.vue";

    export default {
        name: "Statistics",
        components:{
            // CheckboxField
        },
        data(){
            return{
                // data:[{id:1,name:"Admin"}],
                // data_2:[{id:1,name:"Admin 1"},{id:2,name:"Admin 2"},{id:3,name:"Admin 3"}]
            }
        },
        mixins: [dashboard , base],
        methods: {
            $$getRowValue(column, row, defaultVal = "") {
                console.log('sssda' , column , row ,column.name) ;
                if (column.value instanceof Function)
                    return column.value(row);

                return this.getValueByLocale(_.get(row, column.name, defaultVal ?? ""));
            },
        },

    }
</script>

<style lang="scss">

</style>
