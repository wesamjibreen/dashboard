<template>
  <div class="timeline-wrapper">
    <div class="timeline-header"></div>
    <div class="timeline-wrapper-inner">
      <div class="timeline-container">
        <!-- notifications list -->
        <div v-if="notifications.length > 0">
          <div
            class="timeline-item"
            v-for="(notification, index) in notifications"
            :key="index"
          >
            <!-- <div class="date">
            <span>Sep 23, 2020</span>
          </div> -->
            <!-- <div class="dot is-danger"></div> -->
            <div class="content-wrap">
              <div class="content-box">
                <!-- <div class="status"></div> -->
                <!-- <VAvatar :picture="notification.image" /> -->
                <img
                  alt=""
                  :src="
                    notification.image ||
                    require('../../../../assets/notification_icon.png')
                  "
                />
                <div class="mx-4">
                  <div class="">
                    <p>
                      {{ notification.image }}
                    </p>
                    <p>
                      {{ notification.body }}
                    </p>
                    <!-- <span>{{ notification.date }}</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="">
          <div class="columns pa-6 is-mobile is-centered">
            <div class="column is-half">
              <h1>no notifications</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- <div
        v-if="notifications.length > 0"
        class="load-more-wrap has-text-centered"
      >
        <VButton dark-outlined @click="loadMoreClick">Load More</VButton>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, defineComponent, onMounted } from "vue";
import {
  messaging,
  getFCMToken,
  subscribeTokenToTopic,
  firebaseSettings,
  onNotificationMessage,
} from "../../../../plugins/firebase";
import { useStore } from "vuex";
import useNotifications from "../../../../composable/useNotifications";

const store = useStore();
const user = computed(() => {
  return store.getters["currentUser"];
});

const notifications = ref([]);

onMounted(() => {
  const notis = useNotifications();
  onNotificationMessage(function (payload) {
    notis.fetchNotifications(function (notifis) {
      notifications.value = notifis;
    });
  });

  notis.fetchNotifications(function (notifis) {
    notifications.value = notifis;
  });
});
</script>


<style lang="scss" scoped>
@import "../../../../scss/abstracts/_mixins.scss";

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
          content: "";
          position: absolute;
          top: 46px;
          left: 111px;
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
          text-align: right;

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
          @include vuero-s-card();

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
              margin-left: 12px;
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
              margin-left: auto;

              .v-avatar {
                margin: 0 2px;
              }
            }
          }

          .meta-content {
            padding-left: 78px;
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
            @include vuero-card--dark();

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

@media only screen and (max-width: 767px) {
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

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
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
