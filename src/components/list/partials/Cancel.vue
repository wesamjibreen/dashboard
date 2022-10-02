<template>

    <VButton :color="color" :disabled="disabled" href="javascript:;" @click.prevent="onClick"  >
        {{ trans('cancel_operation') }}
    </VButton>
</template>

<script>
    import svg from "../../../data/icons/svg";

    export default {
        name: "Cancel",
        data: () => ({
            disabled : false
        }),
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

            // disabled: {
            //     default: false
            // },
            data: {
                default: {}
            },
            callback: Function
        },
        methods: {
            onClick() {
                if (this.callback instanceof Function)
                    return this.callback.bind(this)(...this.args);

                window.Bus.emit(`action-clicked`, ...this.args);
                window.Bus.emit(`${this.slug}-${this.resource}-action-clicked`, this.row, this.data);
            }
        },
        created(){
         
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

            disabled() {
                return  this.disabled;
            },
            args() {
                return [
                    this.slug,
                    this.resource,
                    this.row,
                    this.data,
                  this.disabled
                ]
            }
        }
    }
</script>

<style >

.disabled {
  cursor: not-allowed;
  color: gray;
  pointer-events: none;

}

</style>
