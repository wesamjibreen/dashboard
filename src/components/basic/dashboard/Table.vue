<template>
  <div class="business-dashboard hr-dashboard">
    <div class="incoming">
      <div class="flex-table">
        <!--Table header-->
        <div class="flex-table-header">
          <span
            class="flex-datatable-cell"
            v-for="(column, index) in columns"
            :key="index"
          >
            {{ trans(column.text) }}
          </span>
          <span
            v-if="hasActionsPermissions(resource, actions)"
            class="flex-datatable-cell cell-end"
          >
            {{ trans("actions") }}
          </span>
        </div>

        <transition-group name="list" tag="div">
          <div
            v-for="(row, index) in rows"
            :key="index"
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
                v-for="(column, i) in columns"
                :key="i"
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
                </slot>
              </div>
            </slot>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { view } from "../../list/mixins";
import { permissions } from "../../../mixins";

export default {
  name: "Table",
  mixins: [view, permissions],
  props: {
    end_point: {
      required: true,
      default: {},
    },
  },
  data() {
    return {
      loading: false,
      rows: [],
    };
  },
  created() {
    if (Object.keys(this.end_point).length) {
      this.request(
        { method: "GET", url: `${this.end_point}` },
        {},
        function ({ data }) {
          this.rows = data.data;
          this.loading = false;
        }.bind(this),
        function (err) {
          this.loading = false;
        }.bind(this)
      );
    } else {
      //   ??
    }
  },
};
</script>

<style lang="scss">
@import "../../../../dist/scss/abstracts/_mixins.scss";
@import "../../../../dist/scss/pages/generic/_widgets-lists.scss";

.hr-dashboard {
  .block-header {
    display: flex;
    border-radius: 16px;
    padding: 50px;
    background: var(--primary);
    font-family: var(--font);
    box-shadow: var(--primary-box-shadow);

    .left,
    .right {
      width: 30%;
    }

    .center {
      display: flex;
      flex-direction: column;
      width: 40%;
      padding-right: 30px;
      margin-right: 30px;
      border-right: 1px solid var(--primary-light-10);

      .block-text {
        margin-bottom: 16px;
      }

      .candidates {
        margin-top: auto;

        > .v-avatar {
          margin-right: 10px;
        }

        button {
          height: 40px;
          width: 40px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          background: var(--white);
          color: var(--light-text);
          border: none;
          outline: none;
          cursor: pointer;
          transition: all 0.3s;

          svg {
            height: 18px;
            width: 18px;
          }
        }
      }
    }

    .left {
      display: flex;
      justify-content: center;
      align-items: center;

      .current-user {
        .v-avatar {
          margin-bottom: 1rem;
        }

        h3 {
          font-family: var(--font-alt);
          font-weight: 700;
          font-size: 1.8rem;
          color: var(--white);
          line-height: 1.2;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;

      .button {
        margin-top: auto;
      }
    }

    .block-heading {
      font-family: var(--font-alt);
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--white);
      margin-bottom: 4px;
    }

    .block-text {
      font-family: var(--font);
      font-size: 0.9rem;
      color: var(--white);
      margin-bottom: 16px;
    }

    .header-meta {
      margin-left: 0;
      padding-right: 30px;

      h3 {
        color: var(--smoke-white);
        font-family: var(--font-alt);
        font-weight: 700;
        font-size: 1.3rem;
        max-width: 280px;
      }

      p {
        font-weight: 400;
        color: var(--smoke-white-dark-2);
        margin-bottom: 16px;
        max-width: 320px;
      }

      .action-link {
        span {
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-right: 6px;
        }

        i {
          font-size: 12px;
        }
      }
    }
  }

  .feed-settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    h3 {
      font-family: var(--font-alt);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dark-text);
    }

    .button {
      font-size: 0.8rem;
      border-radius: 8px;
      margin-right: 4px;

      &.is-selected {
        background: var(--primary);
        color: var(--white);
        border-color: var(--primary);
        box-shadow: var(--primary-box-shadow);
      }
    }
  }

  .side-text {
    h3 {
      font-family: var(--font-alt);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dark-text);
      margin-bottom: 8px;
    }

    p {
      font-size: 0.95rem;
      margin-bottom: 8px;
    }

    .action-link {
      font-size: 0.9rem;
    }
  }

  .recent-rookies {
    .recent-rookies-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      h3 {
        font-family: var(--font-alt);
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--dark-text);
      }
    }

    .user-grid {
      &.user-grid-v4 {
        .grid-item {
          @include vuero-l-card();
        }
      }
    }
  }
}

.user-grid {
  .columns {
    margin-left: -0.5rem !important;
    margin-right: -0.5rem !important;
    margin-top: -0.5rem !important;
  }

  .column {
    padding: 0.5rem !important;
  }

  .grid-item {
    position: relative;
    @include vuero-s-card();

    text-align: center;

    &:hover {
      .button-wrap {
        > div {
          a {
            opacity: 1;
            pointer-events: all;
          }
        }
      }
    }

    .dropdown {
      position: absolute;
      top: 10px;
      right: 10px;
      text-align: left;
    }

    > .v-avatar {
      display: block;
      margin: 0 auto 4px auto;
    }

    h3 {
      font-family: var(--font-alt);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dark-text);
    }

    p {
      font-size: 0.85rem;
    }

    .button-wrap {
      margin: 20px 0 0 0;

      .v-button {
        width: 100%;
        max-width: 140px;
        margin: 0 auto;
      }

      > div {
        margin: 6px 0 0 0;

        a {
          opacity: 0;
          pointer-events: none;
          color: var(--light-text);
          font-weight: 500;
          font-size: 0.9rem;
          transition: opacity 0.3s, color 0.3s;

          &:hover {
            color: var(--primary);
          }
        }
      }
    }
  }
}

.is-dark {
  .user-grid {
    .grid-item {
      @include vuero-card--dark();
    }
  }

  .hr-dashboard {
    .block-header {
      background: var(--dark-sidebar);
      box-shadow: none;

      .center {
        border-color: var(--dark-sidebar-light-10);

        .candidates {
          button {
            background: var(--dark-sidebar-light-10);
            border: 1px solid transparent;
            transition: all 0.3s;

            &:hover {
              border-color: var(--primary);

              svg {
                color: var(--primary);
              }
            }
          }
        }
      }
    }

    .feed-settings {
      .button {
        &.is-selected {
          background: var(--primary) !important;
          border-color: var(--primary) !important;
          box-shadow: var(--primary-box-shadow) !important;
          color: var(--white) !important;
        }
      }
    }

    .recent-rookies {
      .user-grid {
        &.user-grid-v4 {
          .grid-item {
            @include vuero-card--dark();
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .hr-dashboard {
    .block-header {
      flex-direction: column;
      padding: 30px;

      .left,
      .center,
      .right {
        width: 100%;
      }

      .left {
        justify-content: flex-start;
        margin-bottom: 20px;
      }

      .center {
        padding-right: 0;
        margin-right: 0;
        border-right: none;
        margin-bottom: 20px;
      }
    }

    .feed-settings {
      flex-direction: column;

      h3 {
        margin-bottom: 16px;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .hr-dashboard {
    .block-header {
      padding: 40px;
    }

    .side-text {
      display: none;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .hr-dashboard {
    .block-header {
      padding: 40px;

      .left {
        .current-user {
          h3 {
            font-size: 1.5rem;
          }
        }
      }

      .center {
        .candidates {
          .v-avatar {
            &:nth-child(3) {
              display: none;
            }
          }
        }
      }
    }

    .column {
      &.is-7 {
        &.is-offset-1 {
          margin-left: 2% !important;
          width: 64.33333% !important;
        }
      }
    }
  }
}
</style>

