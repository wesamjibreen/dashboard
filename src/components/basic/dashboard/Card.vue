<template>
  <div class="columns is-multiline mt-2 mb-3">
    <div class="column is-12 is-md-12">
      <div class="card is-dark-card-bordered">
        <div
          class="company-header  is-dark-card-bordered list-row "
          v-for="(item, index) in data"
          :key="index"
        >
            <div >
              <div>
                <VBlock class="px-2 py-3 box--shadow">
                    <h1 style="font-weight: bold; font-size:large ; margin-top: 10px">
                      {{item.title}}
                    </h1>
                    <template #action>
                        <VButton
                          v-for="(action , index ) in item.actions"
                          :key="index"
                          class="btn-list"
                          style="font-size:14px"
                          :color="action.color"
                          :loading='action.loading'
                          raised
                          @click="execution(action)">
                          {{trans(action.label)}}
                        </VButton>
                    </template>
                </VBlock>
              </div>
              <hr style="margin:0">
              <div>
                <div class="columns is-multiline sty-border-column p-4">
                  <div class="column is-6 p-3" v-for="(i, y) in item.details" :key="y">
                    <div class="flex align-center justify-between">
                        <h5>{{ trans(i.key) }} :</h5>
                        <p class="text-end">{{ i.value }}</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
      <!-- <div v-show="false">
      <Export
        ref="exporting"
        :data="exportedData"
        :columns="exportingColumns('action.type')"
        :listRef="listRef"
      />
    </div> -->
          <ImportDialog
      ref="importDialog"
      :resource="resource"
      @on-sample-button-click="downloadImportSample"
    />
    </div>
  </div>
  </div>
</template>

<script>
import dashboard from "./dashboard";
import base from "./mixins/base";
import ImportDialog from "./partials/ImportDialog.vue";

export default {
  name: "card",
  mixins: [dashboard, base ] ,
  components: {
    // KanBanCard,
    ImportDialog,
  },
  props:{
    data : {
      required : true ,
      default : []
    }
  }
};
</script>

<style lang="scss">
  p.round3 {
    font-weight: lighter;
}
@import "../../../../dist/scss/abstracts/_mixins.scss";
.company-dashboard {
  .company-header {
    display: flex;
    padding: 20px;
    background: var(--white);
    border: 1px solid var(--fade-grey-dark-3);
    border-radius:10px;
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
.text-end{
    text-align: end;
}
.flex{
  display: flex;
}

.align-center{
  align-items: center;
}

.justify-between{
  justify-content: space-between;
}

.sty-border-column{
    .column{
            border-bottom: 1px solid #EEE;
            h5{
                margin-bottom: 5px;
            }
            @media screen and (min-width: 769px) and (max-width:1024px){
                flex: none;
                width: 100%;
            }
            &.not-border-bottom{
                border-bottom: 0px solid #EEE;
            }
    }
    >.column:nth-child(odd){
        border-right: 1px solid #EEE;
    }
}

html[dir="rtl"]{
    .sty-border-column{
        >.column:nth-child(odd){
            border-left: 1px solid #EEE;
            border-right: 0;
        }
    }
}

.box--shadow{
    box-shadow: 0 0.125em 0.25em rgb(10 10 10 / 10%);
}
</style>
