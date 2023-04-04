<template>

    <div>

        <div v-for="(cropperDialog, i) in cropperDialogs"
             :key="`cropper_dialog_${i}`">
            <GDialog v-model="cropperDialog.show" max-width="420px">
                <div class="card">
                    <div class="card-body">
                        <cropper
                                class="cropper"
                                :src="cropperDialog.image"
                                @change="onCropperChange($event, cropperDialog)"

                        ></cropper>
                    </div>
                    <div class="card-footer">

                        <vButton @click="closeCropperImageDialog(cropperDialog)">
                            {{ trans("cancel") }}
                        </vButton>
                        <vButton @click="saveCropperImage(cropperDialog)">
                            {{ trans("save") }}
                        </vButton>
                        <!--<vButton>-->
                        <!--{{ trans( 'save')}}-->
                        <!--</vButton>-->
                        <!--<vButton>-->
                        <!--{{ trans( 'cancel')}}-->
                        <!--</vButton>-->
                    </div>
                </div>

                <!--@change="onCropperChange($event, cropperDialog)"-->
                <!--:stencil-props="{        aspectRatio,  }"-->

            </GDialog>
            <!--<v-dialog v-model="cropperDialog.show" scrollable max-width="420px">-->
            <!--<v-card>-->
            <!--<v-card-title> {{ __trans("crop_image") }}</v-card-title>-->
            <!--<cropper-->
            <!--class="cropper"-->
            <!--:src="cropperDialog.image"-->
            <!--:stencil-props="{-->
            <!--aspectRatio,-->
            <!--}"-->
            <!--@change="onCropperChange($event, cropperDialog)"-->
            <!--&gt;</cropper>-->
            <!--<v-card-actions>-->
            <!--<v-spacer></v-spacer>-->
            <!--<v-btn-->
            <!--color="green darken-1"-->
            <!--text-->
            <!--@click="closeCropperImageDialog(cropperDialog)"-->
            <!--&gt;-->
            <!--{{ __trans("cancel") }}-->
            <!--</v-btn>-->
            <!--<v-btn-->
            <!--color="green darken-1"-->
            <!--text-->
            <!--@click="saveCropperImage(cropperDialog)"-->
            <!--&gt;-->
            <!--{{ __trans("save") }}-->
            <!--</v-btn>-->
            <!--</v-card-actions>-->
            <!--</v-card>-->
            <!--</v-dialog>-->
        </div>


        <div class="columns drop-zone-container">
            <div class="column is-3">
                <DropZone
                        ref="imgDropZone"
                        v-on:added-file="vdropzoneFileAdded"
                        :maxFiles="Number(10000000000)"
                        url="/image/upload"
                        :uploadOnDrop="false"
                        :multipleUpload="true"
                        :headers="{
                     _token: CSRF  }"
                />
            </div>
            <div class="column is-9">


            </div>


        </div>


    </div>

    <!--v-bind="options"-->

    <!--</div>-->
</template>

<!--<script>-->

<!--export default defineComponent({-->
<!---->
<!--name: 'App',-->
<!--setup() {-->
<!--return {-->
<!--};-->
<!--},-->
<!--});-->
<!--</script>-->
<script>
    import DropZone from 'dropzone-vue';
    import 'dropzone-vue/dist/dropzone-vue.common.css';
    import {GDialog} from 'gitart-vue-dialog'
    import {Cropper} from "vue-advanced-cropper";
    import "vue-advanced-cropper/dist/style.css";

    export default {
        name: "DropzoneField",
        components: {
            GDialog,
            Cropper,
            DropZone,
        },
        props: {
            aspectRatio: {
                required: false,
                default: 1,
            },
            useCropper: {
                required: false,
                default: true,
            },
            resize: {
                required: false,
                default: null
            },
        },
        methods: {
            // onFileAdded(file) {
            //     this.setCropperImage(file);
            //     this.dialog = true;
            //     console.log('onFileAdded', file);
            // },
            // setCropperImage(file) {
            //     var reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onload = () => {
            //         this.cropperImg = reader.result;
            //     };
            //     reader.onerror = function (error) {
            //         this.cropperImg = null;
            //     };
            // },
            setCropperImageBase64({file}, cropDialogIndex) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                const _this = this;
                reader.onload = function () {
                    _this.cropperDialogs[cropDialogIndex].image = reader.result;
                };
                reader.onerror = function (error) {
                };
            },
            onCropperChange({coordinates, canvas}, cropperDialog) {
                cropperDialog.cropImage = canvas.toDataURL();
            },
            uploadCropperImage(data) {
                const _this = this;
                this.request(
                    {method: "POST", url: "/image/upload"},
                    {
                        file: data,
                        resize: this.resize
                    },
                    function (response) {
                        const data = response.data.data;
                        _this.addImage(data);
                    },
                    function (response) {
                        console.log("ALBUM image upload error", response);
                    }
                );
            },
            addImage(data) {
                this.images.push(data);
                this.input = this.images;
            },
            closeCropperImageDialog(cropperDialog) {
                const cropperDialogIndex = this.cropperDialogs.indexOf(cropperDialog);
                this.cropperDialogs.splice(cropperDialogIndex, 1);
            },
            saveCropperImage(cropperDialog) {
                this.closeCropperImageDialog(cropperDialog);
                let tmp = this.dataURLtoFile(cropperDialog.cropImage, this.currentFile.id);
                this.files[this.currentFile.id] = tmp;
                // console.log('tempfile', tmp);
                // this.uploadCropperImage(cropperDialog.cropImage);
                // this.addImage({url: cropperDialog.cropImage})
            },

            __removeImg(image, i) {
                console.log("ALBUM remove image", this.inputValue);
                let images = _.filter(
                    JSON.parse(JSON.stringify(this.images)),
                    function (img) {
                        return image.id !== img.id;
                    }
                );
                this.$set(this, "images", images);
            },
            onInputCreated() {
                // this.$root.$on(
                //     "form-data-fetched",
                //     function (formModule, data) {
                //         if (formModule !== this.formModule) return;
                //         this.images = this.inputValue && this.inputValue.length > 0 ? this.inputValue : data[this.model$];
                //     }.bind(this)
                // );
                // this.inputValue
                // this.$refs.myVueDropzone.autoDiscover = false;
                // alert(this.uploadURL);
            },
            vdropzoneFileAdded(file) {

                if (!this.useCropper)
                    return;

                this.cropperDialogs.push({show: true, image: "", cropImage: ""});
                this.setCropperImageBase64(file, this.cropperDialogs.length - 1);
                this.currentFile = file;


                // this.removeFile(file.id);
                // _.map(, ([value, key]) => {
                // });
                // Object.entries(this.files ?? {}).forEach(([value, key]) => {
                //     console.log("ALBUM added", key, value, file);
                // })
                // this.files = {};
                // this.$refs.imgDropZone.removeFile(file);
                // this.dropZoneRef.processQueue();

            },
            addFile(file) {
                this.files['fffffffff'] = {file}
            },
            removeFile(id) {
                // console.log("ALBUM added", key, value, file);
                let files = {};
                Object.entries(this.files ?? {}).forEach(([key, value]) => {
                    if (key !== id)
                        files[key] = value;
                });
                this.files = files;
            },
            onSuccess(file, {data}) {
                // this function runs when cropper is not used
                this.addImage(data);
                // this.$refs.imgDropZone.removeFile(file);
                console.log("ALBUM afterComplete", data, this.input);
            },
            dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], filename, {type: mime});
            }

        }
        ,
        data() {
            return {
                currentFile: null,
                images: [],
                index: null,
                CSRF: document.querySelector("meta[name=csrf-token]").getAttribute('content'),
                cropperDialogs: [],
            };
        }
        ,
        computed: {

            dropZoneRef() {
                return _.get(this, '$refs.imgDropZone', null);
            }
            ,
            files: {
                set(newVal) {
                    this.dropZoneRef.all = newVal;
                }
                ,
                get() {
                    return _.get(this, 'dropZoneRef.all', {});
                }
            }
            ,
            options() {
                return {
                    url: '/image/upload',
                    thumbnailWidth: 100,
                    maxFilesize: 15,
                    // headers: {Authorization: "Bearer " + getToken()},
                    thumbnailHeight: 100,
                    addRemoveLinks: false,
                    acceptedFiles: ".jpg, .jpeg, .png",
                    dictDefaultMessage: `
                      <p class='text-default'><i class='fa fa-cloud-upload mr-2'></i>${this.trans("DragImages")}</p>
                      <p class="form-text">${this.trans("AllowedFiles")}: .jpg, .jpeg, .png</p>`,
                }
            }
        }

    }
</script>

<style>
    form.dropzone.dropzone__box.dropzone-clickable {
        min-height: 170px;
    }
</style>
