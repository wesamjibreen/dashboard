<template>
    <div class="sidebar-panel is-generic">
        <div class="subpanel-header">
            <!-- <h3 class="no-mb">{{ title }}</h3>
            <div class="panel-close" @click="$emit('close')">
                <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </div> -->

            <div class="logo">
                <AnimatedLogo/>
                <!--<img src="/panel/images/logo-header.png">-->
                <!--<img :src="logo">-->
            </div>
        </div>
        <div data-simplebar>
            <ul class="menu">
                <li v-for="(item,index) in menu" class="menu-item" @click.exact="setActive(item, index)"
                    :class="{ 'is-open': activeIndex === index }">
                    <div class="menu-link" @click="mainGo(item)">
                        <span class="menu-arrow" v-if="hasChildren(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11.061" height="6.28"
                                 viewBox="0 0 11.061 6.28">
                                <path id="Path_2187" data-name="Path 2187" d="M1320,150l5,5,5-5"
                                      transform="translate(-1319.47 -149.47)" fill="none" stroke="#19324b"
                                      stroke-linejoin="round" stroke-width="1.5"/>
                            </svg>
                        </span>
                        <span class="menu-title">{{ trans(item.label) }}</span>
                        <span class="menu-icon"><Icon aria-hidden="true" :icon="`${item.icon}`"></Icon></span>
                    </div>
                    <div class="menu-sub" v-if="hasChildren(item)">
                        <div class="menu-item" v-for=" child in item?.children ">
                            <RouterLink v-bind="child"
                                        :class="['menu-link' , isActive(child) && 'router-link-active router-link-exact-active'] ">
                                <span class="menu-title">{{ trans(child.label) }}</span>

                                <span class="menu-icon">
                                    <Icon aria-hidden="true" :icon="`${child.icon}`"></Icon>
                                    <i aria-hidden="true" :class="`${child.icon}`"></i>
                                </span>

                                <!--<span class="menu-arrow">-->
                                <!--<svg xmlns="http://www.w3.org/2000/svg" width="5.28" height="9.061"-->
                                <!--viewBox="0 0 5.28 9.061">-->
                                <!--<path id="Path_2192" data-name="Path 2192" d="M1320,150l4,4,4-4"-->
                                <!--transform="translate(154.75 -1319.47) rotate(90)" fill="none"-->
                                <!--stroke="#19324b" stroke-linejoin="round" stroke-width="1.5"/>-->
                                <!--</svg>-->
                                <!--</span>-->
                            </RouterLink>
                        </div>

                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    import {sidebar} from "../../mixins";
    import {useRoute} from "vue-router";

    export default {
        mixins: [sidebar],
        data() {
            return {
                activeIndex: undefined
            }
        },
        beforeUpdate() {
            let route = useRoute();
            console.log('beforeUpdate', route.name)
            // this.setActiveItem();

        },
        created() {
            // let route = useRoute();
            // this.$watch(route.name, () => {
            //     alert('okk');
            // }, {deep: true, immediate: true});

            this.setActiveItem();
        },
        methods: {
            setActiveItem() {
                let route = useRoute();
                let resourceName = (route.name ?? "").split(".")?.[0];
                this.activeIndex = _.findIndex(this.menu, {children: [{key: resourceName}]});
            },

            setActive(ss, index) {
                if (index === this.activeIndex)
                    this.activeIndex = -1;
                else
                    this.activeIndex = index;
            },
            hasChildren(item) {
                return item.children?.length > 0;
            },
            children(item) {
                return _.get(item, 'children', [])
            },
            mainGo(item) {
                if (item.to)
                    this.$router.push(item.to)

            },
            isActive(item) {
                let route = useRoute();
                let resourceName = (route.name ?? "").split(".")?.[0];
                return resourceName === item.key;
            }
        },
        computed: {
            menu() {
                return _.get(this.$instance, 'config.menu', [])
            },
            logo() {
                return this.appConfig('logo.light')
            }

        },
        watch: {
            '$route.name': {
                handler() {
                    alert('okk');
                    this.setActiveItem()
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../scss/layout/_sidebar-panel.scss';

    .sidebar-panel.is-generic .subpanel-header {
        justify-content: center;
        padding: 35px 0px;
        height: auto;
        margin-bottom: 20px;
    }

    .sidebar-panel {
        background-color: var(--body-color);
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }

        .menu {
            .menu-item {
                padding: 0px 20px;
                height: auto;
                margin-bottom: 20px;

                .menu-link {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding: 10px 15px 10px 20px;
                    color: #19324B;
                    background-color: #e1ebf5;
                    font-size: 14px;
                    border-radius: 10px;
                    transition: background-color .2s ease-in-out, box-shadow .2s ease-in-out;

                    .menu-arrow {
                        display: flex;
                        align-items: center;
                        flex-shrink: 0;
                        margin-left: 0.5rem;
                        width: 0.8rem;
                        height: 0.8rem;
                        transition: color .2s ease-in-out;

                        svg {
                            path {
                                transition: stroke .2s ease-in-out
                            }
                        }
                    }

                    .menu-icon {
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 0.5rem;
                        transition: color .2s ease-in-out
                    }

                    .menu-title {
                        flex-grow: 1;
                        transition: color .2s ease-in-out
                    }

                    &:hover, &.active {
                        background-color: var(--primary);
                        box-shadow: 0px 6px 9px var(--primary) 40;

                        .menu-arrow, .menu-icon, .menu-title {
                            color: #FFF;
                        }

                        .menu-arrow {
                            svg {
                                path {
                                    stroke: #FFF
                                }
                            }
                        }
                    }

                }

                .menu-sub {
                    padding-right: 22px;
                    position: relative;
                    margin-top: 10px;
                    max-height: 0;
                    opacity: 0;
                    transition: all .2s ease-in-out;

                    &::before {
                        position: absolute;
                        content: "";
                        right: 20px;
                        width: 1px;
                        background-color: #A0B4C8;
                        height: 100%;
                        top: 0;
                    }

                    .menu-item {
                        padding-left: 0;
                        padding-right: 0;
                        margin-bottom: 5px;
                        margin-right: 8px;

                        .menu-link {
                            padding-left: 10px;
                            background-color: transparent;

                            &::before {
                                position: absolute;
                                content: "";
                                right: -9px;
                                width: 10px;
                                background-color: #A0B4C8;
                                height: 1px;
                                top: 50%;
                                transform: translateY(50%);
                            }

                            .menu-arrow {
                                margin: 0;
                                /*opacity: 0;*/
                                transition: all .2s ease-in-out !important;
                            }

                            &:hover, &.active, &.router-link-active.router-link-exact-active {
                                background-color: #E1EBF5;
                                box-shadow: none;

                                .menu-arrow {
                                    opacity: 1;

                                    svg {
                                        path {
                                            stroke: var(--primary)
                                        }
                                    }
                                }

                                .menu-title {
                                    color: var(--primary);
                                }

                                .menu-icon {
                                    color: var(--primary);
                                }
                            }
                        }
                    }
                }

                &.is-open {
                    > .menu-link {
                        background-color: var(--primary) !important;
                        box-shadow: 0px 6px 9px var(--primary) 40;

                        .menu-arrow, .menu-icon, .menu-title {
                            color: #FFF;
                        }

                        .menu-arrow {
                            svg {
                                path {
                                    stroke: #FFF
                                }
                            }
                        }
                    }


                    .router-link-exact-active {
                        color: var(--primary);
                        background-color: #E1EBF5;
                        box-shadow: none;

                    }

                    .router-link-exact-active .menu-arrow {
                        opacity: 1;

                        svg {
                            path {
                                stroke: var(--primary)
                            }
                        }
                    }
                }

                &.is-open {
                    .menu-sub {
                        max-height: fit-content;
                        opacity: 1;
                    }
                }
            }
        }

    }

    html[dir="ltr"] {
        .sidebar-panel {
            .menu {
                .menu-item {
                    .menu-link {
                        padding: 10px 20px 10px 15px;

                        .menu-arrow {
                            margin-right: 0.5rem;
                            margin-left: 0
                        }
                    }

                    .menu-sub {
                        padding-left: 22px;
                        padding-right: 0px;

                        &::before {
                            left: 20px;
                            right: auto;
                        }

                        .menu-item {
                            margin-left: 8px;
                            margin-right: 0;

                            .menu-link {
                                &::before {
                                    left: -9px;
                                    right: auto;
                                }

                                .menu-arrow {
                                    transform: rotate(180deg);
                                }
                            }
                        }

                    }

                }

            }

        }
    }


    .is-dark {
        .sidebar-panel .menu .menu-item .menu-link {
            color: #ffffff;

            .menu-arrow {
                svg {
                    path {
                        stroke: #FFF;
                    }
                }
            }
        }

        .sidebar-panel .menu .menu-item > .menu-link {
            background-color: #222225;
        }

        .sidebar-panel .menu .menu-item .menu-sub .menu-item .menu-link:hover, .sidebar-panel .menu .menu-item .menu-sub .menu-item .menu-link.active,
        .sidebar-panel .menu .menu-item .menu-sub .menu-item .menu-link.router-link-active.router-link-exact-active {
            background-color: #27272a;
        }
    }
</style>
