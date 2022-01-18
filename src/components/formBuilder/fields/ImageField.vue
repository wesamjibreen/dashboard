<template>
    <div>
        <VFilePond class="profile-filepond"
                   name="profile_filepond"
                   :chunk-retry-delays="[500, 1000, 3000]"
                   label-idle="<i class='lnil lnil-cloud-upload'></i>"
                   :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']"
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
        />
    </div>
    <!--<c-error :invalid="invalid" :validated="validated" :errors="errors" :properties="properties"/>-->
    <!--</ValidationProvider>-->
</template>


<script>
    import input from "../mixins/input";

    export default {
        name: "ImageField",
        props: {
            preview_option: {
                default: null
            },
        },
        components: {},
        mixins: [input],
        // created(){
        //   alert('image field created');
        // },
        methods: {
            onAddFile(error, fileInfo) {
                if (error) {
                    console.error(error)
                    return
                }

                const _file = fileInfo.file
                console.log('onAddFile', _file);

                var reader = new FileReader();
                reader.readAsDataURL(_file);
                reader.onload = () => {
                    this.$commit(reader.result);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
                // if (_file) {
                //     wizardData.logo = _file
                // }
            },
            onRemoveFile(error, fileInfo) {
                if (error) {
                    console.error(error)
                    return
                }

                // wizardData.logo = null
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
                if (image)
                    return [
                        image
                    ];

                return [];
            },
            imageUrlOption() {
                return this.preview_option || `${this.model$}_url`;
            },
        },
        watch: {
            images: {
                deep: true,
                immediate: true,
                handler(newVal) {
                    console.log('imagessssssssssss', newVal);

                }
            }
        }

    };
</script>

<style scoped>
</style>
