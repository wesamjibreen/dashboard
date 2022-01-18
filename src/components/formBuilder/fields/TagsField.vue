<template>
    <Multiselect
            v-model="input"
            mode="tags"
            :searchable="true"
            :createTag="true"
            :options="[]"
    />
</template>


<script>
    import input from "../mixins/input";
    // import TagInput from '@mayank1513/tag-input'
    // import '@mayank1513/tag-input/dist/TagInput.css'
    import Multiselect from '@vueform/multiselect'
    // import { SmartTagz } from "smart-tagz";
    // import "smart-tagz/dist/smart-tagz.css";
    export default {
        name: "TagsField",
        components: {
            Multiselect,
            // SmartTagz,
            // TagInput
        },
        mixins: [input],
    };
</script>

