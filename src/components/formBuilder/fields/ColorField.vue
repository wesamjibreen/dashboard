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
    <div class="field-container">
        <ColorPicker class="input --color-input" format="hex" v-model:pureColor="input" :isWidget="inline"/>

        <!--<ColorPicker-->
        <!--theme="light"-->
        <!--:color="input"-->
        <!--:sucker-hide="true"-->
        <!--:sucker-canvas="suckerCanvas"-->
        <!--:sucker-area="suckerArea"-->
        <!--@openSucker="openSucker"-->
        <!--@changeColor="changeColor"-->
        <!--/>-->
    </div>
    <!--<h1> color filed</h1>-->
</template>

<script>
    // import {ColorPicker} from 'vue-color-kit'
    import input from "../mixins/input";
    import {ColorPicker} from "vue3-colorpicker";
    import "vue3-colorpicker/style.css";

    // import Vue3ColorPicker from "vue3-colorpicker";
    // import "vue3-colorpicker/style.css";
    export default {
        name: "ColorField",
        components: {
            // ColorPicker,
            ColorPicker,
        },
        mixins: [input],
        props: {
            inline: Boolean
        },
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
    .vc-color-wrap.transparent {
        background-image: none !important;
        width: 100% !important;


        background-color: white !important;
        color: white;

        -webkit-appearance: none;
        align-items: center;
        border: 1px solid transparent;
        border-radius: var(--radius);
        box-shadow: none;
        display: inline-flex;
        font-size: 1rem;
        height: 2.5em;
        justify-content: flex-start;
        line-height: 1.5;
        padding-bottom: calc(0.5em - 1px);
        padding-left: calc(0.75em - 1px);
        padding-right: calc(0.75em - 1px);
        padding-top: calc(0.5em - 1px);
        position: relative;
        vertical-align: top;
    }
</style>