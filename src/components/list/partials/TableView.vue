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
        <span class="flex-datatable-cell cell-end">
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
            >
              <slot
                name="actions"
                :row="row"
                :resource="resource"
                :actions="actions"
              >
                <Action
                  v-for="(action, index) in actions"
                  v-bind="action"
                  :resource="resource"
                  :row="row"
                  :key="`action_${action.slug}_${index}`"
                />
              </slot>
            </div>
          </slot>
        </div>
      </transition-group>
    </div>

<!--    <div class="block mt-2">-->
<!--      <div class="select">-->
<!--        <select v-model="perPage">-->
<!--          <option-->
<!--            v-for="(pageCount, index) in pageCounts"-->
<!--            :key="index"-->
<!--            :value="pageCount"-->
<!--          >-->
<!--            {{ pageCount }}-->
<!--          </option>-->
<!--        </select>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { view } from "../mixins";

export default {
  name: "TableView",
  mixins: [view],
  data() {
    return {
      pageCounts: [1, 50, 100, 200],
      perPage: 1,
    };
  },
  // watch: {
  //   perPage(newVal) {
  //     //   update pagination
  //     this.$emit("on-per-page-count-change", newVal);
  //   },
  // },
};
</script>

<style scoped>
</style>
