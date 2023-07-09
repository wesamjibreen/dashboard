<template>
    <div class="card">
        <div class="card-head">
            <div class="list-flex-toolbar justify-content-between mb-0 flex-wrap p-3">
                <h3 class="dark-inverted">{{ getValueByLocale(title) }}</h3>
            </div>
        </div>
        <div class="active-list p-3">
            <div class="checkboxes-list">
                <div v-for="(item,index) in data" :key="index" class="list-item" @click="onClick(item)">
                    <div :class="`animated-checkbox ${item?.checked ? 'is-checked' : 'is-unchecked'}`">
                        <input id="animated-checkbox-1" type="checkbox" value="value_1"/>
                        <label for="animated-checkbox-1" class="checkmark-wrap">
                            <div class="shadow-circle"></div>
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"></circle>
                                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
                            </svg>
                        </label>
                    </div>
                    <div class="item-meta"><span class="dark-inverted">{{ getValueByLocale(item?.title) }}</span><span>{{getValueByLocale(item?.subtitle)}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dashboard from "./dashboard";

export default {
    name: "TaskList",
    mixins: [dashboard],
    props: {
        title: {
            default: '',
            type: String,
        },
    },
    methods: {
        onClick(row) {
            if (row?.route)
                this.$router.push(row?.route)
        }
    }
}
</script>

<style>
.card {
    font-family: var(--font);
}

.justify-content-between {
    justify-content: space-between;
}

.checkboxes-list .list-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0;
    border: none;
}

.animated-checkbox {
    position: relative;
    height: 32px;
    width: 32px;
}

.checkboxes-list .list-item .item-meta {
    margin-inline-start: 1rem;
}

.checkboxes-list .list-item .item-meta span {
    display: block;
    line-height: 1.4;
}

.checkboxes-list .list-item .item-meta span:first-child {
    font-size: .95rem;
    font-weight: 600;
    color: #000;
}

.checkboxes-list .list-item .item-meta span:nth-child(2) {
    font-size: .9rem;
    color: #a2a5b9;
}

.animated-checkbox input {
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
}

.animated-checkbox .checkmark-wrap {
    position: relative;
    height: 32px;
    width: 32px;
    display: inline-block;
}

.checkboxes-list .list-item .animated-checkbox .checkmark-wrap {
    position: relative;
}

.animated-checkbox .checkmark-wrap .shadow-circle {
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    height: 32px;
    width: 32px;
    border-radius: var(--radius-rounded);
    border: 1px solid #cfcfcf;
    z-index: 0;
    opacity: 1;
    transition: all .2s;
}

.animated-checkbox .checkmark-wrap .checkmark {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    color: #cfcfcf;
    stroke: #cfcfcf;
    stroke-miterlimit: 10;
    margin: 0 auto;
    box-shadow: inset 0 0 0 #2aac8e;
}

.animated-checkbox .checkmark-wrap .checkmark-circle {
    height: 32px;
    width: 32px;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    fill: none;
    color: var(--primary);
    stroke: var(--primary);
}

.animated-checkbox.is-unchecked .checkmark-circle {
    animation: reverseCircle .6s cubic-bezier(.65, 0, .45, 1) .2s both;
}

.animated-checkbox .checkmark-wrap .checkmark-check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    color: var(--primary);
    stroke: var(--primary);
}

.animated-checkbox.is-checked .checkmark-circle {
    animation: stroke .6s cubic-bezier(.65, 0, .45, 1) both;
}

@keyframes stroke {
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes reverseCircle {
    0% {
        stroke-dashoffset: 0;
    }
    to {
        stroke-dashoffset: 166;
    }
}

@keyframes reverseCheck {
    0% {
        stroke-dashoffset: 0;
    }
    to {
        stroke-dashoffset: 48;
    }
}

.is-dark .animated-checkbox .checkmark-wrap .checkmark-circle,
.is-dark .animated-checkbox .checkmark-wrap .checkmark-check {
    color: var(--primary);
}

.is-dark .animated-checkbox .checkmark-wrap .shadow-circle {
    border-color: var(--dark-sidebar-light-20);
}

.animated-checkbox.is-checked .checkmark-check {
    animation: stroke .3s cubic-bezier(.65, 0, .45, 1) .8s both;
}
</style>
