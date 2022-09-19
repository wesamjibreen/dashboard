<template>
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
            <KanbanDropdown @collapse="section.isCollapsed = true" />
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
</template>
<script>

import KanbanDropdown from './KanbanDropdown'
export default {
name: "kanbanCard",
components: {
  KanbanDropdown,
},

data(){
  return{
    itemsArr : [
      {
        id: '1',
        title: 'Create prototype with JWT authentication',
        state: 'new',
        dueDate: '3 weeks',
        participants: [
          {
            color: 'warning',
            picture: '/panel/images/avatars/svg/vuero-1.svg',
            // emptyImage :'/panel/images/illustrations/projects/board/'
          },
        ],
      },
      {
        id: '2',
        title: 'Design a todo list component using React',
        state: 'new',
        dueDate: '3 weeks',
        participants: [
          {
            color: 'info',
            picture: '/panel/images/avatars/svg/vuero-2.svg',
          },
        ],
      },
      {
        id: '3',
        title: 'Implement the users REST API',
        state: 'progress',
        dueDate: '3 days',
        participants: [
          {
            color: 'danger',
            picture: '/panel/images/avatars/svg/vuero-3.svg',
          },
        ],
      },
      {
        id: '4',
        title: 'Review project wireframes',
        state: 'progress',
        dueDate: '1 week',
        participants: [
          {
            color: 'success',
            picture: '/panel/images/avatars/svg/vuero-4.svg',
          },
        ],
      },
      {
        id: '5',
        title: 'Implement new footer in all pages',
        state: 'progress',
        dueDate: '5 days',
        participants: [
          {
            color: 'info',
            picture: '/panel/images/avatars/svg/vuero-5.svg',
          },
        ],
      },
      {
        id: '6',
        title: 'Implement the projects REST API',
        state: 'ready',
        dueDate: '2 days',
        participants: [
          {
            color: 'warning',
            picture: '/panel/images/avatars/svg/vuero-6.svg',
          },
        ],
      },
      {
        id: '7',
        title: 'Landing page redesign',
        state: 'completed',
        dueDate: 'On time',
        participants: [
          {
            color: 'success',
            picture: '/panel/images/avatars/svg/vuero-7.svg',
          },
        ],
      },
      {
        id: '8',
        title: 'Projects REST API Implementation',
        state: 'completed',
        dueDate: 'On time',
        participants: [
          {
            color: 'danger',
            picture: '/panel/images/avatars/svg/vuero-8.svg',
          },
        ],
      },
      {
        id: '9',
        title: 'Database replication setup',
        state: 'completed',
        dueDate: 'On time',
        participants: [
          {
            color: 'primary',
            picture: '/panel/images/avatars/svg/vuero-9.svg',
          },
        ],
      },
      {
        id: '10',
        title: 'Firebase demo application setup',
        state: 'completed',
        dueDate: 'On time',
        participants: [
          {
            color: 'warning',
            picture: '/panel/images/avatars/svg/vuero-10.svg',
          },
        ],
      },
    ],
    sections : [{
      name : "new" ,
      draggable : false ,
      showButtons : true,
      showAvatars : true ,
      showDueDate : false ,
      isCollapsed : false ,
      emptyImage :"/panel/images/illustrations/projects/board/new.svg",
      emptyImageDark :"/panel/images/illustrations/projects/board//new-dark.svg"
      },
      {
        name : "progress" ,
        draggable : true ,
        showButtons : false,
        showAvatars : false ,
        showDueDate : true ,
        isCollapsed : false,
        emptyImage :"/panel/images/illustrations/projects/board/progress.svg",
        emptyImageDark : "/panel/images/illustrations/projects/board//progress-dark.svg"
      },
      {
        name : "ready" ,
        draggable : true,
        showButtons : false,
        showAvatars : false ,
        showDueDate : true ,
        isCollapsed : false,
        emptyImage :"/panel/images/illustrations/projects/board/ready.svg",
        emptyImageDark : "/panel/images/illustrations/projects/board//ready-dark.svg"
      },
      {
        name : "inReview" ,
        draggable : true,
        showButtons : false,
        showAvatars : false ,
        showDueDate : true ,
        isCollapsed : false,
        emptyImage : "/panel/images/illustrations/projects/board/test.svg",
        emptyImageDark : "/panel/images/illustrations/projects/board//test-dark.svg"
      },
      {
        name : "completed" ,
        draggable : false,
        showButtons : false,
        showAvatars : false ,
        showDueDate : true ,
        dueDateValue : " On time" ,
        isCollapsed : false,
        emptyImage :"/panel/images/illustrations/projects/board/complete.svg",
        emptyImageDark : "/panel/images/illustrations/projects/board//complete-dark.svg"
      }
    ]
  }
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