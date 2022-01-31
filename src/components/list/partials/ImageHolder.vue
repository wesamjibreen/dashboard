<template>
    <viewer :images="[imageSrc]">
        <img class="file-icon file-icon1" :class="classes" :src="imageSrc"/>
    </viewer>
</template>

<script>
    import 'viewerjs/dist/viewer.css';

    export default {
        name: "ImageHolder",
        props: {
            src: {
                default: null,
                required: false
            },
            row: {
                default: {}
            },
            column: {
                default: {}
            },
            classes: {
                default: []
            }
        },
        computed: {
            imageSrc() {
                return _.get(this.row, this.column?.value, '/panel/images/avatars/svg/vuero-1.svg');
            },
        }
    }
</script>

<style>
    .file-icon1 {
        height: 40px;
        width: 40px;
    }

    img.file-icon.file-icon1 {
        border-radius: 5px;
    }

    img.file-icon.file-icon1.on-boarding-screen {
        width: 150px !important;
        height: auto !important;
        max-height: 100px !important;
        min-height: 100px !important;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
