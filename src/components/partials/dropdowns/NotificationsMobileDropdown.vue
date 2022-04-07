<script setup>
import { ref, reactive, defineComponent, onMounted } from "vue";
import {
  messaging,
  getFCMToken,
  subscribeTokenToTopic,
  firebaseSettings,
  onNotificationMessage,
} from "../../../plugins/firebase";
import useDropdown from "../../../composable/useDropdown";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import useRequest from "../../../composable/useRequest";
import { useViaPlaceholderError } from "../../../composable/useViaPlaceholderError";
</script>

<template>
  <div
    ref="dropdownElement"
    class="
      navbar-item
      has-dropdown
      is-notification is-hidden-tablet is-hidden-desktop
    "
  >
    <a class="navbar-link is-arrowless" @click="dropdown.toggle">
      <Icon icon="feather:bell" />
      <!-- <span class="new-indicator pulsate"></span> -->
    </a>
    <div class="navbar-dropdown is-boxed is-right">
      <div class="heading">
        <div class="heading-left">
          <h6 class="heading-title">Notifications</h6>
        </div>
        <div class="heading-right">
          <p class="notification-link">See all</p>
        </div>
      </div>
      <div class="inner has-slimscroll">
        <!-- <ul class="notification-list">
          <li v-for="(notification, index) in notifications" :key="index">
            <a class="notification-item">
              <div class="img-left">
                <img
                  class="user-photo"
                  alt=""
                  src="/panel/images/avatars/svg/vuero-4.svg"
                  @error.once="
                    (event) => useViaPlaceholderError(event, '150x150')
                  "
                />
              </div>
              <div class="user-content">
                <p class="user-info">
                  <span class="name">{{ notification.title }}</span>
                  {{ notification.body }}
                </p>
                <p class="time">1 hour ago</p>
              </div>
            </a>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
