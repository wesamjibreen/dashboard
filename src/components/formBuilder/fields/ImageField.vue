<template>
    <div class="columns mt-2">
        <div class="column is-12">
            <GDialog v-model="dialog.show" max-width="500px">
                <div class="getting-started-example-styled">
                    <div class="getting-started-example-styled__content">
                        <div class="getting-started-example-styled__title">
                            <!--Content-->
                        </div>
                        <cropper class="cropper"
                                 :src="dialog.image"
                                 :stencil-props="stencilProps"
                                 @change="onCrop($event)">

                        </cropper>
                    </div>

                    <div class="getting-started-example-styled__actions">
                        <vButton @click="closeCropperDialog"
                                 color="danger"
                                 size="big"
                                 rounded
                                 raised
                                 bold>
                            {{ trans("cancel") }}
                        </vButton>
                        <!--:loading="isLoading"-->

                        <VButton id="login-button"
                                 @click="saveCropperImage"
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


            <!--<button @click.prevent="setImageToCrop"> Browse</button>-->
            <div class="row">
                <VFilePond class="profile-filepond"
                           :model="model$"
                           ref="pond"
                           name="profile_filepond"
                           :chunk-retry-delays="[500, 1000, 3000]"
                           label-idle="<i class='lnil lnil-cloud-upload'></i>"
                           :accepted-file-types="acceptedFileTypes"
                           :image-preview-height="140"
                           :image-resize-target-width="140"
                           :image-resize-target-height="140"
                           image-crop-aspect-ratio="1:1"
                           style-panel-layout="compact circle"
                           style-load-indicator-position="center bottom"
                           style-progress-indicator-position="right bottom"
                           style-button-remove-item-position="left bottom"
                           style-button-process-item-position="right bottom"
                           v-bind:files="images"
                           @addfile="onAddFile"
                           @removefile="onRemoveFile"
                           :beforeAddFile="beforeAddFile"
                />
            </div>
        </div>
    </div>
    <div>
    </div>
    <!--<c-error :invalid="invalid" :validated="validated" :errors="errors" :properties="properties"/>-->
    <!--</ValidationProvider>-->
</template>


<script>
    import "vue-advanced-cropper/dist/style.css";

    import image from "../mixins/image";
    import input from "../mixins/input";
    import {GDialog} from 'gitart-vue-dialog'
    import {Cropper} from "vue-advanced-cropper";

    export default {
        name: "ImageField",
        props: {
            preview_option: {
                default: null
            },
            ratio: {
                default: 1
            },
            crop: {
                default: true,
            }
        },
        components: {
            GDialog,
            Cropper,
        },
        mixins: [input, image],
        data: () => ({
            dialog: {
                show: false,
                image: null
            },
            stencilProps: {},
            image: null

        }),
        methods: {
            saveCropperImage() {
                window.Bus.emit(`addFile${this.model$}`, this.dialog.cropImage);
                this.closeCropperDialog();

                // _.set(this,'image',["http://wieelz.io:8080/image/image_1642496724819497135.png"])
                // this.image = ["http://wieelz.io:8080/image/image_1642496724819497135.png"];
                // this.dialog.cropImage = null;

                // this.$refs.pond.imagePreviewFilterItem();
                // this.$refs.pond.addFile(this.dialog.cropImage).then((file) => {
                //     // this.cropped.push(file.id);
                //
                //     this.closeCropperDialog();
                // });
            },
            closeCropperDialog() {
                this.dialog.show = false;

                setTimeout(() => {
                    this.dialog.cropImage = null;
                }, 200)
            },
            beforeAddFile({file}) {
                // console.log('this.$refs.pond' , _.get(this.$refs,'pond.pondRef'));
                if (this.dialog.cropImage || !this.crop)
                    return true;

                this.fileToBase64(file).then((encodedFile) => {
                    this.dialog = {
                        show: true,
                        image: encodedFile,
                        cropImage: null
                    };
                });
                return false;
            },
            onAddFile(error, fileInfo) {
                if (error) return;

                if (this.dialog.cropImage)
                    return this.$commit(this.dialog.cropImage);

                this.fileToBase64(fileInfo.file).then((encodedFile) => {
                    return this.$commit(encodedFile);
                });
            },
            onCrop({coordinates, canvas}) {
                this.dialog.cropImage = canvas.toDataURL();
            },
            onRemoveFile(error, fileInfo) {
                if (error) {
                    console.error(error)
                    return
                }
                this.dialog.cropImage = null;
                this.$commit(null);
                // wizardData.logo = null
            },
            async url2blob(url, callback) {
                try {
                    const data = await fetch(url);
                    const blob = await data.blob();
                    callback(blob);
                    // await navigator.clipboard.write([
                    //     new ClipboardItem({
                    //         [blob.type]: blob
                    //     })
                    // ]);
                    console.log("Success.");
                } catch (err) {
                    console.error(err.name, err.message);
                }
            }
        },
        computed: {
            defaultValue() {
                /**
                 * computed property returns default input value
                 * used to init input by this value
                 *
                 * @author WeSSaM
                 */
                return '';
            },

            images() {
                let image = _.get(this.form, this.imageUrlOption, null);
                console.log('images', image);
                return image;
                // let image = _.get(this.dialog, 'cropImage', null);
                if (image)
                // return image;
                    return [
                        image
                    ];

                return null;
            },
            imageUrlOption() {
                return this.preview_option ?? `${this.model$}_url`;
            },
            stencilProps() {
                return {
                    aspectRatio: this.ratio
                }
            },
            acceptedFileTypes() {
                return ['image/png', 'image/jpeg', 'image/gif'];
            }
        },
        watch: {
            'dialog.show': (newVal) => {
                // if (!newVal) {
                //     setTimeout(() => {
                //         this.dialog.cropImage = null;
                //     }, 200)
                // }
            },
            images: {
                deep: true,
                immediate: true,
                async handler(newVal) {
                    if (!newVal)
                        return;

                    this.url2blob(newVal, (blob) => {
                        this.fileToBase64(blob).then((encodedFile) => {
                            this.dialog.cropImage = encodedFile;
                            window.Bus.emit(`addFile${this.model$}`, encodedFile);
                        });
                    });
                }
            }
        }

    };
</script>

<style lang="scss">
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
