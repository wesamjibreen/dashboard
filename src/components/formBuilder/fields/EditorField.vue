<template>
    <div class="content">
        <ckeditor v-model="input"></ckeditor>

        <!--<CKEditor-->
        <!--:editor="ClassicEditor"-->
        <!--:config="config">-->
        <!--</CKEditor>-->
        <!--v-model="input"-->
        <!--@update:modelValue="input = $event"-->
        <!--@ready="onEditorReady"-->
    </div>
</template>
<style>
    .ck-editor__editable {
        min-height: 250px;
    }
</style>
<script>
    // import CKEditor from '@mayasabha/ckeditor4-vue3';

    import {ref} from 'vue'
    import input from "../mixins/input"
    // import CKE from '@ckeditor/ckeditor5-vue'
    // import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    // const CKEditor = CKE.component;
    const editorData = ref(`<h2>Your HTML Content</h2>`);
    const config = {
        fontFamily: {
            options: ['"Montserrat"', 'sans-serif', "Roboto", 'sans-serif'],
        },
    };
    export default {
        mixins: [input],
        data() {
            return {
                // ClassicEditor,
                config,
                editorContent: ""
            }
        },
        components: {
            // CKEditor,
            // CKEditor
        },
        watch: {
            locale(newVal) {
                // this.input = _.get(Object.assign({}, this.inputValue), newVal, "");
            }
        }
    }
</script>

