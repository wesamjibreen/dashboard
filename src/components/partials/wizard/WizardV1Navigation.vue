<script setup lang="ts">
import { ref } from 'vue'

import useDropdown from '/@src/composable/useDropdown'
import { useWizard } from '/@src/stores/wizard'
import { isDark, toggleDarkModeHandler } from '/@src/state/darkModeState'
import { useViaPlaceholderError } from '/@src/composable/useViaPlaceholderError'

const dropdownElement1 = ref<HTMLElement>()
const dropdown1 = useDropdown(dropdownElement1)

const dropdownElement2 = ref<HTMLElement>()
const dropdown2 = useDropdown(dropdownElement2)

const wizard = useWizard()

const setStep = (target: number) => {
  if (wizard.step >= target) {
    wizard.setStep(target)
    dropdown1.close()
  }
}
</script>

<template>
  <nav class="wizard-navigation">
    <RouterLink :to="{ name: 'index' }" class="wizard-brand">
      <AnimatedLogo width="38px" height="38px" />
    </RouterLink>

    <div class="navbar-item is-wizard-title" @click="dropdown1.toggle">
      <span class="title-wrap">
        Step {{ wizard.step }}: <span>{{ wizard.stepTitle }}</span>
      </span>
    </div>

    <div
      ref="dropdownElement1"
      class="dropdown wizard-dropdown dropdown-trigger"
    >
      <div class="is-trigger" @click="dropdown1.toggle">
        <i
          aria-hidden="true"
          class="iconify"
          data-icon="feather:chevron-down"
        ></i>
      </div>
      <div id="wizard-navigation-dropdown" class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a
            :class="[wizard.step < 1 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(1)"
          >
            Step 1: {{ wizard.stepTitle }}
          </a>
          <a
            :class="[wizard.step < 2 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(2)"
          >
            Step 2: Project Info
          </a>
          <a
            :class="[wizard.step < 3 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(3)"
          >
            Step 3: Project Details
          </a>
          <a
            :class="[wizard.step < 4 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(4)"
          >
            Step 4: Project Files
          </a>
          <a
            :class="[wizard.step < 5 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(5)"
          >
            Step 5: Team Members
          </a>
          <a
            :class="[wizard.step < 6 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(6)"
          >
            Step 6: Project Tools
          </a>
          <a
            :class="[wizard.step < 7 && 'is-disabled']"
            class="dropdown-item kill-drop"
            @click="setStep(7)"
          >
            Step 7: Preview
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-item is-dark-mode">
      <div class="navbar-icon">
        <label class="dark-mode">
          <input
            type="checkbox"
            :checked="!isDark"
            @change="toggleDarkModeHandler"
          />
          <span></span>
        </label>
      </div>
    </div>

    <div
      ref="dropdownElement2"
      class="dropdown is-right dropdown-trigger user-dropdown"
    >
      <div class="is-trigger" aria-haspopup="true" @click="dropdown2.toggle">
        <div class="profile-avatar">
          <img
            class="avatar"
            src="/panel/images/avatars/svg/vuero-1.svg"
            alt=""
            @error.once="(event) => useViaPlaceholderError(event, '150x150')"
          />
        </div>
        <i
          aria-hidden="true"
          class="iconify"
          data-icon="feather:chevron-down"
        ></i>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="dropdown-item">
            <p class="is-size-7 dark-inverted">Erik Kovalsky</p>
          </div>
          <a href="#" class="dropdown-item">
            <i aria-hidden="true" class="iconify" data-icon="feather:user"></i>
            <span>Profile</span>
          </a>
          <a class="dropdown-item">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:edit-2"
            ></i>
            <span>Edit Profile</span>
          </a>
          <a class="dropdown-item">
            <i aria-hidden="true" class="iconify" data-icon="feather:box"></i>
            <span>Projects</span>
          </a>
          <a class="dropdown-item">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:settings"
            ></i>
            <span>Settings</span>
          </a>
          <hr class="dropdown-divider" />
          <a href="#" class="dropdown-item">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:log-out"
            ></i>
            <span>Sign Out</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../../../scss/abstracts/_mixins.scss';

.wizard-navigation {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  background: var(--white);
  padding: 0 20px;
  transition: all 0.3s;
  z-index: 99;

  .wizard-brand {
    img {
      display: block;
      height: 34px;
      margin: 0 auto;
    }
  }

  .navbar-item {
    &.is-wizard-title {
      margin-left: 15px;
      border-left: 1px solid var(--muted-grey-light-15);
      padding-bottom: 6px;
      padding-top: 6px;
      font-family: var(--font);

      .title-wrap {
        position: relative;
        display: block;
        font-family: var(--font-alt);
        font-size: 1.2rem;
        font-weight: 600;

        span {
          font-weight: 400;
        }
      }
    }
  }

  .wizard-dropdown {
    cursor: pointer;

    .is-trigger {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;

      svg {
        height: 18px;
        width: 18px;
        color: var(--light-text);
      }
    }

    .dropdown-menu {
      border: 1px solid var(--fade-grey-dark-3);
      box-shadow: var(--light-box-shadow);
      border-radius: 8px;
      padding-top: 0;
      overflow: hidden;

      .dropdown-content {
        .dropdown-item {
          font-family: var(--font);
        }
      }
    }
  }

  .is-dark-mode {
    margin-left: auto;
    background: transparent !important;

    .navbar-icon {
      height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-rounded);
      border: 1px solid var(--fade-grey-dark-3);
      box-shadow: var(--light-box-shadow);
      background: var(--white);
      transition: all 0.3s;

      .dark-mode {
        transform: scale(0.6);
      }
    }
  }

  .user-dropdown {
    .is-trigger {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;

      .profile-avatar {
        position: relative;

        .avatar {
          display: block;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-rounded);
        }

        .badge {
          position: absolute;
          right: -8px;
          bottom: 0;
          width: 20px;
          height: 20px;
          border: 2px solid var(--white);
          border-radius: var(--radius-rounded);
        }
      }

      svg {
        margin-left: 3px;
        width: 18px;
        height: 18px;
        color: var(--light-text);
        transition: all 0.3s;
      }
    }

    .dropdown-menu {
      top: 52px;
      border: 1px solid var(--fade-grey-dark-3);
      box-shadow: var(--light-box-shadow);
      border-radius: 8px;
      padding-top: 0;
      width: 180px;
      overflow: hidden;

      .dropdown-item {
        display: flex;
        align-items: center;
        font-family: var(--font);
        font-size: 0.9rem;
        padding: 8px 12px;
        color: var(--light-text);

        p {
          font-family: var(--font-alt);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--dark-text);
        }

        svg {
          margin-right: 8px;
          height: 16px;
          width: 16px;
          color: var(--light-text);
        }
      }
    }
  }
}
</style>
