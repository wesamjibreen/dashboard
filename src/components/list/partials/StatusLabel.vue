<template>
    <small :class="`tag is-${color$} is-rounded`"> {{ label$ }}</small>
</template>


<script>
    export default {
        name: "StatusLabel",
        props: {
            row: {
                required: true
            },
            column: {
                required: true,
            },
            slug: String,
            path: {
                default: "value.class"
            }
        },
        computed: {
            path$() {
                return _.get(this, 'column.path', this.path);
            },
            status$() {
                return _.get(this.row, this.slug, {});
            },
            label$() {
                return this.getValueByLocale(this.status$?.name ?? "");
            },
            color$() {
                return _.get(this.status$, this.path$, 'warning');
            }
        }
    }
</script>

<style scoped>

</style>