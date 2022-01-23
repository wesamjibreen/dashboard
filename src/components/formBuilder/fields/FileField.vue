<template>
    <div class="columns mt-2">
        <div class="column is-12">
            <div v-for="(dialog, i) in dialogs" :key="`cropper_dialog_${i}`">
                <GDialog v-model="dialog.show" max-width="500px">
                    <div class="getting-started-example-styled">
                        <div class="getting-started-example-styled__content">
                            <div class="getting-started-example-styled__title">
                                <!--Content-->
                            </div>
                            <cropper class="cropper"
                                     :src="dialog.image"
                                     :stencil-props="stencilProps"
                                     @change="onCrop($event, dialog)">

                            </cropper>
                        </div>

                        <div class="getting-started-example-styled__actions">
                            <vButton @click="closeCropperDialog(dialog,i)"
                                     color="danger"
                                     size="big"
                                     rounded
                                     raised
                                     bold>
                                {{ trans("cancel") }}
                            </vButton>
                            <!--:loading="isLoading"-->

                            <VButton id="login-button"
                                     @click="saveCropperImage(dialog)"
                                     color="primary"
                                     size="big"
                                     rounded
                                     raised
                                     bold>
                                {{ trans("save") }}
                            </VButton>
                        </div>
                    </div>

                    <!--@change="onCropperChange($event, cropperDialog)"-->
                    <!--:stencil-props="{        aspectRatio,  }"-->

                </GDialog>

            </div>

            <!--<button @click.prevent="setImageToCrop"> Browse</button>-->
            <div class="row">
                <div class="filepond-attachment-container has-text-tip">
                    <!--name="file"-->
                    <file-pond
                            class="profile-filepond"
                            name="file"
                            ref="pond"
                            label-idle="<i class='-file-icon lnil lnil-cloud-upload'></i>"
                            v-bind:allow-multiple="true"
                            accepted-file-types="image/jpeg, image/png"
                            :server="server"
                            allow-reorder
                            v-bind:files="files"
                            credits="false"
                            @addfile="addFile"
                            v-on:initfile="initFile"
                            v-on:activatefile="activatefile"
                            v-on:removefile="removeFile"
                            v-on:processfile="processfile"
                            v-on:init="handleFilePondInit"
                            :required="false"
                    />
                </div>
            </div>
            <div class="images-uploaded" v-if="(images??[]).length > 0">
                <viewer :images="images" class="columns flex-wrap">
                    <div v-for="(image,i) in images" class="column is-3">
                        <div class="widght-image">
                            <div class="btn-overlay">
                                <a href="javascript:;" @click="deleteImage(image,i)" class="action-delete">
                                    <i class="fas fa-times"></i>
                                </a>
                            </div>
                            <img class="image-filepond" :src="`/image/${image.file_name}`"/>
                        </div>
                    </div>
                </viewer>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '~gitart-vue-dialog/dist/style.css';

    .getting-started-example-styled {
        &__content {
            padding: 20px;
        }

        &__title {
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 20px;
        }

        &__actions {
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
        }
    }
</style>
<style>

    i.-file-icon.lnil.lnil-cloud-upload {
        pointer-events: none;
        font-size: 2.4rem;
        color: var(--light-text);
        transition: color 0.3s;
    }

    /* .btn-overlay {
        position: absolute;
    } */

    a.action-delete {
        color: #e91e63;
    }

    img.image-filepond {
        border-radius: 5px;
    }

    .filepond--drop-label {
        min-height: 120px !important;
        border-radius: 5px;
    }

    /*.filepond--list li {*/
    /*width: 30% !important;*/
    /*}*/
</style>
<script>

    import 'viewerjs/dist/viewer.css';
    import "vue-advanced-cropper/dist/style.css";
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.css';

    import {GDialog} from 'gitart-vue-dialog'
    import {Cropper} from "vue-advanced-cropper";
    import input from "../mixins/input"
    import image from "../mixins/image"
    // Import Vue FilePond
    import vueFilePond from "vue-filepond";

    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
    import FilePondPluginImageExitOrientation from 'filepond-plugin-image-exif-orientation'
    import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
    import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
    import FilePondPluginImageResize from 'filepond-plugin-image-resize'
    import FilePondPluginImageTransform from 'filepond-plugin-image-transform'

    // import 'viewerjs/dist/viewer.css';


    // Import image preview and file type validation plugins
    // import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
    // import FilePondPluginImagePreview from "filepond-plugin-image-preview";
    // Import FilePond plugins
    // Please note that you need to install these plugins separately

    // Create component
    const FilePond = vueFilePond(
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType,
        FilePondPluginImageExitOrientation,
        FilePondPluginImageCrop,
        FilePondPluginImageEdit,
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginImageTransform,
    );

    export default {
        name: "app",
        mixins: [input, image],
        components: {
            FilePond,
            GDialog,
            Cropper,
        },
        props: {
            crop: {
                default: false
            },
            ratio: {
                default: null
            }
        },
        data: function () {
            return {
                cropped: [],
                dialogs: [],
                files: [],
                images: [],
                server: {
                    url: '/image/upload',
                    process: {
                        method: 'POST',
                        withCredentials: false,
                        headers: {
                            _token: document.querySelector("meta[name=csrf-token]").getAttribute('content')
                        },
                        timeout: 7000,
                        onload: (response, data) => {
                            let file = JSON.parse(response).data;
                            this.addImageToInput(file);
                            this.files = [];
                            console.log('onload', file, data, this.files);
                        },
                        onerror: null,
                        ondata: (data) => {
                            data.append('_token', document.querySelector("meta[name=csrf-token]").getAttribute('content'));
                            return data;
                        },
                        remove: (source, load, error) => {
                            // alert('remove')
                            // Should somehow send `source` to server so server can remove the file with this source

                            // Can call the error method if something is wrong, should exit after
                            error('oh my goodness');

                            // Should call the load method when done, no parameters required
                            load();
                        },
                    },
                },

            };
        },
        methods: {
            addImageToInput(file) {
                if (!this.input)
                    this.input = [];
                this.input.push(file)
            },
            onCrop({coordinates, canvas}, dialog) {
                dialog.cropImage = canvas.toDataURL();
            },
            processfile(...args) {
                console.log('processfile', ...args);
            },
            deleteImage(image, index) {
                // let images = JSON.parse(JSON.stringify(this.input));
                this.input.splice(index, 1);
            },
            saveCropperImage(dialog, index) {
                this.$refs.pond.addFile(dialog.cropImage, {cropped: true}).then((file) => {
                    this.cropped.push(file.id);
                    this.closeCropperDialog(dialog, index);
                });
            },
            addFile(error, file) {
                if ((this.cropped ?? []).includes(file.id) || !this.crop)
                    return;

                this.fileRef.removeFile(file.id);
                this.setImageToCrop(file.file);
            },
            setImageToCrop(file) {
                this.fileToBase64(file).then((encodedFile) => {
                    this.dialogs.push({show: true, image: encodedFile, cropImage: ""});
                });
            },
            closeCropperDialog(dialog, index) {
                dialog.show = false;

                // setTimeout(() => {
                //     this.dialogs.splice(index, 1);
                // }, 1000);
            },
            browse() {
                this.$refs.pond.addFile(this.inputValue?.[0]);
            },
            handleFilePondInit: function () {
                // this.images = this.inputValue;
                // this.files = this.inputValue;
                console.log("FilePond has initialized");
                // FilePond instance methods are available on `this.$refs.pond`
            },
            removeFile(...args) {
                console.log('removeFile', ...args);
                // alert('removeFile')
            },
            initFile(file) {
                console.log('initfile', file);
                return false;
            },
            activatefile(...args) {
                console.log('activatefile', ...args);

            },

        },

        computed: {
            fileRef() {
                return this.$refs.pond;
            },
            stencilProps() {
                return {
                    aspectRatio: this.ratio
                }
            },
            images() {
                return this.input instanceof Array ? this.input : [];
            }
            // files: {
            //     get() {
            //         return _.map(this.inputValue ?? [], (file) => {
            //             return `/image/${file.file_name}`;
            //         });
            //     },
            //     set(newVal) {
            //         this.$commit(newVal);
            //     }
            // }
        },
        // watch: {
        //     images: {
        //         deep: true,
        //         // immediate: true,
        //         handler(newVal) {
        //             // this.$commit(newVal);
        //         }
        //     }
        //
        // }
    };
</script>

<style>
    .filepond--drop-label.filepond--drop-label label {
        cursor: pointer;
    }

    .getting-started-example-styled__actions {
        justify-content: center;
    }

    .getting-started-example-styled__actions button {
        margin: 0px 2px
    }

    .widght-image {
        position: relative;
        border-radius: 8px;
        box-shadow: 0px 0px 15px #a0a0a01c;
        width: 100%;
        height: 170px;
        border: 1px solid #EEE;
    }

    @media (max-width: 800) {
        .widght-image {
            height: 140px;
        }
    }

    .widght-image .btn-overlay .action-delete {
        position: absolute;
        top: 8px;
        left: 8px;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background-color: #ff0303ad;
        border-radius: 3px;
        color: #FFF;
    }

    .widght-image .btn-overlay i {
        color: #FFF;
    }

    .widght-image .image-filepond {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }

    .images-uploaded {
        padding: 15px;
        border: 1px solid #EEE;
        border-radius: 10px;
        background-color: #FFF;
    }

    .filepond--drop-label {
        background: #FFF;
        border: 1px solid #EEE;
    }

    .form-upload {
        background: #fafafa;
        padding: 20px;
        border-radius: 8px;
    }

</style>
