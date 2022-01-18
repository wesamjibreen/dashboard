<template>
    <div class="flex-table">
        <div class="flex-list-inner">
            <VLoader size="small" :active="loading">
                <transition-group name="list" tag="div">
                    <!--<draggable class="flex-table" v-model="items" itemKey="name">-->
                    <!--<template #item="{ element, index }">-->
                    <!--<div class="flex-table-item">-->
                    <!--inside item {{ element.name }} {{ index }}-->
                    <!--</div>-->
                    <!--</template>-->
                    <!--</draggable>-->
                    <draggable :list="rows" v-model="items" @end="onEnd" itemKey="id">
                        <template #item="{ element, index }">
                            <div class="flex-table-item" :class="{active : activeIndex == element.id }"
                                 @click="selectItem( element, index)">
                                <!--{{ activeItem}}-->
                                {{ element.name }}
                            </div>
                        </template>
                    </draggable>
                </transition-group>

                <!--<transition-group name="list" tag="div">-->

                <!--</transition-group>-->
            </VLoader>
        </div>
    </div>
</template>

<script>
    import Draggable from 'vuedraggable'

    import {computed, reactive, ref} from "vue";

    export default {
        name: "Sortable",
        emits: ['updated','select'],
        components: {
            Draggable
        },
        props: {
            loading: Boolean,
            resource: String,
            rows: Array,
        },
        // data() {
        //     return {
        //         items: []
        //     }
        // },
        // watch: {
        //     items: {
        //         deep: true,
        //         immediate: true,
        //         handler() {
        //             // alert('on change');
        //         }
        //
        //     },
        //     rows: {
        //         deep: true,
        //         immediate: true,
        //         handler(newVal) {
        //             this.items = JSON.parse(JSON.stringify(newVal));
        //         }
        //     }
        // },
        // methods: {
        //     onEnd() {
        //         alert('onend');
        //     }
        // }
        setup(props, {emit}) {
            // console.log('Sortable', props, attrs);
            // const items = reactive(JSON.parse(JSON.stringify(props.rows)) ?? []);
            const items = reactive([]);

            const activeItem = ref(null);

            const activeIndex = computed(() => {
                return activeItem.value?.id;
            });

            // watch(items, (newVal) => {
            //     alert('on Watch');
            //     console.log('watcher', newVal)
            // }, {deep: true, immediate: true});

            const selectItem = function (item, index) {
                activeItem.value = item;
                emit('select', item, index);
            };

            const onEnd = function ($event) {
                emit('updated', props.resource, items, $event)
            };

            return {
                ...props,
                items,
                onEnd,
                selectItem,
                activeItem,
                activeIndex
            }
        }
    }
</script>

<style>
    .flex-table-item.active {
        background-color: #4caf5029;
    }
</style>