<template>
  <div class="projects-toolbar">
    <div class="control has-icon">
      <input class="input" placeholder="Search..." />
      <div class="form-icon">
        <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
      </div>
    </div>

    <div class="avatar-stack">
      <VAvatar size="small" picture="/panel/images/avatars/svg/vuero-7.svg" />
      <VAvatar size="small" picture="/images/avatars/9.jpg" />
      <VAvatar size="small" picture="/panel/images/avatars/svg/vuero-12.svg" />
      <VAvatar size="small" picture="/panel/images/avatars/svg/vuero-1.svg" />
      <VAvatar size="small" picture="/panel/images/avatars/svg/vuero-25.svg" />
      <VAvatar size="small" picture="/images/avatars/22.jpg" />
    </div>

    <a class="button v-button is-primary is-raised is-bold">
      <span>New Project</span>
    </a>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_mixins.scss';

/* ==========================================================================
1. Projects Toolbar
========================================================================== */

.projects-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .avatar-stack {
    margin-left: 16px;
  }

  .button {
    margin-left: auto;
    min-width: 140px;
  }
}

.is-dark {
  .projects-toolbar {
    .avatar-stack {
      .avatar {
        border-color: var(--dark-sidebar-light-3);
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .projects-toolbar {
    .avatar-stack {
      display: none;
    }

    .v-button {
      min-width: 110px;
    }
  }
}
</style>
