<template>
  <!-- <div class="columns is-multiline">
    <div class="column is-6 is-md-12">
      <div class="company-dashboard">
        <div class="company-header list-row">
          <div class="columns is-multiline">
            <div class="column is-3 p-3">
              <h4>Name :</h4>
            </div>
            <div class="column is-9 p-3">
              <h4>Ahmed Mohammed</h4>
            </div>
          </div>

          <div class="columns is-multiline">
            <div class="column is-3 p-3">
              <h4>Name :</h4>
            </div>
            <div class="column is-9 p-3">
              <h4>Ahmed Mohammed</h4>
            </div>
          </div>

          <div class="columns is-multiline">
            <div class="column is-3 p-3">
              <h4>Name :</h4>
            </div>
            <div class="column is-9 p-3">
              <h4>Ahmed Mohammed</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-6 is-md-12">
      <div class="company-dashboard">
        <div class="company-header list-row">
          <div class="columns is-multiline">
            <div class="column is-3 p-3">
              <h4>Name :</h4>
            </div>
            <div class="column is-9 p-3">
              <h4>Ahmed Mohammed</h4>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-3 p-3">
              <h4>Name :</h4>
            </div>
            <div class="column is-9 p-3">
              <h4>Ahmed Mohammed</h4>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-3 p-3">
              <h4>Name :</h4>
            </div>
            <div class="column is-9 p-3">
              <h4>Ahmed Mohammed</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <div class="permission">
        <div class="columns is-multiline">
            <div class="column is-4 is-md-12">
                <div class="card-permission">
                    <div class="header-permission">
                        <CheckboxField :data="data" />
                    </div>
                    <div class="body-permission">
                        <CheckboxField :data="data_2" />
                    </div>
                </div>
            </div>
            <div class="column is-4 is-md-12">
                <div class="card-permission">
                    <div class="header-permission">
                        <CheckboxField :data="data" />
                    </div>
                    <div class="body-permission">
                        <CheckboxField :data="data_2" />
                    </div>
                </div>
            </div>
            <div class="column is-4 is-md-12">
                <div class="card-permission">
                    <div class="header-permission">
                        <CheckboxField :data="data" />
                    </div>
                    <div class="body-permission">
                        <CheckboxField :data="data_2" />
                    </div>
                </div>
            </div>
        </div>
    </div> -->

  <div class="business-dashboard company-dashboard">
    <div class="company-header is-dark-card-bordered is-dark-bg-6 card mb-1">
      <div class="header-item is-dark-bordered-12" v-for="item in data$">
        <div class="item-inner">
          <Icon
            v-if="isIconify($get(item, iconKey))"
            :icon="$get(item, iconKey)"
            class="is-dark-primary"
          />
          <i
            v-else
            aria-hidden="true"
            :class="`is-dark-primary ${$get(item, iconKey)} `"
          ></i>

          <span class="dark-inverted">
            {{ $get(item, valueKey) }}
          </span>
          <p>
            {{ getValueByLocale(item.name) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboard from "./dashboard";
import base from "../../list/mixins/base";

// import CheckboxField from "../../formBuilder/fields/CheckboxField.vue";

export default {
  name: "Statistics",
  components: {
    // CheckboxField
  },
  data() {
    return {
      // data:[{id:1,name:"Admin"}],
      // data_2:[{id:1,name:"Admin 1"},{id:2,name:"Admin 2"},{id:3,name:"Admin 3"}]
    };

  },
  mixins: [dashboard, base],
  methods: {
    $$getRowValue(column, row, defaultVal = "") {
      console.log("sssda", column, row, column.name);
      if (column.value instanceof Function) return column.value(row);

      return this.getValueByLocale(_.get(row, column.name, defaultVal ?? ""));
    },
  },
};
</script>

<style lang="scss">
@import "../../../../dist/scss/abstracts/_mixins.scss";

.company-dashboard {
  .company-header {
    display: flex;
    padding: 20px;
    background: var(--white);
    border: 1px solid var(--fade-grey-dark-3);
    border-radius: var(--radius-large);
    margin-bottom: 1.5rem;

    .header-item {
      width: 25%;
      border-right: 1px solid var(--fade-grey-dark-3);

      &:last-child {
        border-right: none;
      }

      .item-inner {
        text-align: center;

        .lnil,
        .lnir {
          font-size: 1.8rem;
          margin-bottom: 6px;
          color: var(--primary);
        }

        span {
          display: block;
          font-family: var(--font);
          font-weight: 600;
          font-size: 1.6rem;
          color: var(--dark-text);
        }

        p {
          font-family: var(--font-alt);
          font-size: 0.95rem;
        }
      }
    }
  }

  .widget {
    height: 100%;
  }

  .dashboard-card {
    @include vuero-s-card();

    height: 100%;

    &.is-company {
      text-align: center;
      padding: 30px;

      .v-avatar {
        display: block;
        margin: 0 auto 10px auto;

        .button {
          position: absolute;
          bottom: 0;
          right: 0;
          max-width: 35px;
        }
      }

      > h3 {
        color: var(--dark-text);
        font-family: var(--font-alt);
        font-size: 1.2rem;
        font-weight: 600;
      }

      > p {
        font-size: 0.9rem;
      }

      .description {
        padding: 10px 0 0 0;
      }

      .company-stats {
        display: flex;
        padding-top: 20px;
        margin-top: 20px;
        border-top: 1px solid var(--fade-grey-dark-3);

        .company-stat {
          width: 33.3%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;

          span {
            display: block;
            font-family: var(--font);

            &:first-child {
              text-transform: uppercase;
              font-family: var(--font-alt);
              font-size: 0.75rem;
              color: var(--light-text);
            }

            &:nth-child(2) {
              color: var(--dark-text);
              font-size: 1.4rem;
              font-weight: 600;
            }
          }
        }
      }
    }

    &.is-base-chart {
      padding: 0;
      display: flex;
      flex-direction: column;

      .content-box {
        padding: 30px;

        .revenue-stats {
          display: flex;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--fade-grey-dark-3);

          .revenue-stat {
            margin-right: 30px;
            font-family: var(--font);

            span {
              display: block;

              &:first-child {
                text-transform: uppercase;
                font-family: var(--font-alt);
                font-size: 0.75rem;
                color: var(--light-text);
              }

              &:nth-child(2) {
                color: var(--dark-text);
                font-size: 1.6rem;
                font-weight: 600;
              }

              &.current {
                color: var(--primary);
              }
            }
          }
        }
      }

      .chart-container {
        margin-top: auto;
      }
    }

    &.is-tickets {
      padding: 30px;

      .ticket-list {
        padding: 10px 0;

        .media-flex {
          + .media-flex {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid var(--fade-grey-dark-3);
          }

          .flex-meta {
            span {
              &:nth-child(2) {
                font-size: 1rem;
                margin: 4px 0;
                color: var(--light-text-dark-20);
                max-width: 430px;
              }

              &:nth-child(3) {
                font-size: 0.9rem;
                color: var(--light-text);
              }
            }
          }
        }
      }
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      h3 {
        font-family: var(--font-alt);
        font-size: 1rem;
        font-weight: 600;
        color: var(--dark-text);
      }
    }
  }

  .table-wrapper {
    min-height: 0;
  }

  .dataTable-wrapper {
    .dataTable-top {
      padding: 0 !important;
      margin: 0 !important;
    }
  }
}

.is-dark {
  .company-dashboard {
    .dashboard-card {
      @include vuero-card--dark();
    }
  }
}
</style>
