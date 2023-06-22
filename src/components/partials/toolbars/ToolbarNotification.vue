<script setup>
import {ref, inject, reactive, defineComponent, onMounted} from "vue";
import {getValueByLocale} from "../../../utils/helper";
import {
    messaging,
    getFCMToken,
    subscribeTokenToTopic,
    firebaseSettings,
    onNotificationMessage,
} from "../../../plugins/firebase";
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";
import useDropdown from "../../../composable/useDropdown";
import useNotyf from "../../../composable/useNotyf";
import useRequest from "../../../composable/useRequest";
import useNotifications from "../../../composable/useNotifications";

const router = useRouter();

import {useViaPlaceholderError} from "../../../composable/useViaPlaceholderError";
import {Icon} from "@iconify/vue";

defineComponent(Icon);
const dropdownElement = ref();
const dropdown = useDropdown(dropdownElement);
const store = useStore();
const user = computed(() => {
    return store.getters["currentUser"];
});
let {endPoint, request} = useRequest();
const notis = useNotifications();

const notifications = ref([]);

const seeAllClick = function () {
    router.push(notis.config.route);
    // router.push({
    //   name: "notifications",
    // });
    dropdown.close();
};
const onClick = (notification) => {
    if (notification?.route) {
        router.push(notification?.route);
        dropdown.close();
    }
};

onMounted(() => {
    getFCMToken(function (currentToken) {
        const topicName = `admins-${user?.value.id}`;
        subscribeTokenToTopic(currentToken, "admins");
        subscribeTokenToTopic(currentToken, topicName);
    });

    onNotificationMessage(function (payload) {
        // const title = payload.notification.title;
        // const body = payload.notification.body;

        // const title = payload?.data?.title;
        // const body = payload?.data?.body;

        const title = payload?.data?.title ? getValueByLocale(JSON.parse(payload?.data?.title)) : '';
        const body = payload?.data?.title ? getValueByLocale(JSON.parse(payload?.data?.body)) : '';
        const notif = useNotyf();
        notif.success({
            message: ` ${title} ` + "\n" + `${body} `,
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
</script>

<template>
    <div class="toolbar-notifications">
        <div
            ref="dropdownElement"
            class="dropdown is-spaced is-dots is-right dropdown-trigger"
        >
            <div class="is-trigger" aria-haspopup="true" @click="dropdown.toggle">
                <!--<i aria-hidden="true" class="iconify" data-icon="feather:bell"></i>-->
                <!-- <Icon icon="feather:bell"/> -->
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M13.5 4.18a.5.5 0 0 1-.5-.5V2c0-.551-.449-1-1-1s-1 .449-1 1v1.68a.5.5 0 0 1-1 0V2c0-1.103.897-2 2-2s2 .897 2 2v1.68a.5.5 0 0 1-.5.5zM12 24c-1.93 0-3.5-1.57-3.5-3.5a.5.5 0 0 1 1 0c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5a.5.5 0 0 1 1 0c0 1.93-1.57 3.5-3.5 3.5z" fill="#000000" data-original="#000000" class=""></path><path d="M20.5 21h-17a1.502 1.502 0 0 1-.975-2.64A6.952 6.952 0 0 0 5 13.038V10c0-3.86 3.14-7 7-7s7 3.14 7 7v3.038c0 2.053.899 3.99 2.467 5.315A1.501 1.501 0 0 1 20.5 21zM12 4c-3.309 0-6 2.691-6 6v3.038a7.944 7.944 0 0 1-2.821 6.079A.5.5 0 0 0 3.5 20h17a.5.5 0 0 0 .325-.88A7.95 7.95 0 0 1 18 13.038V10c0-3.309-2.691-6-6-6z" fill="#000000" data-original="#000000" class=""></path></g></svg>
                <!-- <span class="new-indicator pulsate"></span> -->
            </div>

            <div class="dropdown-menu" role="menu">
                <div class="dropdown-content">

                    <div class="heading">
                        <div class="heading-left">
                            <h6 class="heading-title"> {{ trans('notifications') }}</h6>
                        </div>
                        <div class="heading-right">
                            <div class="heading-right-inner">
                                <p class="notification-link pointer" @click="seeAllClick">{{ trans('see_all') }}</p>
                                <div class="btn-close-notification mb-3 d-lg-none" @click="dropdown.toggle"><i aria-hidden="true" class="lnil lnil-close"></i></div>
                            </div>
                        </div>
                    </div>

                    <div v-if="notifications.length > 0">
                        <ul class="notification-list">
                            <li v-for="(notification, index) in notifications" :key="index">
                                <a class="notification-item" @click="onClick(notification)" href="javascript:;">
                                    <div class="img-left">
                                        <VAvatar
                                            alt=""
                                            :picture="
                        notification.image || '/images/notification_icon.png'
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
