<!--<template>-->
<!--<div>-->
<!--<n-color-picker />-->

<!--</div>-->

<!--</template>-->
<!--<script>-->
<!--import input from "../mixins/input"-->

<!--export default {-->
<!--mixins : [input],-->
<!--components : {-->

<!--}-->
<!--}-->
<!--</script>-->

<template>
    <!--<div :style="{background: color}">-->
    <!---->
    <!--</div>-->
    <div>
        <ColorPicker
                theme="light"
                :color="input"
                :sucker-hide="true"
                :sucker-canvas="suckerCanvas"
                :sucker-area="suckerArea"
                @openSucker="openSucker"

                @changeColor="changeColor"
        />
    </div>
    <!--<h1> color filed</h1>-->
</template>

<script>
    import {ColorPicker} from 'vue-color-kit'
    import input from "../mixins/input";

    export default {
        name: "ColorField",
        components: {
            ColorPicker,
        },
        mixins: [input],
        data() {
            return {
                color: '#59c7f9',
                suckerCanvas: null,
                suckerArea: [],
                isSucking: false,
            }
        },
        methods: {
            changeColor(color) {
                console.log('changeColor', color);
                const {r, g, b, a} = color.rgba;
                this.input = color.hex;
// this.input = "#" + this.rgba2hex(`rgba(${r}, ${g}, ${b}, ${a})`).toUpperCase();
            },
            openSucker(isOpen) {
                if (isOpen) {
// ... canvas be created
// this.suckerCanvas = canvas
// this.suckerArea = [x1, y1, x2, y2]
                } else {
// this.suckerCanvas && this.suckerCanvas.remove
                }
            },
            rgba2hex(orig) {
                var a, isPercent,
                    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
                    alpha = (rgb && rgb[4] || "").trim(),
                    hex = rgb ?
                        (rgb[1] | 1 << 8).toString(16).slice(1) +
                        (rgb[2] | 1 << 8).toString(16).slice(1) +
                        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

                if (alpha !== "") {
                    a = alpha;
                } else {
                    a = `01`;
                }
// multiply before convert to HEX
                a = ((a * 255) | 1 << 8).toString(16).slice(1)
                hex = hex + a;

                return hex;
            }
        },
    }
</script>

<style>
    @import '~vue-color-kit/dist/vue-color-kit.css';
    /*.hu-color-picker.light {*/
    /*width: 100% !important;*/
    /*}*/
    ul.colors {
        display: none;
    }

    .color-type {
        display: none;
    }

    .color-show canvas {
        width: 100% !important;
    }

    .hu-color-picker.light {
        width: 54% !important;
    }
</style>