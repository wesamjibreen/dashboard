<template>
    <div>
        <!-- class="sidebar-panel is-generic" :class="`${sidebarclass}`" -->
        <div :class="['sidebar-panel is-generic',sidebarclass , mobileOpen && 'is-active' ]">
            <div class="subpanel-header mb-0" v-if="sidebarclass != 'theme1'">
                <div class="logo">
                    <AnimatedLogo/>
                </div>
            </div>

            <div data-simplebar class="aside">

                <Toolbar class="desktop-toolbar" v-if="sidebarclass === 'theme1'">
                    <UserProfileDropdown up/>
                    <ToolbarNotification v-if="notifications.config.display"/>
                    <a
                        class="toolbar-link right-panel-trigger"
                        aria-label="View activity panel"
                        @click="activePanel = 'languages'"
                    >
                        <!-- <Icon icon="grommet-icons:language"/> -->
                        <i class="lnil lnil-world"></i>
                    </a>
                    <!-- <NotificationsMobileDropdown /> -->
                    <div class="logout">
                        <button @click="logout">
                            <svg data-v-280b1501="" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round" class="feather feather-power">
                                <path data-v-280b1501="" d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                <line data-v-280b1501="" x1="12" y1="2" x2="12" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </Toolbar>
                <div class="head-menu-mobile d-lg-none">
                    <div class="dropdown-head py-2">
                        <VAvatar
                            size="medium"
                            picture="/panel/images/avatars/svg/vuero-1.svg"
                        />

                        <div class="meta">
                    <span>
                        {{ userData$?.name }}
                           <strong v-if="userData$?.hasOwnProperty('status')"
                                   :class="` ${ statusStyle$ }`">{{ userData$?.status?.name }}</strong>
                    </span>
                            <span>{{ userData$?.email }}</span>
                            <span v-if="userData$?.hasOwnProperty('wallet_balance')">{{ trans('wallet') }} : {{ userData$?.wallet_balance }}</span>
                        </div>
                    </div>
                    <div class="head-menu-mobile-end">
                        <VDropdown icon="feather:more-vertical">
                            <template #content>
                                <div v-for="(item, index) in profileQuickMenu">
                                    <div style="cursor: pointer" @click="action(item, index)" role="menuitem"
                                         class="dropdown-item is-media">
                                        <div class="icon">
                                            <i aria-hidden="true" :class="`${item.icon}`"></i>
                                        </div>
                                        <div class="meta">
                                            <span>{{ trans(item?.label) }}</span>
                                            <span>{{ trans(item?.description) }}</span>
                                        </div>
                                    </div>
                                </div>

                                    <!--                                    <hr class="dropdown-divider"/>-->
                                    <!--                                <a href="#" role="menuitem" class="dropdown-item is-media">-->
                                    <!--                                    <div class="icon">-->
                                    <!--                                    <i aria-hidden="true" class="lnil lnil-users-alt"></i>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="meta">-->
                                    <!--                                    <span>Team</span>-->
                                    <!--                                    <span>Manage your team</span>-->
                                    <!--                                    </div>-->
                                    <!--                                </a>-->

                                    <!--                                <hr class="dropdown-divider"/>-->

                                    <!--                                <a href="#" role="menuitem" class="dropdown-item is-media">-->
                                    <!--                                    <div class="icon">-->
                                    <!--                                    <i aria-hidden="true" class="lnil lnil-cog"></i>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="meta">-->
                                    <!--                                    <span>Settings</span>-->
                                    <!--                                    <span>Account settings</span>-->
                                    <!--                                    </div>-->
                                    <!--                                </a>-->
                            </template>
                        </VDropdown>
                        <ToolbarNotification v-if="notifications.config.display"/>
                    </div>
                </div>
                <perfect-scrollbar class="menu-scroll">
                    <ul class="menu">
                        <li v-for="(item, index) in menu" class="menu-item" :class="{ 'is-open': isOpen(index) }"
                            @click="nextMenu()">
                            <div class="menu-link" @click="setActive(item, index)"
                                 :class="{ 'menu-link-has-dropdown': hasChildren(item) ,  'router-link-active': isOpen(index) && !hasChildren(item) }">
                                <span class="menu-arrow" v-if="hasChildren(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11.061" height="6.28"
                                         viewBox="0 0 11.061 6.28">
                                            <path id="Path_2187"
                                                  data-name="Path 2187"
                                                  d="M1320,150l5,5,5-5"
                                                  transform="translate(-1319.47 -149.47)"
                                                  fill="none"
                                                  stroke="#19324b"
                                                  stroke-linejoin="round"
                                                  stroke-width="1.5"
                                            />
                                    </svg>
                                </span>
                                <span class="menu-title">{{ trans(item.label) }}</span>
                                <span class="menu-icon"
                                ><i aria-hidden="true" :class="`${item.icon}`"></i
                                ></span>
                            </div>
                            <div class="menu-sub" v-if="hasChildren(item)" ref="panel">
                                <div class="menu-back mb-5 pb-2 mt-5" @click="backMenu"><i
                                    class="lnil lnil-chevron-left"></i> Go back from Settings
                                </div>
                                <div class="menu-item" v-for="child in item?.children" @click="$emit('toggle')">
                                    <RouterLink
                                        v-bind="child"
                                        :class="['menu-link', isActive(child) && 'router-link-active router-link-exact-active']">
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
                </perfect-scrollbar>
                <div class="dropdown-item is-button d-lg-none btn-logout">
                    <VButton
                        class="logout-button"
                        icon="feather:log-out"
                        color="primary"
                        role="menuitem"
                        raised
                        @click="logout"
                        fullwidth
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="vue-feather group-hover-text-theme feather feather-power">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                            <line x1="12" y1="2" x2="12" y2="12"></line>
                        </svg>
                        {{ trans("logout") }}
                    </VButton>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import {sidebar} from "../../mixins";
import {useRoute} from "vue-router";
import {useStorage} from "@vueuse/core";
import {PerfectScrollbar} from "vue3-perfect-scrollbar";
import {useStore} from "vuex";
import {Icon} from "@iconify/vue";
import {activePanel} from "../../state/activePanelState";
import useNotifications from "../../composable/useNotifications";
import {LOGOUT} from "../../store/modules/auth.module";
import {mapState} from "vuex";
import {SET_AUTH} from "../../store/modules/auth.module";
export default {
    components: {
        PerfectScrollbar,
        Icon
    },
    mixins: [sidebar],
    props: {
        mobileOpen: Boolean
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const notifications = useNotifications();
        return {
            route,
            store,
            notifications,
            activePanel,
        };
    },
    data() {
        return {
            activeIndex: undefined,
            user_data:null


        };
    },
    created() {
        this.setActiveItem();
        // this.fetchUserData();
        let _this=this;
        window.Bus.off('nav-bar-mobile-opened')
        window.Bus.on('nav-bar-mobile-opened',function (){
            _this.fetchUserData();
        })

    },
    methods: {
        action(item, index) {

            this.$router.push(item.to);
        },
        setActiveItem() {
            let route = this.route?.name ?? "";
            let resourceName = route.split(".")?.[0];
            this.activeIndex = _.findIndex(this.menu, {
                children: [{key: resourceName}],
            });
        },
        setActive(item, index) {
            if (index === this.activeIndex) this.activeIndex = -1;
            else this.activeIndex = index;

            if (item.to) this.$router.push(item.to);

        },
        fetchUserData() {
            if (this.userEndPoint)
                this.request(
                    this.$endPoint(this.userEndPoint),
                    {},
                    ({data}) => {
                        if (data.data.auth){
                            this.$store.commit(SET_AUTH, data);
                        }
                        // this.user_data = data.data;

                    },
                    (xhr) => {

                    },
                    () => {
                        // this.loading = false;
                    }
                )
        },
        closeMenu() {
            this.activeIndex = -1;
        },
        hasChildren(item) {
            return item.children?.length > 0;
        },
        children(item) {
            return _.get(item, "children", []);
        },
        isActive(item) {
            let route = useRoute();
            let resourceName = (route.name ?? "").split(".")?.[0];
            return resourceName === item.key;
        },
        isOpen(index) {
            return this.activeIndex === index;
        },
        logout() {
            this.$router.push({name: "login"}).then(() => {
                this.$store.dispatch(LOGOUT);
                this.$bus.emit("logout");

                // clear local storage data
                // localStorage.removeItem(`${this.$base}_determinant`);
                // localStorage.removeItem(`${this.$base}_determinant_key`);
            });
        },
        nextMenu() {
            // document.querySelectorAll(".menu-scroll > .menu > .menu-item").forEach((element) => {
            //     for (let i = 0; i < element.length; i++) {
            //         var c = 0;
            //         while (c < element.length) {
            //         element[c++].classList.add('d-block')
            //         }
            //         element[i].classList.add('d-b3333lock')
            //     }
            // })
            // this.setActiveItem();
            // document.querySelectorAll(".menu-scroll > .menu > .menu-item").forEach((element) => {
            //     document.querySelectorAll(".menu-scroll > .menu > .menu-item").forEach((element) => {
            //      element.classList.add('d-none')
            //     })
            //     element.classList.add('d-block')
            //     element.classList.remove('d-none')
            // })
        },
        backMenu() {
            this.activeIndex = -1;
            // document.querySelectorAll(".menu-scroll > .menu > .menu-item").forEach((element) => {
            //     console.log("🚀 ~ file: DashboardsSubsidebar.vue:183 ~ document.querySelectorAll ~ element:", element)
            //     element.classList.remove('d-block')
            //     element.classList.remove('d-none')
            // })
        }
    },
    computed: {
        ...mapState({
            user: (state) => state.auth.user,
        }),
        userEndPoint() {
            return this.appConfig("user.endPoint", null);

        },
        userData$() {
            return  this.user;
        },
        statusClass$() {
            return _.get(this?.userData$, 'status.class', null);
        },
        statusStyle$() {
            return this.statusClass$ ? `status-user ${this.statusClass$}` : '';
        },
        menu() {
            let menuItems = _.get(this.$instance, "config.menu", []);
            if (this.appConfig("permissions.enabled", false)) {
                let filteredMenu = [];
                let policies = this.userPolicies ?? [];

                _.forEach(menuItems, (item) => {
                    // if (item.key == "dashboard")
                    //     filteredMenu.push(item);

                    let itemKey = item.key.replaceAll("_", "-");
                    let children = _.filter(item.children, (child) => {
                        let childKey = child.key.replaceAll("_", "-");
                        return (
                            policies.includes(`${childKey}.show`) ||
                            policies.includes(`${childKey}`) ||
                            policies.includes(`others.${childKey}`)
                        );
                    });
                    if (policies.includes(`${itemKey}.show`) ||
                        children.length > 0 ||
                        policies.includes(`others.${item.key}`)) {
                        if (children.length > 0)
                            item.children = children;
                        filteredMenu.push(item);
                    }
                });

                return filteredMenu;
            }
            return menuItems;
        },
        logo() {
            return this.appConfig("logo.light");
        },
        theam() {
            return this.appConfig("theme", 'theam1');
        },
        header() {
            return this.appConfig("header.show", false);
        },
        sidebar() {
            return this.appConfig("sidebar.show", false);

        },
        sidebarclass() {
            return this.appConfig("sidebar.class", "");

        },
        profileQuickMenu() {
            return this.appConfig("profile_quick_menu", []);

        },
        userPolicies() {
            // let $auth = useStorage(`${this.$base}_user`, {});
            // let policies = $auth.value?.policies;
            let policies = _.get(this.store.getters["currentUser"], 'policies');
            return policies ? atob(policies).split(",") : [];
        },
    },
    watch: {
        "route.name": {
            handler(newVal) {
                // this.setActiveItem();
            },
        },
    },
};
</script>


<style lang="scss">
@import "../../scss/layout/_sidebar-panel.scss";

.ps {
    height: calc(100vh - 170px);
}

.sidebar-panel {
    overflow: unset;
}

/*
 * Container style
 */
.ps {
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}

/*
 * Scrollbar rail styles
 */
.ps__rail-x {
    display: none;
    opacity: 0;
    transition: background-color 0.2s linear, opacity 0.2s linear;
    -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
    height: 15px;
    /* there must be 'bottom' or 'top' for ps__rail-x */
    bottom: 0px;
    /* please don't change 'position' */
    position: absolute;
}

.ps__rail-y {
    display: none;
    opacity: 0;
    transition: background-color 0.2s linear, opacity 0.2s linear;
    -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
    width: 15px;
    /* there must be 'right' or 'left' for ps__rail-y */
    right: 0;
    /* please don't change 'position' */
    position: absolute;
}

.ps--active-x > .ps__rail-x,
.ps--active-y > .ps__rail-y {
    display: block;
    background-color: transparent;
}

.ps:hover > .ps__rail-x,
.ps:hover > .ps__rail-y,
.ps--focus > .ps__rail-x,
.ps--focus > .ps__rail-y,
.ps--scrolling-x > .ps__rail-x,
.ps--scrolling-y > .ps__rail-y {
    opacity: 0.6;
}

.ps .ps__rail-x:hover,
.ps .ps__rail-y:hover,
.ps .ps__rail-x:focus,
.ps .ps__rail-y:focus,
.ps .ps__rail-x.ps--clicking,
.ps .ps__rail-y.ps--clicking {
    background-color: #eee;
    opacity: 0.9;
}

/*
 * Scrollbar thumb styles
 */
.ps__thumb-x {
    background-color: #aaa;
    border-radius: 6px;
    transition: background-color 0.2s linear, height 0.2s ease-in-out;
    -webkit-transition: background-color 0.2s linear, height 0.2s ease-in-out;
    height: 6px;
    /* there must be 'bottom' for ps__thumb-x */
    bottom: 2px;
    /* please don't change 'position' */
    position: absolute;
}

.ps__thumb-y {
    background-color: #aaa;
    border-radius: 6px;
    transition: background-color 0.2s linear, width 0.2s ease-in-out;
    -webkit-transition: background-color 0.2s linear, width 0.2s ease-in-out;
    width: 6px;
    /* there must be 'right' for ps__thumb-y */
    right: 2px;
    /* please don't change 'position' */
    position: absolute;
}

.ps__rail-x:hover > .ps__thumb-x,
.ps__rail-x:focus > .ps__thumb-x,
.ps__rail-x.ps--clicking .ps__thumb-x {
    background-color: #999;
    height: 11px;
}

.ps__rail-y:hover > .ps__thumb-y,
.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: #999;
    width: 11px;
}

/* MS supports */
@supports (-ms-overflow-style: none) {
    .ps {
        overflow: auto !important;
    }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .ps {
        overflow: auto !important;
    }
}

.ps {
    position: relative;
}

.menu-scroll {
    flex: 1 0 0%;
    height: calc(100vh - 30px);
}

.menu-scroll .ps__rail-y {
    inset-inline-start: auto !important;
    inset-inline-end: 0 !important;
}

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
                color: #19324b;
                background-color: #e1ebf5;
                font-size: 14px;
                border-radius: 10px;
                transition: background-color 0.2s ease-in-out,
                box-shadow 0.2s ease-in-out;

                .menu-arrow {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    margin-left: 0.5rem;
                    width: 0.8rem;
                    height: 0.8rem;
                    transition: color 0.2s ease-in-out;

                    svg {
                        path {
                            transition: stroke 0.2s ease-in-out;
                        }
                    }
                }

                .menu-icon {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 0.5rem;
                    transition: color 0.2s ease-in-out;
                }

                .menu-title {
                    flex-grow: 1;
                    transition: color 0.2s ease-in-out;
                }

                &:hover,
                &.active {
                    background-color: var(--primary);
                    box-shadow: 0px 6px 9px var(--primary) 40;

                    .menu-arrow,
                    .menu-icon,
                    .menu-title {
                        color: #fff;
                    }

                    .menu-arrow {
                        svg {
                            path {
                                stroke: #fff;
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
                transition: all 0.2s ease-in-out;

                &::before {
                    position: absolute;
                    content: "";
                    right: 20px;
                    width: 1px;
                    background-color: #a0b4c8;
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
                            background-color: #a0b4c8;
                            height: 1px;
                            top: 50%;
                            transform: translateY(50%);
                        }

                        .menu-arrow {
                            margin: 0;
                            /*opacity: 0;*/
                            transition: all 0.2s ease-in-out !important;
                        }

                        &:hover,
                        &.active,
                        &.router-link-active.router-link-exact-active {
                            background-color: #e1ebf5;
                            box-shadow: none;

                            .menu-arrow {
                                opacity: 1;

                                svg {
                                    path {
                                        stroke: var(--primary);
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

                    .menu-arrow,
                    .menu-icon,
                    .menu-title {
                        color: #fff;
                    }

                    .menu-arrow {
                        svg {
                            path {
                                stroke: #fff;
                            }
                        }
                    }
                }

                .router-link-exact-active {
                    color: var(--primary);
                    background-color: #e1ebf5;
                    box-shadow: none;
                }

                .router-link-exact-active .menu-arrow {
                    opacity: 1;

                    svg {
                        path {
                            stroke: var(--primary);
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
                        margin-left: 0;
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
                    stroke: #fff;
                }
            }
        }
    }

    .sidebar-panel .menu .menu-item > .menu-link {
        background-color: #222225;
    }

    .sidebar-panel .menu .menu-item .menu-sub .menu-item .menu-link:hover,
    .sidebar-panel .menu .menu-item .menu-sub .menu-item .menu-link.active,
    .sidebar-panel
    .menu
    .menu-item
    .menu-sub
    .menu-item
    .menu-link.router-link-active.router-link-exact-active {
        background-color: #27272a;
    }
}

.ps__rail-x {
    display: none !important;
}
</style>
