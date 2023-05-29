<template>
    <div class="saas-billing-wrapper">
        <div class="plans-wrapper">
            <div class="left">
                <div class="inner-wrap">
                    <h3>
                        {{ trans(title) }}
                    </h3>
                    <VField class="plans">
                        <VControl v-for="option in optionsData"
                                  :key="`advanced-radio-${option.id}`" class="plan"
                                  subcontrol>
                            <input type="radio" name="plan_selection"
                                   :id="`advanced-radio-${option.id}`"
                                   :checked="input === option.id"
                                   tabindex="0"
                                   @keydown.space.prevent="input = option.id"
                                   @click="input = option.id"
                            />
                            <VLabel :for-id="`advanced-radio-${option.id}`" raw class="plan-inner">
                                <img :src="getNormalizedValue(option,'icon')" alt=""/>
                                <div class="meta">
                                    <span>{{ getNormalizedValue(option, 'name') }}</span>
                                    <span>{{ getNormalizedValue(option, 'description') }}</span>
                                </div>
                                <div class="checkmark">
                                    <Icon aria-hidden="true" class="iconify" icon="feather:check"></Icon>
                                </div>
                            </VLabel>
                        </VControl>
                    </VField>
                </div>
            </div>
            <div class="right">
                <div class="plan-details">
                    <div v-if="selectedItem?.id" class="plan-details-inner">
                        <div class="plan-description">
                            <div class="left">
                                <img class="light-image" :src="getNormalizedValue(selectedItem, 'light_image')" alt=""/>
                                <img class="dark-image" :src="getNormalizedValue(selectedItem, 'dark_image')" alt=""/>
                            </div>
                            <div class="right">
                                <div class="plan-pricing">
                                    <span>
                                        <strong> {{ getNormalizedValue(selectedItem,'text_dark') }}  </strong>
                                    </span>
                                    <span> {{ getNormalizedValue(selectedItem,'text_green') }}  </span>
                                </div>
                                <div class="plan-moto">
                                    <p>
                                        {{ getNormalizedValue(selectedItem, 'intro') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="plan-summary">
                            <p> {{ getNormalizedValue(selectedItem, 'summary') }} </p>
                            <div class="plan-features">
                                <div class="columns">
                                    <div class="column is-6">
                                        <div class="content">
                                            <ul>
                                                <li v-for="item in getHalfItems(getNormalizedValue(selectedItem,'items',[]))">
                                                    {{ item.text }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="column is-6">
                                        <div class="content">
                                            <ul>
                                                <li v-for="item in getHalfItems(getNormalizedValue(selectedItem,'items',[]),false)">
                                                    {{ item.text }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import input from "../mixins/input";
import options from "../mixins/options";
import VField from "../../base/form/VField.vue";
import VControl from "../../base/form/VControl.vue";
import VLabel from "../../base/form/VLabel.vue";
import VInput from "../../base/form/VInput.vue";

export default {
    name: "AdvancedRadioField",
    props: {
        title: String,
        solid: Boolean,
        square: Boolean,
        normalizer: {
            type: Object,
            default: {
                id: "id",
                name: "name",
                description: "description",
                icon: "icon_url",
                text_dark: "monthly_text",
                text_green: "annual_text",
                light_image: "image_url",
                dark_image: "image_url",
                intro: "intro",
                summary: "summary",
                items: "items",
            }
        },
        color: {
            required: false,
            default: "primary"
        },
        paddingless: Boolean
    },
    components: {VControl, VField, VLabel, VInput},
    mixins: [input, options],
    methods: {
        getNormalizedValue(option, attribute, defaultVal = "") {
            return _.get(option, this.normalizer?.[attribute] ?? attribute, defaultVal);
        },
        getHalfItems(list = [], isFirst = true) {
            const half = Math.ceil(list.length / 2);
            const firstHalf = list.slice(0, half)
            const secondHalf = list.slice(half)
            if (isFirst)
                return firstHalf;
            else
                return secondHalf;

        }
    },
    computed: {
        selectedItem() {
            return this.optionsData.find((el) => el.id === this.input) ?? {};
        }
    }
}
</script>

<style lang="scss">
@import '../../../../dist/scss/abstracts/all';

.saas-billing-wrapper {
    max-width: 980px;
    margin: 0 auto;

    .plans-wrapper {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--fade-grey-dark-4);
        padding-bottom: 20px;
        margin-bottom: 20px;

        .left {
            width: 50%;

            .inner-wrap {
                > h3 {
                    font-family: var(--font-alt);
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--dark-text);
                    margin-bottom: 10px;
                }
            }

            .plans {
                display: flex;
                flex-wrap: wrap;
                margin-inline-start: -8px;
                margin-inline-end: -8px;

                .plan {
                    position: relative;
                    //width: calc(50% - 16px);
                    //max-width: calc(50% - 16px);

                    width: 80%;
                    max-width: 80%;

                    margin: 8px;

                    input {
                        position: absolute;
                        top: 0;
                        inset-inline-start: 0;
                        height: 100%;
                        width: 100%;
                        opacity: 0;
                        cursor: pointer;
                        z-index: 1;

                        &:checked + .plan-inner {
                            border-color: var(--primary);
                            box-shadow: var(--light-box-shadow);

                            img {
                                filter: grayscale(0);
                                opacity: 1;
                            }

                            .checkmark {
                                display: flex;
                            }
                        }
                    }

                    .plan-inner {
                        @include vuero-s-card;

                        width: 100%;
                        flex: 0;
                        display: flex;
                        align-items: center;
                        transition: all 0.3s; // transition-all test

                        img {
                            display: block;
                            height: 32px;
                            width: 32px;
                            min-width: 32px;
                            filter: grayscale(1);
                            opacity: 0.6;
                            pointer-events: none;
                            transition: color 0.3s, background-color 0.3s, border-color 0.3s,
                            height 0.3s, width 0.3s;
                        }

                        .meta {
                            margin-inline-start: 12px;
                            line-height: 1.3;

                            span {
                                display: block;
                                font-family: var(--font);

                                &:first-child {
                                    font-family: var(--font-alt);
                                    font-size: 0.95rem;
                                    font-weight: 600;
                                    color: var(--dark-text);
                                }

                                &:nth-child(2) {
                                    color: var(--light-text);
                                    font-size: 0.85rem;
                                }
                            }
                        }

                        .checkmark {
                            margin-inline-start: auto;
                            display: none;
                            justify-content: center;
                            align-items: center;
                            height: 32px;
                            width: 32px;
                            min-width: 32px;
                            border-radius: var(--radius-rounded);
                            background: var(--white);
                            border: 1px solid var(--fade-grey-dark-3);
                            box-shadow: var(--light-box-shadow);
                            color: var(--success);

                            svg {
                                width: 16px;
                                height: 16px;
                                stroke-width: 3px;
                            }
                        }
                    }
                }
            }
        }

        .right {
            width: 45%;
            padding: 20px 0;
            margin-inline-start: auto;

            .plan-details {
                > h3 {
                    font-family: var(--font);
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: var(--dark-text);
                    margin-bottom: 10px;
                }

                .plan-details-inner {
                    .plan-description {
                        display: flex;
                        align-items: center;

                        .left {
                            max-width: 200px;

                            img {
                                display: block;
                                height: 160px;
                                width: 160px;
                                min-width: 160px;
                                margin: 0 auto;
                            }
                        }

                        .right {
                            flex-grow: 2;

                            .plan-pricing {
                                padding: 5px 0 10px;
                                font-family: var(--font);
                                line-height: 1.3;

                                span {
                                    display: block;
                                    font-size: 0.9rem;
                                    font-weight: 500;
                                    color: var(--primary);
                                    font-family: var(--font-alt);

                                    &:first-child {
                                        color: var(--dark-text);
                                    }

                                    b {
                                        font-size: 2rem;
                                        font-family: var(--font);
                                    }
                                }
                            }

                            .plan-moto {
                                p {
                                    font-size: 0.9rem;
                                }
                            }
                        }
                    }

                    .plan-summary {
                        .plan-features {
                            ul {
                                font-family: var(--font-alt);
                                font-size: 0.95rem;
                                color: var(--dark-text);
                            }
                        }
                    }
                }
            }
        }
    }

    .billing-options-wrapper {
        display: flex;
        align-items: flex-start;

        .left {
            width: 50%;

            .option-block {
                @include vuero-s-card;

                margin-bottom: 20px;

                .block-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;

                    h3 {
                        font-family: var(--font-alt);
                        font-size: 1rem;
                        font-weight: 600;
                        color: var(--dark-text);
                    }

                    span {
                        font-family: var(--font);
                        color: var(--light-text);
                    }

                    a {
                        font-family: var(--font);
                        color: var(--light-text);

                        &:hover,
                        &:focus {
                            color: var(--primary);
                        }
                    }
                }

                .block-body {
                    &.is-seats {
                        display: flex;
                        padding-bottom: 10px;

                        .v-avatar {
                            margin-inline-end: 8px;
                        }

                        .add-seat {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 40px;
                            width: 40px;
                            min-width: 40px;
                            border-radius: var(--radius-rounded);
                            border: 1.6px dashed var(--light-text);
                            color: var(--light-text);
                            padding: 0;
                            background: none;
                            margin-inline-start: 4px;
                            cursor: pointer;
                            transition: color 0.3s, background-color 0.3s, border-color 0.3s,
                            height 0.3s, width 0.3s;

                            &:hover,
                            &:focus {
                                border: 1.6px solid var(--primary);
                                color: var(--primary);
                            }

                            svg {
                                height: 16px;
                                width: 16px;
                            }
                        }
                    }
                }
            }
        }

        .right {
            width: 45%;
            margin-inline-start: auto;

            .payment-form {
                padding: 20px 30px;
                background: var(--white);
                border-radius: var(--radius);
                border: 1px solid var(--fade-grey-dark-3);

                .form-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    h3 {
                        font-family: var(--font-alt);
                        font-size: 1rem;
                        font-weight: 600;
                        color: var(--dark-text);
                    }

                    span {
                        font-family: var(--font);
                        color: var(--light-text);
                        cursor: pointer;
                    }
                }

                .form-container {
                    padding: 30px 0 20px;
                    max-width: 330px;
                    margin: 0 auto;
                    color: #707070;

                    .column {
                        padding: 0.25rem 0.75rem;
                    }

                    .field {
                        margin-bottom: 0;

                        .control {
                            position: relative;

                            .creditcardIcon {
                                svg {
                                    height: 30px;
                                    position: absolute;
                                    inset-inline-end: -2px;
                                    top: 4px;
                                    width: 60px;
                                }
                            }
                        }
                    }

                    .button-wrap {
                        padding-top: 16px;

                        .v-button {
                            min-height: 50px;
                        }
                    }
                }
            }
        }
    }
}

.is-dark {
    .saas-billing-wrapper {
        .plans-wrapper {
            border-color: var(--dark-sidebar-light-20);

            .left {
                .inner-wrap {
                    > h3 {
                        color: var(--dark-dark-text);
                    }
                }

                .plans {
                    .plan {
                        input {
                            &:checked + .plan-inner {
                                border-color: var(--primary) !important;
                            }
                        }

                        .plan-inner {
                            @include vuero-card--dark;

                            .meta span {
                                &:first-child {
                                    color: var(--dark-dark-text);
                                }
                            }

                            .checkmark {
                                background: var(--dark-sidebar-light-2);
                                border-color: var(--dark-sidebar-light-12);
                            }
                        }
                    }
                }
            }

            .right {
                .plan-details {
                    .plan-details-inner {
                        .plan-description {
                            .right {
                                .plan-pricing span {
                                    &:first-child {
                                        color: var(--dark-dark-text);
                                    }

                                    &:nth-child(2) {
                                        color: var(--primary);
                                    }
                                }
                            }
                        }

                        .plan-summary {
                            .plan-features {
                                ul {
                                    color: var(--dark-dark-text);
                                }
                            }
                        }
                    }
                }
            }
        }

        .billing-options-wrapper {
            .left {
                .option-block {
                    @include vuero-card--dark;

                    .block-header {
                        h3 {
                            color: var(--dark-dark-text);
                        }

                        a:hover {
                            color: var(--primary);
                        }
                    }

                    .block-body {
                        &.is-seats {
                            .add-seat:hover {
                                border-color: var(--primary);
                                color: var(--primary);
                            }
                        }
                    }
                }
            }

            .right {
                .payment-form {
                    background: var(--dark-sidebar-light-6);
                    border-color: var(--dark-sidebar-light-12);

                    .form-header {
                        h3 {
                            color: var(--dark-dark-text);
                        }

                        span:hover,
                        a:hover {
                            color: var(--primary);
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (width <= 767px) {
    .saas-billing-wrapper {
        .plans-wrapper {
            flex-direction: column;

            .left,
            .right {
                width: 100%;
                max-width: 100%;
            }

            .left {
                .plans {
                    .plan {
                        .plan-inner {
                            position: relative;
                            flex-direction: column;
                            text-align: center;

                            .checkmark {
                                position: absolute;
                                top: 10px;
                                inset-inline-end: 10px;
                            }
                        }
                    }
                }
            }

            .right {
                .plan-details {
                    .plan-details-inner {
                        .plan-summary {
                            .plan-features {
                                .columns {
                                    display: flex;
                                }
                            }
                        }
                    }
                }
            }
        }

        .billing-options-wrapper {
            flex-direction: column;

            .left,
            .right {
                width: 100%;
                max-width: 100%;
            }
        }
    }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
    .saas-billing-wrapper {
        max-width: 690px;

        .plans-wrapper {
            flex-direction: column;

            .left,
            .right {
                width: 100%;
                max-width: 100%;
            }

            .left {
                .plans {
                    .plan {
                        .plan-inner {
                            position: relative;
                            flex-direction: column;
                            text-align: center;

                            .checkmark {
                                position: absolute;
                                top: 10px;
                                inset-inline-end: 10px;
                            }
                        }
                    }
                }
            }

            .right {
                .plan-details {
                    .plan-details-inner {
                        .plan-summary {
                            .plan-features {
                                .columns {
                                    display: flex;
                                }
                            }
                        }
                    }
                }
            }
        }

        .billing-options-wrapper {
            flex-direction: column;

            .left,
            .right {
                width: 100%;
                max-width: 100%;
            }
        }
    }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: landscape) {
    .saas-billing-wrapper {
        .plans-wrapper {
            .left {
                .plans {
                    .plan {
                        .plan-inner {
                            .checkmark {
                                position: absolute;
                                top: 10px;
                                inset-inline-end: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
