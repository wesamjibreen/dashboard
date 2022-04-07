<script setup >
import { ref, inject, reactive, defineComponent, onMounted } from "vue";
import {
  messaging,
  getFCMToken,
  subscribeTokenToTopic,
  firebaseSettings,
  onNotificationMessage,
} from "../../../plugins/firebase";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import useDropdown from "../../../composable/useDropdown";
import useNotyf from "../../../composable/useNotyf";
import useRequest from "../../../composable/useRequest";
import useNotifications from "../../../composable/useNotifications";

const router = useRouter();

import { useViaPlaceholderError } from "../../../composable/useViaPlaceholderError";
import { Icon } from "@iconify/vue";
defineComponent(Icon);
const dropdownElement = ref();
const dropdown = useDropdown(dropdownElement);
const store = useStore();
const user = computed(() => {
  return store.getters["currentUser"];
});
let { endPoint, request } = useRequest();

const notifications = ref([]);

const seeAllClick = function () {
  router.push({
    name: "notifications",
  });
  dropdown.close();
};

onMounted(() => {
  const notis = useNotifications();
  getFCMToken(function (currentToken) {
    // console.log("TOKEN", currentToken);
    const topicName = `admins-${user?.value.id}`;
    subscribeTokenToTopic(currentToken, "admins");
    subscribeTokenToTopic(currentToken, topicName);
  });

  onNotificationMessage(function (payload) {
    const title = payload.notification.title;
    const body = payload.notification.body;
    const notif = useNotyf();
    notif.success({
      message: `${title}: ${body} `,
      duration: 5000,
      position: {
        x: "right",
        y: "top",
      },
    });

    notis.fetchNotifications(function (notifis) {
      notifications.value = notifis;
    }, true);
  });

  notis.fetchNotifications(function (notifis) {
    notifications.value = notifis;
  }, true);
});

const def = ref(require("../../../assets/notification_icon.png"));

const getImgUrl = (path) => {
  return require("../../../assets/notification_icon.png");
  // return require("@/assets/" + "notification_icon.png");
};
</script>

<template>
  <div class="toolbar-notifications">
    <div
      ref="dropdownElement"
      class="dropdown is-spaced is-dots is-right dropdown-trigger"
    >
      <div class="is-trigger" aria-haspopup="true" @click="dropdown.toggle">
        <!--<i aria-hidden="true" class="iconify" data-icon="feather:bell"></i>-->
        <Icon icon="feather:bell" />
        <!-- <span class="new-indicator pulsate"></span> -->
      </div>

      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="heading">
            <div class="heading-left">
              <h6 class="heading-title">    {{ trans('notifications') }}</h6>
            </div>
            <div class="heading-right">
              <p class="notification-link" @click="seeAllClick">{{ trans('see_all') }}</p>
            </div>
          </div>

          <div v-if="notifications.length > 0">
            <ul class="notification-list">
              <li v-for="(notification, index) in notifications" :key="index">
                <a class="notification-item">
                  <div class="img-left">
                    <img
                      alt=""
                      :src="
                        notification.image ||
                        require('../../../assets/notification_icon.png')
                      "
                    />
                  </div>
                  <div class="user-content">
                    <p class="user-info">
                      {{ notification.title }}
                    </p>
                    {{ notification.body }}
                    <p></p>
                    <!-- <p class="time">{{ notification.date }}</p> -->
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div v-else>
            <div class="columns pa-6 is-mobile is-centered">
              <div class="column is-half">
                <h1>{{ trans('no notifications') }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
