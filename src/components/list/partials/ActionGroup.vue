<template>
    <VButton href="javascript:;" class="table-action" @click="onClick">
        <div v-if="icon" :class="classes">
            <i aria-hidden="true" :class="icon"></i>
        </div>
        <div v-else :class="classes" v-html="SVGIcon"></div>
    </VButton>
</template>

<script>
    import svg from "../../../data/icons/svg";

    export default {
        name: "ActionGroup",
        props: {
            color: {
                default: "primary"
            },
            resource: {
                default: "default"
            },
            slug: {
                default: "action"
            },
            icon: {
                default: null
            },
            row: {
                default: null
            },
            data: {
                default: {}
            },
            callback: Function
        },
        methods: {
            onClick() {
                if (this.callback instanceof Function)
                    return this.callback.bind(this)(...this.args);

                window.Bus.emit(`action-group-clicked`, ...this.args);
                window.Bus.emit(`${this.slug}-${this.resource}-action-group-clicked`, this.row, this.data);
                this.$emit('click', ...this.args);
            }
        },
        computed: {
            SVGIcon() {
                return _.get(svg, this.slug, this.slug)
            },
            classes() {
                return [
                    'icon',
                    `${this.color}-text`,
                ]
            },
            args() {
                return [
                    this.slug,
                    this.resource,
                    this.row,
                    this.data
                ]
            }
        }
    }
</script>

<style scoped>

</style>