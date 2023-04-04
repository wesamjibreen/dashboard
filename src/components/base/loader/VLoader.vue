<template>
    <a-spin :indicator="indicator" :spinning="active">
        <slot></slot>
    </a-spin>
</template>
<script>
import {LoadingOutlined} from '@ant-design/icons-vue';
import {h} from "vue";

export default {
    props: {
        size: {
            default: undefined
        },
        card: {
            default: undefined
        },
        active: {
            default: false
        },
        translucent: {
            default: false
        },
        grey: {
            default: false
        },
    },
    setup() {
        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: '35px',
            },
            class: "is-primary",
            spin: true,
        });
        return {
            indicator,
        };
    }
}
</script>

