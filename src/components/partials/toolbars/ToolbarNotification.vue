<script setup >
import { ref,defineComponent } from 'vue'

import useDropdown from '../../../composable/useDropdown'
import { useViaPlaceholderError } from '../../../composable/useViaPlaceholderError'
import {Icon} from '@iconify/vue';
defineComponent(Icon);
const dropdownElement = ref()
const dropdown = useDropdown(dropdownElement)
</script>

<template>
  <div class="toolbar-notifications is-hidden-mobile">
    <div
      ref="dropdownElement"
      class="dropdown is-spaced is-dots is-right dropdown-trigger"
    >
      <div class="is-trigger" aria-haspopup="true" @click="dropdown.toggle">
        <!--<i aria-hidden="true" class="iconify" data-icon="feather:bell"></i>-->
        <Icon icon="feather:bell"/>
        <span class="new-indicator pulsate"></span>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="heading">
            <div class="heading-left">
              <h6 class="heading-title">Notifications</h6>
            </div>
            <div class="heading-right">
              <RouterLink
                class="notification-link"
                :to="{ name: 'dashboard' }"
              >
                See all
              </RouterLink>
            </div>
          </div>
          <ul class="notification-list">
            <li>
              <a class="notification-item">
                <div class="img-left">
                  <img
                    class="user-photo"
                    alt=""
                    src="/panel/images/avatars/svg/vuero-7.svg"
                    @error.once="
                      (event) => useViaPlaceholderError(event, '150x150')
                    "
                  />
                </div>
                <div class="user-content">
                  <p class="user-info">
                    <span class="name">Alice C.</span> left a comment.
                  </p>
                  <p class="time">1 hour ago</p>
                </div>
              </a>
            </li>
            <li>
              <a class="notification-item">
                <div class="img-left">
                  <img
                    class="user-photo"
                    alt=""
                    src="/panel/images/avatars/svg/vuero-12.svg"
                    @error.once="
                      (event) => useViaPlaceholderError(event, '150x150')
                    "
                  />
                </div>
                <div class="user-content">
                  <p class="user-info">
                    <span class="name">Joshua S.</span> uploaded a file.
                  </p>
                  <p class="time">2 hours ago</p>
                </div>
              </a>
            </li>
            <li>
              <a class="notification-item">
                <div class="img-left">
                  <img
                    class="user-photo"
                    alt=""
                    src="/panel/images/avatars/svg/vuero-13.svg"
                    @error.once="
                      (event) => useViaPlaceholderError(event, '150x150')
                    "
                  />
                </div>
                <div class="user-content">
                  <p class="user-info">
                    <span class="name">Tara S.</span> sent you a message.
                  </p>
                  <p class="time">2 hours ago</p>
                </div>
              </a>
            </li>
            <li>
              <a class="notification-item">
                <div class="img-left">
                  <img
                    class="user-photo"
                    alt=""
                    src="/panel/images/avatars/svg/vuero-25.svg"
                    @error.once="
                      (event) => useViaPlaceholderError(event, '150x150')
                    "
                  />
                </div>
                <div class="user-content">
                  <p class="user-info">
                    <span class="name">Melany W.</span> left a comment.
                  </p>
                  <p class="time">3 hours ago</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
