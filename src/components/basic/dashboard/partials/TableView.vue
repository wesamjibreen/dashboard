<template>
  <div class="flex-table flex-table-custom">
    <!--Table header-->
    <div class="flex-table-header">
      <slot name="table_header" :column="column">
        <span
          v-if="selectable"
          class="flex-datatable-cell cell-start checkbox-selector"
        >
          <label class="checkbox is-primary is-outlined is-circle">
            <input
              :id="`head-checkbox-${resource}`"
              name="allSelected"
              value="1"
              @change="onSelectAllChange"
              type="checkbox"
            />
            <span></span>
          </label>
        </span>
        <span class="flex-datatable-cell" v-for="column in columns">
          {{ column.text }}
        </span>
        <span
          v-if="hasActionsPermissions(resource, actions)"
          class="flex-datatable-cell cell-end"
        >
          {{ trans("actions") }}
        </span>
      </slot>
    </div>
    <div class="flex-list-inner">
      <transition-group name="list" tag="div">
        <div
          v-for="(row, index) in rows"
          :key="`repeater_item_${index}`"
          class="flex-table-item"
        >
          <slot name="row" :row="row">
            <div v-if="selectable" class="flex-table-cell">
              <span class="flex-datatable-cell cell-start checkbox-selector">
                <label class="checkbox is-primary is-outlined is-circle">
                  <input
                    :id="`head-checkbox-${row.id}`"
                    v-model="selected"
                    name="selected[]"
                    :value="row.id"
                    type="checkbox"
                  />
                  <span></span>
                </label>
              </span>
            </div>
            <div
              v-for="column in columns"
              class="flex-table-cell"
              :data-th="column.text"
            >
              <slot
                :name="`column.${column.value}`"
                :row="row"
                :column="column"
                :label="getRowValue(column, row)"
              >
                <component
                  v-if="column.component"
                  :is="`${column.component}`"
                  :resource="resource"
                  :slug="column.value"
                  :column="column"
                  :row="row"
                />
                <span
                  v-else
                  :class="[
                    column.bold &&
                      'has-dark-text dark-inverted is-font-alt is-weight-600 rem-90',
                    !column.bold && 'light-text',
                  ]"
                >
                  {{ getRowValue(column, row) }}
                </span>
              </slot>
            </div>
            <div
              class="flex-table-cell flex-table-action cell-end"
              :data-th="trans('actions')"
              v-if="hasActionsPermissions(resource, actions)"
            >
              <slot
                name="actions"
                :row="row"
                :resource="resource"
                :actions="actions"
              >
                <div
                  v-for="(action, index) in actions"
                  :key="`action_${action.slug}_${index}`"
                >
                  <Action
                    v-bind="action"
                    :resource="resource"
                    :row="row"
                    v-if="hasPermission(`${resource}.${action.slug}`)"
                  />
                </div>
                <!-- <VButton gray @click="open" >{{ trans('cancel_operation') }}</VButton> -->
                <!-- <CancelButton/> -->
              </slot>
            </div>
          </slot>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { view } from "../mixins";
import { permissions } from "../../../mixins";
// import CancelButton from "./CancelButton.vue";

export default {
  name: "TableView",
  components : {
    // CancelButton
  },
  mixins: [view, permissions],
  data() {
    return {};
  },
  computed: {

  },
  methods: {
    open(){
            alert("opened")
        }
  },
};
</script>

<style scoped>
</style>
