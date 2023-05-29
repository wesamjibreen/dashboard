<template>
    <VLoader size="small" :active="isLoading">
        <div class="timeline-wrapper">
            <div class="timeline-header"></div>
            <div class="timeline-wrapper-inner">
                <div class="timeline-container">
                    <!--Timeline item-->
                    <div v-for="notification in notifications" class="timeline-item"
                         :class="{'is-unread' : !notification.seen_at}">
                        <div class="date">
                            <span>{{ notification.date }}</span>
                        </div>
                        <div class="dot is-info" :class="`is-${getClass(notification)}`"></div>
                        <div class="content-wrap">
                            <div class="content-box">
                                <div class="status"></div>
                                <VAvatar :picture="notification.image_url"/>

                                <div class="box-text">
                                    <div class="meta-text">
                                        <p>
                                            <span>{{ notification.title }}</span>
                                            {{ notification.body }}
                                        </p>
                                        <span>{{ notification.time }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="load-more-wrap has-text-centered">
                    <VFlexPagination
                        @handle-pagination="fetch"
                        :paginator="paginator"
                        :resource="`notification`"
                    />
                    <!--                <VButton dark-outlined>Load More</VButton>-->
                </div>
            </div>
        </div>
        <VPlaceholderPage
            v-if="!isLoading && notifications.length === 0"
            :title="trans('datatable.no_results')"
            :subtitle="trans('datatable.no_results_subtitle')"
            larger
        >
            <template #image>
                <img
                    class="light-image"
                    src="/panel/images/illustrations/placeholders/search-4.svg"
                    alt=""
                />
                <img
                    class="dark-image"
                    src="/panel/images/illustrations/placeholders/search-4-dark.svg"
                    alt=""
                />
            </template>
        </VPlaceholderPage>
    </VLoader>
</template>

<script setup>
import {computed, ref, onMounted, inject} from "vue";
import {
    onNotificationMessage,
} from "../../plugins/firebase";
import {useStore} from "vuex";
import useNotifications from "../../composable/useNotifications";

const store = useStore();
const user = computed(() => {
    return store.getters["currentUser"];
});
const appConfig = inject('$config');
const typesClasses = _.get(appConfig, 'app.notifications.typesClasses', {});

const notifications = ref([]);
const notis = useNotifications();
const isLoading = ref(true);
const paginator = ref({});
const currentPage = ref(1);

const getClass = function (row) {
    return _.get(typesClasses, row.type, typesClasses.default ?? "success")
}
const fetch = function (page = 1) {
    currentPage.value = page;
    isLoading.value = true;
    notis.fetchNotifications(function (notifis, pagination) {
        isLoading.value = false
        notifications.value = notifis;
        paginator.value = pagination ?? {};
    }, false, currentPage.value).catch(() => {
        isLoading.value = false;
    });
}
onMounted(() => {
    onNotificationMessage(function (payload) {
        fetch();
    });
    fetch();
});
</script>

<style lang="scss" scoped>
@import '../../../dist/scss/abstracts/all';

/*
  1. Timeline
  2. Timeline Dark mode
  3. Media Queries
*/

/* ==========================================================================
1. Timeline
========================================================================== */
.timeline-wrapper {
    max-width: 940px;
    margin: 0 auto;

    .timeline-wrapper-inner {
        padding-top: 30px;

        .timeline-container {
            .timeline-item {
                position: relative;
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                &::before {
                    content: '';
                    position: absolute;
                    top: 46px;
                    inset-inline-start: 111px;
                    height: 100%;
                    width: 2px;
                    background: var(--placeholder);
                    z-index: 0;
                }

                &:last-child {
                    &::before {
                        display: none;
                    }
                }

                &.is-unread {
                    .content-wrap {
                        .content-box {
                            .status {
                                background: var(--red) !important;
                            }
                        }
                    }
                }

                .date {
                    width: 80px;
                    font-family: var(--font);
                    text-align: inset-inline-end;

                    span {
                        font-size: 0.9rem;
                        color: var(--light-text);
                    }
                }

                .dot {
                    position: relative;
                    height: 14px;
                    width: 14px;
                    border-radius: var(--radius-rounded);
                    border: 2.6px solid var(--primary);
                    margin: 0 25px;
                    z-index: 1;

                    &.is-info {
                        border-color: var(--info);
                    }

                    &.is-success {
                        border-color: var(--success);
                    }

                    &.is-warning {
                        border-color: var(--warning);
                    }

                    &.is-danger {
                        border-color: var(--danger);
                    }

                    &.is-purple {
                        border-color: var(--purple);
                    }
                }

                .content-wrap {
                    @include vuero-s-card;

                    flex-grow: 2;

                    .content-box {
                        display: flex;
                        align-items: center;

                        .status {
                            height: 8px;
                            width: 8px;
                            min-width: 8px;
                            border-radius: var(--radius-rounded);
                            background: var(--light-text-light-15);
                            margin: 0 16px 0 0;
                        }

                        .box-text {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-inline-start: 12px;
                            flex-grow: 2;

                            .meta-text {
                                line-height: 1.2;

                                p {
                                    color: var(--light-text-dark-10);

                                    span {
                                        font-family: var(--font-alt);
                                        color: var(--dark-text);
                                        font-weight: 600;
                                    }

                                    a {
                                        color: var(--primary);
                                    }

                                    .tag {
                                        position: relative;
                                        top: -1px;
                                        font-weight: 500;
                                        line-height: 1.8;
                                        height: 1.8em;
                                        margin: 0 2px;
                                    }
                                }

                                > span {
                                    color: var(--light-text);
                                    font-size: 0.9rem;
                                }
                            }
                        }

                        .box-end {
                            margin-inline-start: auto;

                            .v-avatar {
                                margin: 0 2px;
                            }
                        }
                    }

                    .meta-content {
                        padding-inline-start: 78px;
                    }
                }
            }
        }

        .load-more-wrap {
            padding: 40px 0;

            .button {
                min-width: 240px;
                min-height: 50px;
                text-transform: uppercase;
                font-size: 0.85rem;
                font-weight: 500;
                color: var(--light-text);
            }
        }
    }
}

/* ==========================================================================
2. Timeline Dark mode
========================================================================== */

.is-dark {
    .timeline-wrapper {
        .timeline-wrapper-inner {
            .timeline-container {
                .timeline-item {
                    &::before {
                        background: var(--dark-sidebar-light-20);
                    }

                    .content-wrap {
                        @include vuero-card--dark;

                        .content-box {
                            .status {
                                background: var(--dark-sidebar-light-20);
                            }

                            .box-text {
                                .meta-text {
                                    p {
                                        span {
                                            color: var(--dark-dark-text);
                                        }

                                        a {
                                            color: var(--primary);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .load-more-wrap {
                .button {
                    background: var(--dark-sidebar-light-2) !important;
                }
            }
        }
    }
}

/* ==========================================================================
3. Media Queries
========================================================================== */

@media only screen and (width <= 767px) {
    .timeline-wrapper {
        .timeline-wrapper-inner {
            padding-top: 0;

            .timeline-container {
                .timeline-item {
                    flex-direction: column;

                    &::before {
                        display: none;
                    }

                    .dot {
                        display: none;
                    }

                    .date {
                        align-self: end;
                        margin-bottom: 4px;
                    }

                    .content-wrap {
                        .content-box {
                            .box-end {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
    .timeline-wrapper {
        .timeline-wrapper-inner {
            padding-top: 0;

            .timeline-container {
                .timeline-item {
                    flex-direction: column;

                    &::before {
                        display: none;
                    }

                    .dot {
                        display: none;
                    }

                    .date {
                        align-self: end;
                        margin-bottom: 4px;
                    }

                    .content-wrap {
                        .content-box {
                            .box-end {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
