<template>
    <div class="field-container">
        <o-inputitems v-model="input"
                      closeIcon=" fa fa-times"
                      iconPack="fa" class="input input-tags"
                      :placeholder="placeholder$"
                      :aria-close-label="trans('delete_item')">
        </o-inputitems>

        <span class="invalid" v-if="hasError">
            {{ trans($error?.$message) }}
        </span>
    </div>
</template>


<script>
    import input from "../mixins/input";
    export default {
        name: "TagsField",
        mixins: [input],
    };
</script>

