<script>
    export default {
        props: {
            light: {
                default: true
            }
        },
        computed: {
            logo() {
                return this.appConfig(`logo.${this.light ? 'light' : 'dark'}`, '/panel/images/logo.png');
            },
            classes() {
                let classes = this.appConfig(`logo.classes`);
                return classes instanceof Array ? classes : [classes];
            },
            style() {
                return this.appConfig(`logo.style`);
            }
        }
        // logo :
    }
</script>
<template>
    <img :class="['panel-logo',...classes]" :style="style" :src="logo"/>
</template>

<style lang="scss" scoped>
    @import '../../scss/layout/_sidebar.scss';

    .right {
        fill: var(--primary-dark-7);
    }

    .bottom {
        fill: var(--primary);
    }

    .left {
        fill: var(--primary-light-15);
    }

    .is-roll,
    svg:hover {
        .right {
            animation: is-roll-right 8s ease infinite;
            animation-fill-mode: forwards;
            animation-delay: 0s;
        }

        .left {
            animation: is-roll-left 8s ease infinite;
            animation-fill-mode: forwards;
            animation-delay: 0s;
        }

        .bottom {
            animation: is-roll-bottom 8s ease infinite;
            animation-fill-mode: forwards;
            animation-delay: 0s;
        }
    }

    .is-light {
        .right {
            fill: var(--white);
            animation: none;
        }

        .bottom {
            fill: #fffc;
            animation: none;
        }

        .left {
            fill: #fffa;
            animation: none;
        }
    }

    @keyframes is-roll-right {
        0% {
            fill: var(--primary-dark-7);
        }
        33% {
            fill: var(--primary-light-8);
        }
        66% {
            fill: var(--primary-light-40);
        }
        100% {
            fill: var(--primary-dark-7);
        }
    }

    @keyframes is-roll-bottom {
        0% {
            fill: var(--primary);
        }
        33% {
            fill: var(--primary-light-24); //darken(#1ee8c0, 7%);
        }
        66% {
            fill: var(--primary-light-20);
        }
        100% {
            fill: var(--primary);
        }
    }

    @keyframes is-roll-left {
        0% {
            fill: var(--primary-light-15);
        }
        33% {
            fill: var(--primary-light-12); //lighten(#1ee8c0, 15%);
        }
        66% {
            fill: var(--primary-light-15);
        }
        100% {
            fill: var(--primary-light-15);
        }
    }
</style>
