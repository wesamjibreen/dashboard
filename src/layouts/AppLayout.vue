<template>
    <div class="sidebar-layout">
        <div class="app-overlay"></div>
        <AlertDialog/>
        <!-- Mobile navigation -->
        <MobileNavbar :is-open="isMobileSidebarOpen"
                      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen">
            <template #brand>
                <RouterLink :to="{ name: 'dashboard' }" class="navbar-item is-brand">
                    <AnimatedLogo width="38px" height="38px"/>
                </RouterLink>

                <div class="brand-end">
                    <NotificationsMobileDropdown/>
                    <UserProfileDropdown/>
                </div>
            </template>
        </MobileNavbar>
        <!-- Mobile sidebar links -->
        <MobileSidebar :is-open="isMobileSidebarOpen" @toggle="isMobileSidebarOpen = !isMobileSidebarOpen">
            <template #links>
                <li v-for="item in menu">
                    <a :class="[activeMobileSubsidebar === item.key && 'is-active']"
                       :data-content="trans(item.label??item.key)"
                       @click="switchSidebar(item.key,item)"
                       :aria-label="trans(item.label??item.key)">
                        <Icon class="sidebar-icon" :icon="item.icon"/>
                    </a>
                </li>
            </template>
            <template #bottom-links>
                <li>
                    <a href="#">
                        <i aria-hidden="true"
                           class="iconify"
                           data-icon="feather:settings"
                        ></i>
                    </a>
                </li>
            </template>
        </MobileSidebar>
        <!-- Mobile subsidebar links -->
        <transition name="slide-x">
            <DashboardsMobileSubsidebar
                    v-if="isMobileSidebarOpen"
                    :active-sub-sidebar="activeMobileSubsidebar"
                    @close="isDesktopSidebarOpen = false"/>
        </transition>

        <!-- Desktop navigation -->
        <CircularMenu/>

        <!-- <transition name="slide-x"> -->
            <DashboardsSubsidebar
                    v-if="isDesktopSidebarOpen"
                    :desktop-opened="isDesktopSidebarOpen"
                    :active-sub-sidebar="activeMobileSubsidebar"
                    @close="isDesktopSidebarOpen = false">
            </DashboardsSubsidebar>
        <!-- </transition> -->

        <CountriesPanel/>

        <LanguagesPanel/>



<!--<Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">-->
<!--            <template #links>-->
<!--                <li v-for="item in menu">-->
<!--                    <a :class="[activeMobileSubsidebar === item.key && 'is-active']"-->
<!--                       :data-content="trans(item.label??item.key)"-->
<!--                       :aria-label="trans(item.label??item.key)"-->
<!--                       @click="switchSidebar(item.key,item)">-->
<!--                        <Icon class="sidebar-icon" :icon="item.icon"/>-->
<!--                    </a>-->
<!--                </li>-->
<!--            </template>-->

<!--            <template #bottom-links>-->

<!--                <li>-->
<!--                    <UserProfileDropdown up/>-->
<!--                </li>-->
<!--            </template>-->
<!--        </Sidebar>-->


        <div class="view-wrapper">
            <div class="page-content-wrapper">
                <template v-if="props.nowrap">
                    <slot></slot>
                </template>
                <div v-else class="page-content is-relative">
                    <div class="page-title has-text-centered">
                        <!-- Sidebar Trigger -->
                        <!-- <div class="vuero-hamburger nav-trigger push-resize"
                             @click="isDesktopSidebarOpen == !isDesktopSidebarOpen">
                            <span class="menu-toggle has-chevron">
                                <span :class="[isDesktopSidebarOpen && 'active']" class="icon-box-toggle">
                                    <span class="rotate">
                                        <i aria-hidden="true" class="icon-line-top"></i>
                                        <i aria-hidden="true" class="icon-line-center"></i>
                                        <i aria-hidden="true" class="icon-line-bottom"></i>
                                    </span>
                                </span>
                            </span>
                        </div> -->

                        <div class="title-wrap">
                            <!--<VBreadcrumb :items="breadcrumb" with-icons/>-->
                            <h4 class="title is-6">
                                {{ trans('welcome')  }},
                                <span class="title is-5">
                                    {{user?.name}}
                                </span>
                                <!--{{ pageTitle }}-->
                            </h4>
                        </div>

                        <Toolbar class="desktop-toolbar">
                            <a class="toolbar-link right-panel-trigger"
                               aria-label="View activity panel"
                               @click="activePanel = 'languages'">
                                <Icon icon="grommet-icons:language"/>
                            </a>
                            <ToolbarNotification v-if="isNotificationDisplayed"/>

                            <UserProfileDropdown up/>

                        </Toolbar>
                    </div>


                    <!--<transition name="fade">-->

                    <!--<router-view></router-view>-->
                    <slot></slot>
                    <!--</transition>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {computed, inject, reactive, ref, watch, watchPostEffect} from 'vue'
    import {useRoute, useRouter} from 'vue-router'
    import {Icon} from '@iconify/vue';
    import {activePanel} from '../state/activePanelState'
    import {pageTitle} from '../state/sidebarLayoutState'
    import useCountry from '../composable/useCountry'
    import AlertDialog from "../components/dialog/AlertDialog";
    import {mapState} from "vuex";

    export default {
        components: {
            AlertDialog,
            Icon
        },
        setup(props) {
            // let menuItems = ref([
            //     {
            //         key: "dashboard",
            //         label: "dashboard",
            //         icon: "feather:activity",
            //     }
            // ]);


            // let props = withDefaults(
            //     defineProps(),
            //     {
            //         defaultSidebar: 'dashboard',
            //         theme: 'default',
            //         openOnMounted: false
            //     }
            // );
            if (!props)
                props = {
                    defaultSidebar: 'dashboard',
                    theme: 'default',
                    openOnMounted: false
                };
            let route = useRoute();
            let isMobileSidebarOpen = ref(false);
            let isDesktopSidebarOpen = ref((props && props.openOnMounted ? props.openOnMounted : true))
            let activeMobileSubsidebar = ref(props && props.defaultSidebar ? props.defaultSidebar : "dashboard")
            let router = useRouter();
            const {isNotificationDisplayed}  = useCountry();
            let $instance = inject('$instance');
            let menuItems = ref(_.get($instance, 'config.menu', []));


            let activeItem = computed(() => {
                return route.name;
            });

            const breadcrumb = reactive([
                {
                    // label: 'Vuero',
                    // hideLabel: true,
                    to: {
                        name: "dashboard"
                    },
                    icon: 'feather:home',
                    // use external links
                    // link: 'https://vuero.cssninja.io/',
                },

            ]);

            function switchSidebar(id, item) {
                if (item.to)
                    return router.push(item.to);

                if (id === activeMobileSubsidebar.value)
                    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
                else {
                    isDesktopSidebarOpen.value = true
                    activeMobileSubsidebar.value = id
                }
            }

            /**
             * watchPostEffect callback will be executed each time dependent reactive values has changed
             */
            watchPostEffect(() => {
                const isOpen = isDesktopSidebarOpen.value
                const wrappers = document.querySelectorAll('.view-wrapper')

                wrappers.forEach((wrapper) => {
                    if (isOpen === false) {
                        wrapper.classList.remove('is-pushed-full')
                    } else if (!wrapper.classList.contains('is-pushed-full')) {
                        wrapper.classList.add('is-pushed-full')
                    }
                })
            });
            watch(
                () => route.fullPath,
                () => {
                    console.log('$instance', menuItems.value, activeItem.value, $instance);
                    // menuItems.value = [];
                    let splits = route.name?.split(".");

                    let currentPath = "";
                    let array = _.map(splits, (split) => {
                        currentPath += `${split}.`;
                        return {
                            to: {
                                name: currentPath,
                            },
                            label: currentPath,
                            icon: 'feather:home',
                        }
                    });

                    breadcrumb.value = [
                        {
                            // label: 'Vuero',
                            // hideLabel: true,
                            to: {
                                name: "dashboards"
                            },
                            icon: 'feather:home',
                            // use external links
                            // link: 'https://vuero.cssninja.io/',
                        },
                        ...array
                    ];
                    isMobileSidebarOpen.value = false

                    if (props.closeOnChange && isDesktopSidebarOpen.value) {
                        isDesktopSidebarOpen.value = false
                    }
                }
            );
            //
            // const breadcrumb = computed(() => {
            //     console.log('route.name', route.name.split("."))
            //
            //     let array = [
            //         {
            //             to: {
            //                 name: "dashboard"
            //             },
            //             icon: 'feather:home',
            //         }
            //     ];
            //
            //
            //     return array;
            // });

            // const breadcrumb = [
            //     {
            //         // label: 'Vuero',
            //         // hideLabel: true,
            //         to: {
            //             name: "dashboard"
            //         },
            //         icon: 'feather:home',
            //         // use external links
            //         // link: 'https://vuero.cssninja.io/',
            //     },
            //     {
            //         label: 'Components',
            //         icon: 'feather:cpu',
            //         // or generate a router link with 'to' props
            //         // to: {
            //         //     name: 'components',
            //         // },
            //     },
            //     {
            //         label: 'VBreadcrumb',
            //         icon: 'feather:cpu',
            //
            //     },
            // ];

            return {
                breadcrumb,
                props,
                switchSidebar,
                activeMobileSubsidebar,
                isDesktopSidebarOpen,
                route,
                isMobileSidebarOpen,
                activePanel,
                pageTitle,
                menuItems,
            }
        },
        data: () => ({}),
        computed: {
            menu() {
                return _.get(this.$instance, 'config.menu', [])
            },
            nestedMenu() {
                console.log('nestedMenu', _.filter(this.menu, (item) => item.children.length > 0));
                return _.filter(this.menu, (item) => item.children.length > 0)
            },
            ...mapState({
                user: (state) => state.auth.user
            })
        },

    }
</script>
<style>
    .sidebar-icon {
        color: var(--title-grey);
        stroke-width: 1.6px;
        transition: all 0.3s;
        height: 20px !important;
        width: 20px !important;
    }

    /*.title {*/
        /*color: var(--primary) !important;*/
    /*}*/
</style>
