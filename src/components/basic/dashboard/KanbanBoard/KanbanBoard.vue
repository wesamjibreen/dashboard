<template>
  <div>
<div class="page-content kanban-content is-relative">
  <!-- <div class="kanban-toolbar">
    <VControl icon="feather:search">
      <input @keyup.enter="add" v-model="search" class="input" placeholder="Search..." />
    </VControl>
    <VButton @click="add" color="primary" raised bold> New Task </VButton>

  </div> -->
  <div class="columns is-kanban-wrapper">
  <!-- Column container -->
  <div
    v-for="section in sections" :key="section.name"
    class="column drop-zone" 
    draggable=""
    :class="[
      section.isCollapsed && 'is-1 is-mini',
      !section.isCollapsed && 'is-one-fifth',
    ]"
  >
    <!-- Kanban column -->
    <div
      class="kanban-column "
      @drop="onDrop($event, section.name)" 
      @dragover.prevent
      @dragenter.prevent
      :class="[
        section.isCollapsed && 'is-collapsed',
        getItems(section.name).length === 0 && 'is-empty',
      ]"
    >
      <!-- Collapsed content -->
      <div class="collapsed-content">
        <div class="expand-button" @click="section.isCollapsed = false">
          <i class="fas fa-plus" aria-hidden="true"></i>
        </div>
        <div>
          <span class="task-count">{{ getItems(section.name).length }}</span>
        </div>
        <div class="collapsed-text">{{section.name}}</div>
      </div>
      <!-- Expanded content -->
      <div class="expanded-content">
        <div class="column-title">
          <h3>
            <span class="column-name">{{section.name}}</span>
            <span class="task-count">{{ getItems(section.name).length }}</span>
          </h3>
          <!-- <KanbanDropdown @collapse="section.isCollapsed = true" /> -->
        </div>

        <div>
          <!-- Empty state image / text -->
          <div v-if="getItems(section.name).length === 0" class="kanban-empty">
            <img
              class="empty-state theme-image light-image"
              :src="section.emptyImage"
              alt="empty"
            />
            <img
              class="empty-state theme-image dark-image"
              :src="section.emptyImageDark"
              alt="empty"
            />
            <p class="empty-text">
              {{trans('empty_text')}}
            </p>
          </div>
          <div
            v-for="task in getItems(section.name)"
            :key="task.id"
            :data-id="task.id"
            :draggable = section.draggable 
            @dragstart="startDrag($event, task)"
            class="kanban-card is-new gelatine"
          >
            <div class="card-body">
              <h4 class="card-title">
                {{ task.title }}
              </h4>
              <div class="kanban-card-stats">
                <span v-if="section.showDueDate">
                  <i
                    aria-hidden="true"
                    class="iconify"
                    data-icon="feather:clock"
                  />
                  <!-- <img class="image" src="/panel/images/illustrations/projects/board/clock.png" /> -->
                  {{section.dueDateValue || task.dueDate }}
                </span>
              </div>
              <div class="new-avatar" v-if="section.showAvatars">
                <div
                  class="avatar-wrapper"
                  :class="[
                    task.participants[0].color &&
                      `is-${task.participants[0].color}`,
                  ]"
                >
                  <img
                    class="task-owner"
                    draggable="false"
                    :src="task.participants[0].picture"
                    alt=""
                    @error.once="
                      (event) => useViaPlaceholderError(event, '62x62')
                    "
                  />

                </div>
              </div>
            </div>
            <footer class="card-footer" v-if="section.showButtons">
              <a class="card-footer-item">View</a>
              <a class="card-footer-item" @click="task.state = 'progress'">
                Approve
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>

  <slot />
</div>
</div>
</div>
</template>

<script>
// import KanBanCard from './KanBanCard'
import dashboard from "../dashboard";
import KanbanDropdown from './KanbanDropdown'

export default {
name: "kanbanBoard",
mixins: [dashboard],

props: {
  itemsArr : [] ,
  sections : [],
},
components: {
  // KanBanCard,
  KanbanDropdown,
},
methods: {
startDrag(evt, task) {
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('taskID', task.id)
},
onDrop(evt, state) {
  const taskID = evt.dataTransfer.getData('taskID')
  const task = this.itemsArr.find((task) => task.id == taskID)
  task.state = state
},
getItems(sectionName){
  return this.itemsArr.filter((task) => task.state === sectionName)
}
},
};
</script>

<style lang="scss">
  /*! _board.scss | Vuero | Css ninja 2020-2021 */
  
  /*
      1. Kanban Toolbar
      2. Kanban Layout
      3. Kanban Card
      4. Dragula
      5. Kanban Board Dark mode
      6. Media Queries
  */
  
  /* ==========================================================================
  1. Kanban Toolbar
  ========================================================================== */
  
  .kanban-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  
    &.is-navbar {
      padding-top: 30px;
    }
  
    .avatar-stack {
      margin-left: 16px;
    }
  
    .button {
      margin-left: auto;
    }
  }
  
  /* ==========================================================================
  2. Kanban Layout
  ========================================================================== */
  
  .is-kanban-wrapper {
    .column {
      padding: 0.35rem !important;
    }
  
    .kanban-column {
      padding: 6px;
      background: #e3e4e5;
      border-radius: 8px;
      border: 1px solid var(--medium-grey);
  
      .column-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
  
        h3 {
          margin-bottom: 0;
          font-family: var(--font);
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          color: var(--light-text-dark-8);
        }
  
        .input {
          margin-right: 20px;
        }
  
        svg {
          height: 18px;
          width: 18px;
          color: var(--dark-text);
        }
  
        .task-count {
          padding-left: 4px;
  
          &::before {
            content: '(';
          }
          &::after {
            content: ')';
          }
        }
  
        .dropdown {
          .is-trigger {
            height: 18px;
            width: 18px;
            cursor: pointer;
  
            svg {
              height: 18px;
              width: 18px;
              color: var(--light-text-dark-8);
            }
          }
        }
      }
  
      .empty-state {
        margin: 30px auto 10px auto;
        width: 150px;
        height: auto;
      }
  
      .empty-text {
        text-align: center;
        padding: 10px 10px 20px 10px;
        font-size: 0.95rem;
        color: var(--dark-text);
  
        span {
          display: block;
        }
  
        a {
          line-height: 0.9;
          margin-top: 10px;
        }
      }
  
      .collapsed-content {
        display: none;
      }
  
      &.is-empty {
        .empty-state,
        .empty-text {
          display: block;
        }
      }
  
      &.is-collapsed {
        width: 100%;
        height: 500px;
        position: relative;
  
        .expanded-content {
          display: none;
        }
  
        .column-title,
        .kanban-card,
        .empty-state,
        .empty-text {
          display: none;
        }
  
        .collapsed-content {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          
          .expand-button {
            margin-top: 20px;
            height: 46px;
            width: 46px;
            background: var(--white);
            border-radius: var(--radius-rounded);
            border: 1.4px solid var(--fade-grey);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            cursor: pointer;
  
            svg {
              height: 18px;
              width: 18px;
              transition: all 0.3s;
              color: var(--muted-grey);
            }
  
            &:hover {
              border-color: var(--primary);
  
              svg {
                color: var(--primary);
              }
            }
          }
  
          .task-count {
            margin-top: 20px;
            height: 38px;
            width: 38px;
            background: var(--primary);
            border-radius: var(--radius-rounded);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--smoke-white);
          }
  
          .collapsed-text {
            position: absolute;
            bottom: 160px;
            min-width: 250px;
            font-size: 1rem;
            color: var(--dark-text);
            font-weight: 600;
            margin-left: -3px;
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
  
  /* ==========================================================================
  3. Kanban Card
  ========================================================================== */
  
  .kanban-card {
    width: 100%;
    background: var(--white);
    border-radius: var(--radius-large);
    margin-top: 10px;
    border: 1px solid var(--medium-grey);
    transition: all 0.4s;
  
    &:hover {
      box-shadow: 0 5px 43px rgba(0, 0, 0, 0.18) !important;
    }
  
    &.is-new {
      .new-avatar {
        margin: 20px 0 10px 0;
        width: 100%;
  
        .avatar-wrapper {
          position: relative;
          width: 74px;
          height: 74px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          border-radius: var(--radius-rounded);
  
          &::after {
            content: '';
            position: absolute;
            top: calc(50% - 12px);
            left: calc(50% - 12px);
            height: 24px;
            width: 24px;
            border-radius: var(--radius-rounded);
            background: var(--white);
            animation: wave 1.6s infinite;
            animation-duration: 2s;
            transform-origin: center center;
            z-index: 0;
          }
  
          .task-owner {
            position: relative;
            display: block;
            width: 62px;
            height: 62px;
            border-radius: var(--radius-rounded);
            z-index: 2;
          }
  
          &.is-warning {
            border: 2px solid var(--warning);
  
            &::after {
              background: var(--warning);
            }
          }
  
          &.is-primary {
            border: 2px solid var(--primary);
  
            &::after {
              background: var(--primary);
            }
          }
  
          &.is-success {
            border: 2px solid var(--success);
  
            &::after {
              background: var(--success);
            }
          }
  
          &.is-danger {
            border: 2px solid var(--danger);
  
            &::after {
              background: var(--danger);
            }
          }
  
          &.is-info {
            border: 2px solid var(--info);
  
            &::after {
              background: var(--info);
            }
          }
        }
      }
  
      .card-footer {
        a {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--light-text);
        }
      }
    }
  
    .card-body {
      padding: 10px;
  
      .kanban-card-stats {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 16px;
  
        > span {
          font-size: 0.9rem;
          color: var(--light-text);
  
          svg {
            position: relative;
            top: 2px;
            height: 14px;
            width: 14px;
            stroke-width: 1.6px;
          }
        }
      }
    }
  
    .card-title {
      font-size: 0.9rem;
      font-family: var(--font-alt);
      font-weight: 600;
      color: var(--dark-text);
    }
  
    .spaced-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
  }
  
  /* ==========================================================================
  4. Dragula
  ========================================================================== */
  
  .can-drag {
    .kanban-card {
      //fallback if grab cursor is unsupported
      cursor: move;
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
  
      //(Optional) Apply a "closed-hand" cursor during drag operation.
      &:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
      }
    }
  }
  
  .gu-transit {
    cursor: grabbing !important;
    cursor: -moz-grabbing !important;
    cursor: -webkit-grabbing !important;
  }
  
  .gu-mirror {
    position: fixed;
  }
  
  /* ==========================================================================
  5. Kanban Board Dark mode
  ========================================================================== */
  
  .is-dark {
    .kanban-column {
      background: var(--dark-sidebar-light-15);
      border-color: var(--dark-sidebar-light-15);
  
      .collapsed-content {
        .expand-button {
          background: var(--dark-sidebar-light-6) !important;
          border-color: var(--dark-sidebar-light-12) !important;
  
          &:hover {
            svg {
              color: var(--primary) !important;
            }
          }
        }
  
        .task-count {
          background: var(--primary) !important;
          border-color: var(--primary) !important;
  
          svg {
            color: var(--white) !important;
          }
        }
  
        .collapsed-text {
          color: var(--dark-dark-text) !important;
        }
      }
  
      .column-title {
        h3 {
          color: var(--body-color);
        }
  
        .is-trigger svg {
          color: var(--body-color) !important;
        }
      }
  
      .dropdown-content {
        background: var(--dark-sidebar);
  
        .dropdown-item {
          color: var(--white);
        }
  
        .dropdown-divider {
          background: var(--dark-sidebar-light-5);
        }
  
        a:hover,
        div:hover {
          background: var(--dark-sidebar-light-5) !important;
        }
      }
  
      .empty-text {
        color: var(--primary-grey);
      }
  
      .kanban-card,
      .gu-transit {
        background: var(--dark-sidebar-light-6) !important;
        border-color: var(--dark-sidebar-light-6) !important;
  
        &.is-new {
          background: var(--dark-sidebar-light-6);
          border-color: var(--dark-sidebar-light-6);
  
          .card-title {
            color: var(--primary-grey-light-2);
          }
  
          .card-footer,
          .card-footer-item {
            border-color: var(--dark-sidebar-light-20);
            color: var(--body-color);
          }
        }
  
        .card-title {
          color: var(--primary-grey-light-2);
        }
      }
    }
  }
  
  /* ==========================================================================
  6. Media Queries
  ========================================================================== */
  
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    .kanban-column {
      padding: 20px !important;
  
      .kanban-card {
        .card-body {
          padding: 20px 40px;
        }
      }
    }
  }
  
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    .kanban-content {
      padding: 0 10px !important;
    }
  
    .is-kanban-wrapper {
      .column {
        padding: 0.15rem !important;
      }
    }
  
    .kanban-column {
      .empty-state {
        width: 130px !important;
      }
  
      .empty-text {
        font-size: 0.7rem !important;
      }
  
      .kanban-card {
        .card-title {
          max-width: 152px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
  
        .bounty-meta {
          .due-date {
            display: none;
          }
        }
  
        .progress-block {
          margin-top: 8px;
  
          .spec-count {
            font-size: 0.5rem;
          }
        }
  
        .avatar-group img {
          height: 28px;
          width: 28px;
        }
  
        .done-icon {
          height: 18px;
          width: 18px;
  
          svg {
            height: 12px;
            width: 12px;
          }
        }
  
        &.is-invitation {
          .invitation-avatar {
            .avatar-wrapper {
              width: 58px;
              height: 58px;
  
              .bounty-owner {
                width: 44px;
                height: 44px;
              }
  
              .skill-badge {
                width: 20px;
                height: 20px;
              }
            }
          }
  
          .card-footer-item {
            padding: 0.5rem;
            font-size: 0.7rem;
          }
  
          .time-left {
            .time-value {
              font-size: 0.5rem;
            }
          }
        }
      }
    }
  }
  </style>