<template>
    <div class="content">
        <CKEditor
                v-model="input"
                :editor="ClassicEditor"
                :config="config">
        </CKEditor>
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
    import {ref} from 'vue'
    import CKE from '@ckeditor/ckeditor5-vue'
    import input from "../mixins/input"
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    const CKEditor = CKE.component;
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
                ClassicEditor,
                config,
                editorContent: ""
            }
        },
        components: {
            CKEditor
        },
        watch: {
            locale(newVal) {
                this.input = _.get(Object.assign({}, this.inputValue), newVal, "");
            }
        }
        // methods: {
        //     onInputCreated() {
        //         // this.input =
        //     },
        // },
        // methods: {
        //     onEditorReady() {
        //         this.editorContent = this.input;
        //     }
        // },
        // watch: {
        //     editorContent(newVal) {
        //         this.$commit(newVal);
        //         // this.input = newVal;
        //     },
        //     // input: {
        //     //     immediate: true,
        //     //     handler(newValue) {
        //     //
        //     //         // if (this.editorContent !== newValue)
        //     //         //     this.editorContent = newValue;
        //     //         // alert(newValue);
        //     //
        //     //     }
        //     // },
        //
        //     // inputValue(newValue) {
        //     //     if (this.editorContent != newValue)
        //     //         this.input = newValue;
        //     // }
        // }
    }
</script>

